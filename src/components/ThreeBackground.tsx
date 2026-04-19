import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02); // Much lighter fog for better visibility

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // --- Geometries ---
    const xGroup = new THREE.Group();
    const xMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xFF007A, 
      specular: 0x00F0FF, 
      shininess: 100,
      emissive: 0x440022, // Brighter emissive
      transparent: true,
      opacity: 0.8
    });

    const createX = () => {
      const group = new THREE.Group();
      const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);
      const bar1 = new THREE.Mesh(geometry, xMaterial);
      bar1.rotation.z = Math.PI / 4;
      const bar2 = new THREE.Mesh(geometry, xMaterial);
      bar2.rotation.z = -Math.PI / 4;
      group.add(bar1, bar2);
      return group;
    };

    // Spread X-shapes uniformly across the looping Z range
    const loopRange = 160; 
    const count = 160; // Higher density
    for (let i = 0; i < count; i++) {
      const x = createX();
      // Use uniform spread for the Z loop
      const zPos = (Math.random() - 0.5) * loopRange;
      
      x.userData = {
        initialPos: new THREE.Vector3(
          (Math.random() - 0.5) * 70,
          (Math.random() - 0.5) * 70,
          zPos
        ),
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        rotVel: new THREE.Vector3(
          Math.random() * 0.03,
          Math.random() * 0.03,
          Math.random() * 0.03
        )
      };
      
      x.position.copy(x.userData.initialPos);
      x.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      x.scale.setScalar(1.0 + Math.random() * 3.0); // Slightly larger
      xGroup.add(x);
    }
    scene.add(xGroup);

    // Particles (Background Stars/Data Points)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFFFFF, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // --- Interaction State ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const explosions: { mesh: THREE.Points; velocities: Float32Array; life: number }[] = [];

    const createExplosion = (position: THREE.Vector3) => {
      const pCount = 50;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      const velocities = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        pos[i3] = position.x;
        pos[i3 + 1] = position.y;
        pos[i3 + 2] = position.z;

        velocities[i3] = (Math.random() - 0.5) * 0.3;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.3;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.3;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xFF007A,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending
      });

      const mesh = new THREE.Points(geo, mat);
      scene.add(mesh);
      explosions.push({ mesh, velocities, life: 1.0 });
    };

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5);
      targetY = (event.clientY / window.innerHeight - 0.5);
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(xGroup.children, true);
      if (intersects.length > 0) {
        const object = intersects[0].object;
        let topParent = object;
        while (topParent.parent && topParent.parent !== xGroup) {
          topParent = topParent.parent;
        }
        const position = new THREE.Vector3();
        topParent.getWorldPosition(position);
        createExplosion(position);
        topParent.visible = false;
        setTimeout(() => {
          topParent.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
          topParent.visible = true;
        }, 3000);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      // Smooth Lerp for mouse
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Group transformations based on mouse - keep it subtle for background
      xGroup.rotation.y = elapsedTime * 0.05 + mouseX * 0.2;
      xGroup.rotation.x = elapsedTime * 0.03 + mouseY * 0.2;
      
      // Individual movement + Looping fly-through logic
      const loopRange = 160; 
      const scrollOffset = scrollPercent * loopRange * 1.5; // Multiple loops for faster feel
      
      xGroup.children.forEach((child) => {
        const data = child.userData;
        
        // Chaotic Rotation
        child.rotation.x += data.rotVel.x;
        child.rotation.y += data.rotVel.y;
        child.rotation.z += data.rotVel.z;

        // chaotic Drift (X, Y)
        child.position.x = data.initialPos.x + Math.sin(elapsedTime * 0.3 + data.initialPos.y) * 4;
        child.position.y = data.initialPos.y + Math.cos(elapsedTime * 0.3 + data.initialPos.x) * 4;

        // Fly-through logic with seamless wrapping
        let newZ = data.initialPos.z + scrollOffset;
        
        // Wrap around seamlessly
        const halfRange = loopRange / 2;
        newZ = ((newZ + halfRange) % loopRange) - halfRange;

        child.position.z = newZ;
        
        // Visibility: Very soft fading to ensure coverage
        const distFromCamera = Math.abs(newZ - 5);
        const opacity = Math.max(0, 1 - distFromCamera / (loopRange * 0.6));
        
        if (child.children.length >= 2) {
          ((child as any).children[0].material as THREE.Material).opacity = opacity;
          ((child as any).children[1].material as THREE.Material).opacity = opacity;
        }
      });
      
      // Camera parallax - more responsive and dramatic
      camera.position.x = -mouseX * 25;
      camera.position.y = mouseY * 25;
      camera.lookAt(0, 0, -50);

      // Update Explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.life -= 0.02;
        const positions = explosion.mesh.geometry.attributes.position.array as Float32Array;
        for (let j = 0; j < positions.length / 3; j++) {
          const j3 = j * 3;
          positions[j3] += explosion.velocities[j3];
          positions[j3 + 1] += explosion.velocities[j3 + 1];
          positions[j3 + 2] += explosion.velocities[j3 + 2];
        }
        explosion.mesh.geometry.attributes.position.needsUpdate = true;
        (explosion.mesh.material as THREE.PointsMaterial).opacity = explosion.life;
        if (explosion.life <= 0) {
          scene.remove(explosion.mesh);
          explosion.mesh.geometry.dispose();
          (explosion.mesh.material as THREE.Material).dispose();
          explosions.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-nemefisto-black" />;
};
