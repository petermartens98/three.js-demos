// Neccessary Imports
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scence
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 30, 50);

// Lighting
// Ambient Light 
const ambientLight =  new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Physics World
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
});
const groundPhysMat = new CANNON.Material();

// Ground Plane
const groundGeo = new THREE.PlaneGeometry(50, 50, 100, 100);
const groundMat = new THREE.MeshBasicMaterial({ 
	color: 0x0000ff,
	side: THREE.DoubleSide,
	wireframe: true 
 });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

const groundBody = new CANNON.Body({
    //shape: new CANNON.Plane(),
    //mass: 10
    shape: new CANNON.Box(new CANNON.Vec3(25, 25, 0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhysMat
});
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

//Animate
const timeStep = 1 / 60;

function animate() {
    world.step(timeStep);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Window resizing
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
