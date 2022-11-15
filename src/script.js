import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// font
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

/**
 * Object
 */
// create 100 random object
for (let i = 0; i < 200; i++) {
  // create a sphere
  const geometry = new THREE.SphereBufferGeometry(0.1, 16, 16);
  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  const sphere = new THREE.Mesh(geometry, material);

  // set position
  sphere.position.x = (Math.random() - 0.5) * 10;
  sphere.position.y = (Math.random() - 0.5) * 10;
  sphere.position.z = (Math.random() - 0.5) * 10;

  // add to scene
  scene.add(sphere);

  // create a cube
  const geometry2 = new THREE.BoxBufferGeometry(0.1, 0.1, 0.05);
  const material2 = new THREE.MeshMatcapMaterial();
  material2.matcap = matcapTexture;
  const cube = new THREE.Mesh(geometry2, material2);

  // set position
  cube.position.x = (Math.random() - 0.5) * 10;
  cube.position.y = (Math.random() - 0.5) * 10;
  cube.position.z = (Math.random() - 0.5) * 10;

  // add to scene
  scene.add(cube);

  // create a torus
  const geometry3 = new THREE.TorusBufferGeometry(0.1, 0.05, 16, 32);
  const material3 = new THREE.MeshMatcapMaterial();
  material3.matcap = matcapTexture;
  const torus = new THREE.Mesh(geometry3, material3);

  // set position
  torus.position.x = (Math.random() - 0.5) * 10;
  torus.position.y = (Math.random() - 0.5) * 10;
  torus.position.z = (Math.random() - 0.5) * 10;

  // add to scene
  scene.add(torus);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
