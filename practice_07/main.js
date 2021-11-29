import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
import * as Tag from "./addTag.js";
import * as CREATE from "./createStar.js";
import { getData } from "./data.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setClearColor(0x888888, 1);

// const fov = 75;
// const aspect = window.innerWidth / window.innerHeight;
// const near = 0.01;
// const far = 1000;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(0, 0, 200);

// var width = window.innerWidth; //窗口宽度
// var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// 正交投影相机
const aspect = window.innerWidth / window.innerHeight; //窗口宽高比
//可以根据最外围的海王星公转半径100 * 5设置改参数
const s = 620; //s参数影响相机渲染的上下左右范围
//创建相机对象
// 注意相机参数6远裁界面可以包含全部星体在内
const camera = new THREE.OrthographicCamera(
  -s * aspect,
  s * aspect,
  s,
  -s,
  1,
  1500
);
camera.position.set(500, 613, 525); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// light
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(400, 200, 300);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(pointlight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
// geometry

// const box = new THREE.BoxGeometry(15, 15, 15);
// const material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
// });
// const box_mesh = new THREE.Mesh(box, material);

// const box_mesh = CREATE.createSphereMesh(
//   "haha",
//   18,
//   "../assets/venus/venus.jpg"
// );
// scene.add(box_mesh);

const data = getData();
const planetGroup = new THREE.Group();
scene.add(planetGroup);
data.planet.forEach((star) => {
  const angle = 2 * Math.PI * Math.random();
  if (star.name === "Earth") {
    console.log(star.name);
  } else if (star.name === "Saturn" || star.name === "Uranus") {
    const s = CREATE.createPlanetMesh(
      star.name,
      star.shpere.R,
      star.shpere.URL,
      star.ring.r,
      star.ring.R,
      star.ring.URL
    );
    const div = Tag.createTag("mine");
    const x = star.revolutionR * Math.sin(angle);
    const z = star.revolutionR * Math.cos(angle);
    s.position.set(x, 0, z);
    s.angle = angle;
    s.revolutionR = star.revolutionR;
    s.tag = div;
    planetGroup.add(s);
  }
});
// const div = Tag.createTag("mine");
// box_mesh.tag = div;

// box_mesh.angle = angle;
// box_mesh.position.set(x, 0, z);
// console.log(box_mesh);

// materital

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

  planetGroup.children.forEach((c) => {
    c.angle += (0.005 / c.revolutionR) * 300;
    // 行星公转过程位置设置
    c.position.set(
      c.revolutionR * Math.sin(c.angle),
      0,
      c.revolutionR * Math.cos(c.angle)
    );

    Tag.tag(c, camera);
  });

  renderer.render(scene, camera);
  // rotation
  requestAnimationFrame(render);
}

render();
