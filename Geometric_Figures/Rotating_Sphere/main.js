import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Sphere

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
var ball = new THREE.Mesh( geometry, material );
scene.add( ball );


// Geometry Animation

function animate() {
  requestAnimationFrame(animate);

  ball.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
