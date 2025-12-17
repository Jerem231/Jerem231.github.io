import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const mount = document.getElementById("viewer");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);

const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 2000);
camera.position.set(0, 1.2, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
mount.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const dir = new THREE.DirectionalLight(0xffffff, 1.2);
dir.position.set(3, 4, 2);
scene.add(dir);

function frameObject(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());
  obj.position.sub(center);

  camera.near = size / 100;
  camera.far = size * 10;
  camera.updateProjectionMatrix();

  camera.position.set(0, size * 0.15, size * 0.35);
  controls.target.set(0, 0, 0);
  controls.update();
}

new OBJLoader().load("/assets/models/model.obj", (obj) => {
  obj.traverse((m) => {
    if (m.isMesh) {
      m.material = new THREE.MeshStandardMaterial({ color: 0xdfe7ff, roughness: 0.6, metalness: 0.1 });
    }
  });
  scene.add(obj);
  frameObject(obj);
}, undefined, (err) => console.error("OBJ load error:", err));

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  const w = mount.clientWidth, h = mount.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
