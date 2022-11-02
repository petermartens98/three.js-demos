// Necessary Imports
// npm install three
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//npm install dat.gui
import * as dat from 'dat.gui';


// Define Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Note: Using HEX color system
// https://www.htmlcsscolor.com/hex

// Sets the color of the background
renderer.setClearColor(0x00000);

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

// Camera positioning - x, y, z
camera.position.set(30, 30, 30);
orbit.update();

// Sets a gird helper - Size , Amount of Squares
const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

// Set x, y, and z axes with each having a length of 5
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

// Lighting
// white lighing = 0xffffff
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10); 
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Sphere
// SphereGeometry(radius, width segments, height segments)
const sphereGeometry = new THREE.SphereGeometry(3, 30, 30); 
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x065535,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
//Rotate Plane
plane.rotation.x = -0.5 * Math.PI;

// Object Placement
sphere.position.y = 10;

// Add data entry with dat.gui
const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
};

// GUIs to change properties
gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

// Sphere bouncing
let step = 0;

// Animation
function animate(time) {
    // Rotations
    // sphere.rotation.y = time / 1000;

    // Position Changes
    //sphere.position.y += .001;

    // Bouncing sphere
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    // Rendering
    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);
}
//renderer.setAnimationLoop(animate); moved into animate loop
animate();

// Add ability to resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
