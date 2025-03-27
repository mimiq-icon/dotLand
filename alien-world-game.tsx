import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AlienWorldGame = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Camera positioning
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Terrain and environment creation
    const createTerrain = () => {
      const terrainGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
      const terrainMaterial = new THREE.MeshStandardMaterial({
        color: 0x2E8B57, // Dark sea green for vegetation
        roughness: 0.8,
        metalness: 0.2
      });
      const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
      terrain.rotation.x = -Math.PI / 2;
      terrain.receiveShadow = true;
      scene.add(terrain);
    };

    // Floating island creation
    const createFloatingIsland = () => {
      const islandGeometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        -5, 0, -5,
        5, 0, -5,
        5, 0, 5,
        -5, 0, 5,
        0, 10, 0 // Peak of the island
      ]);
      const indices = [
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        3, 0, 4
      ];
      islandGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      islandGeometry.setIndex(indices);
      islandGeometry.computeVertexNormals();

      const islandMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A4A4A,
        roughness: 0.6,
        metalness: 0.3
      });
      const island = new THREE.Mesh(islandGeometry, islandMaterial);
      island.position.set(0, 30, -20);
      scene.add(island);
    };

    // Astronaut creation (placeholder)
    const createAstronauts = () => {
      const astronautGeometry = new THREE.CapsuleGeometry(0.5, 1.8, 4, 8);
      const astronautMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      
      const astronaut1 = new THREE.Mesh(astronautGeometry, astronautMaterial);
      const astronaut2 = new THREE.Mesh(astronautGeometry, astronautMaterial);
      
      astronaut1.position.set(-2, 0, 0);
      astronaut2.position.set(2, 0, 0);
      
      scene.add(astronaut1);
      scene.add(astronaut2);
    };

    // Mist/Fog effect
    scene.fog = new THREE.Fog(0x000000, 1, 100);

    // Create scene elements
    createTerrain();
    createFloatingIsland();
    createAstronauts();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-screen bg-black"
    />
  );
};

export default AlienWorldGame;