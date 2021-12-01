import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
  canvas: document.querySelector("#bg"),
});

// const fov = 75;
// const aspect = window.innerWidth / window.innerHeight;
// const near = 0.01;
// const far = 1000;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(0, 0, 200);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// light
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(400, 200, 300);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(pointlight);
scene.add(ambientLight);

// geometry
const textloader = new THREE.TextureLoader();
const sun_text = textloader.load("../assets/sun/512/sun.jpg");
const geometry = new THREE.SphereGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({
  map: sun_text,
});

sun_text.wrapS = THREE.RepeatWrapping;
sun_text.wrapT = THREE.RepeatWrapping;
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

// create a sprite
// 方法一，直接使用threejs加载光圈图片
// const spriteMaterial = new THREE.SpriteMaterial({
//   color: 0xffff00,
//   tranparent: true,
//   map: textloader.load("../assets/sprite/white.png"),
// });
// 方法二，通过canvas绘制光圈
const canvas_text = new THREE.CanvasTexture(CanvasCir());
const spriteMaterial = new THREE.SpriteMaterial({
  color: 0xffbb33,
  transparent: true,
  map: canvas_text,
});

const sprite = new THREE.Sprite(spriteMaterial);
scene.add(sprite);
sprite.scale.set(49, 49, 1);

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

  sun_text.offset.x -= 0.001;
  sun_text.offset.y += 0.001;

  renderer.render(scene, camera);
  // rotation
  requestAnimationFrame(render);
}

render();

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// 方法二，使用canvas制作光圈
function CanvasCir() {
  // 半径
  const R = 400;
  const canvas = document.createElement("canvas");
  canvas.width = R;
  canvas.height = R;
  // 这是背景色为0的透明度
  canvas.style.background = "rgba(255, 0, 0, 0)";
  // 获取canvas元素上下文
  const c = canvas.getContext("2d");
  // 坐标原点居中
  c.translate(R / 2, R / 2);

  // 线宽
  c.lineWidth = R / 10;
  // 通过渐变色设置一个透明度渐变光圈
  const grd = c.createRadialGradient(0, 0, R / 2 - c.lineWidth, 0, 0, R / 2);
  grd.addColorStop(0, "rgba(255,255,255,0.5)");
  grd.addColorStop(1, "rgba(255,255,255,0.0)");
  // 径向渐变
  c.strokeStyle = grd;
  c.arc(0, 0, (R - c.lineWidth) / 2, 0, Math.PI * 2, true);
  c.stroke();
  return canvas;
}
