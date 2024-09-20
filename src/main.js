import './styles.css';
import * as THREE from 'three';

// Select the container where you want to render the scene
const container = document.getElementById('threejs-container');

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x18181B); // Light blue color (hex code)


// Set up the camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 10;

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);

// Append the renderer's canvas to the selected container
container.appendChild(renderer.domElement);

// 1. Add Main Light (DirectionalLight)
const mainLight = new THREE.DirectionalLight(0xffffff, 3); // White light, full intensity
mainLight.position.set(5, 5, 5); // Position the light above and to the side
scene.add(mainLight);


// Optionally, add an Ambient Light for subtle global illumination
const ambientLight = new THREE.AmbientLight(0x404040, 6); // Soft white light with low intensity
scene.add(ambientLight);

// Create a function to generate globes
function createGlobe(color, positionX) {
  // Create a sphere geometry (the globe)
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  
  // Create a material with the specified color
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.5,
    roughness: 0.8
  });
  
  // Create a mesh (combination of geometry and material)
  const globe = new THREE.Mesh(geometry, material);
  
  // Position the globe
  globe.position.x = positionX;

  // Add the globe to the scene
  scene.add(globe);
  
  return globe;
}

// Create a function to generate boxes (instead of globes)
function createBox(color) {
    // Create a box geometry (the box)
    const geometry = new THREE.BoxGeometry(3, 3, 3); // Box dimensions: width, height, depth
  
    // Create a material with the specified color
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.5,
      roughness: 0.8
    });
  
    // Create a mesh (combination of geometry and material)
    const box = new THREE.Mesh(geometry, material);
  
    // Add the box to the scene
    scene.add(box);
  
    return box;
  }

// Create a function to generate pyramids (instead of globes or boxes)
function createPyramid(color) {
    // Create a cone geometry (the pyramid) with 4 radial segments
    const geometry = new THREE.ConeGeometry(3, 5, 4); // Base radius, height, radial segments (4 for a pyramid)
  
    // Create a material with the specified color
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.5,
      roughness: 0.8
    });
  
    // Create a mesh (combination of geometry and material)
    const pyramid = new THREE.Mesh(geometry, material);
  
    // Add the pyramid to the scene
    scene.add(pyramid);
  
    return pyramid;
  }

// Create three globes with different colors and positions
const globe1 = createGlobe(0x34D399, 32);
const globe2 = createBox(0xFBBF24, 32); 
const globe3 = createPyramid(0xDB2777, 32); 

// Position Emerald (e.g., x: -10, y: 0, z: -5)
globe1.position.set(-7, 0, -5);

// Position Amber (e.g., x: 5, y: 3, z: 10)
globe2.position.set(1, 2, -2);

// Position Pink (e.g., x: 15, y: -4, z: -2)
globe3.position.set(0, -2, -2);

// Animation variables
let angle = 0;
const speed = 0.01;  // Rotation speed
const radius = 4;    // Radius of circular motion

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the angle for the circular motion
  angle += speed;

  // Globe 1 (Emerald) - Circular motion
  globe1.position.x = Math.cos(angle) * radius;
  globe1.position.z = Math.sin(angle) * radius;

  // Globe 2 (Amber) - Circular motion, smaller radius
  globe2.position.x = Math.cos(angle + Math.PI / 2) * radius * 0.8;
  globe2.position.z = Math.sin(angle + Math.PI / 2) * radius * 0.8;

  // Globe 3 (Pink) - Circular motion, different offset
  globe3.position.x = Math.cos(angle + Math.PI) * radius * 0.6;
  globe3.position.z = Math.sin(angle + Math.PI) * radius * 0.6;

  // Optionally rotate the globes around their own axes
  globe1.rotation.y += 0.01;
  globe2.rotation.y += 0.01;
  globe3.rotation.y += 0.01;

  // Render the scene with the updated camera
  renderer.render(scene, camera);
}

animate();
