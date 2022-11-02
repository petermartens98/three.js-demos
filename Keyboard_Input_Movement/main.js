// Neccesary Modules
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Window Resizing
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Disable key press scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x00000);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, -50);

// Lighting
// Point Light
const light = new THREE.PointLight()
scene.add(light)
const helper = new THREE.PointLightHelper(light)
scene.add(helper)
light.position.set(0,30,0)

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Grid and axis helper
const gridHelper = new THREE.GridHelper(100, 100);
//scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(3, 30, 30); 
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000FF,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.y = 3;

// Plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x065535,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

// dat GUI
// add later ability to change light position
const gui = new dat.GUI();
const options = {
    planeColor: '#0b820b',
    sphereColor: '#2800a2',
    wireframe: true
};
gui.addColor(options, 'planeColor').onChange(function(e){
    plane.material.color.set(e);
});
gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});
gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});


// Keyboard Input for Sphere Movement
// Add later to detect multiple key presses
var pos_par = .5;
var rot_par = pos_par;
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        sphere.position.x += pos_par;
        sphere.rotation.z -= rot_par;
        console.log('Left was pressed');
    }
    if(event.keyCode == 39) {
        sphere.position.x -= pos_par;
        sphere.rotation.z += rot_par;
        console.log('Right was pressed');
    }
    if(event.keyCode == 38) {
        sphere.position.z += pos_par;
        sphere.rotation.z += rot_par;
        console.log('Up was pressed');
    }
    if(event.keyCode == 40) {
        sphere.position.z -= pos_par;
        sphere.rotation.x -= rot_par;
        console.log('Down was pressed');
    }
    
});

// Animate / Render
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);
}
animate();