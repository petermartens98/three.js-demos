// Neccesary Modules
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'THREE/examples/jsm/loaders/GLTFLoader.js'

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
camera.position.set(100, 100, 150);

// Lighting
// Ambient Light
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
// Hemisphere Light
var hemLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(hemLight);

// Orbit Controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Grid and axis helper
//const gridHelper = new THREE.GridHelper(100, 100);
//scene.add(gridHelper);
//const axesHelper = new THREE.AxesHelper(100);
//scene.add(axesHelper);

// Plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x065535,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

// Import 3D model
// Link: https://sketchfab.com/3d-models/tyrannosarus-rex-free-model-e18c433cdd1c49f8ac152348b7384037
var obj;
var gltfLoader = new GLTFLoader();
gltfLoader.load("./t-rex/scene.gltf", function (gltf){
    obj = gltf.scene;
    obj.scale.set(5, 5, 5);
    scene.add(obj);
});

// dat GUI
// add later ability to change light position
const gui = new dat.GUI();
const options = {
    planeColor: '#0d7f49'
};
gui.addColor(options, 'planeColor').onChange(function(e){
    plane.material.color.set(e);
});

// Animate / Render
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();