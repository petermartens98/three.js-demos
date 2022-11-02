// Necessary Imports
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Define Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

// Define Scene
const scene = new THREE.Scene();

// Define Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Set orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

// Sets a 10 by 10 gird helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Set x, y, and z axes with each having a length of 5
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Animation
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Add ability to resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});