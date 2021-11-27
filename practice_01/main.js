import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
const scene = new THREE.Scene();

// camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// geometry sun
const textloader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(30, 25, 25);
const material = new THREE.MeshBasicMaterial({
  map: textloader.load("../assets/sun/512/sun.jpg"),
});

const mesh_sun = new THREE.Mesh(geometry, material);
scene.add(mesh_sun);

// geometry earth
const geometry_e = new THREE.SphereGeometry(10, 25, 25);
// 要使用法线贴图，就不能使用basic material
const material_e = new THREE.MeshPhongMaterial({
  map: textloader.load("../assets/earth/diffuse.png"),
  // 法线贴图
  normalMap: textloader.load("../assets/earth/normal.png"),
  // 设置深浅度
  normalScale: new THREE.Vector2(3, 3),
  // 高光贴图
  specularMap: textloader.load("../assets/earth/specular.png"),
});
const mesh_e = new THREE.Mesh(geometry_e, material_e);
scene.add(mesh_e);

mesh_e.position.x = 150;
// 坐标轴用于辅助开发  x、y、z轴颜色分别为R、G、B
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// light
const directionLight_F = new THREE.DirectionalLight(0xffffff, 0.9);
directionLight_F.position.set(400, 200, 300);
scene.add(directionLight_F);

const directionLight_B = new THREE.DirectionalLight(0xffffff, 0.9);
directionLight_B.position.set(-400, -200, -300);
scene.add(directionLight_B);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

function resizeRenderTosiplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    // false is very very important here
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resizeRenderTosiplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  // rotation
  mesh_sun.rotateY(0.01);
  mesh_e.rotateY(0.02);

  requestAnimationFrame(render);
}

render();
