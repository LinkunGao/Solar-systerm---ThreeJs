import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  canvas: document.querySelector("#bg"),
});

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 200);

// var width = window.innerWidth; //窗口宽度
// var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// light
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(400, 200, 300);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(pointlight);
scene.add(ambientLight);

// geometry

const box = new THREE.BoxGeometry(30, 30, 30);
const loader = new THREE.TextureLoader();
// materital
const material = new THREE.MeshPhongMaterial({
  map: loader.load("../assets/img/Pikachu-music.png"),
});
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);

function resizeRenderTosiplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resizeRenderTosiplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  // rotation
  requestAnimationFrame(render);
}

render();

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

function chooose(event) {
  // mouse x
  const Sx = event.clientX;
  const Sy = event.clientY;
  // change client screen to webGL
  const x = (Sx / window.innerWidth) * 2 - 1;
  const y = -(Sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(), camera);

  // get the box
  const interects = raycaster.intersectObjects([mesh]);
  console.log(interects);

  if (interects.length > 0) {
    interects[0].object.material.transparent = true;
    interects[0].object.material.opacity = 0.6;
  }
}

window.addEventListener("click", chooose);
