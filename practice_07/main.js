import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
import * as Tag from "./addTag.js";

// const scene = new THREE.Scene();

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#bg"),
// });
// renderer.setClearColor(0x888888, 1);

// // const fov = 75;
// // const aspect = window.innerWidth / window.innerHeight;
// // const near = 0.01;
// // const far = 1000;
// // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// // camera.position.set(0, 0, 200);

// var width = window.innerWidth; //窗口宽度
// var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// // light
// const pointlight = new THREE.PointLight(0xffffff);
// pointlight.position.set(400, 200, 300);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
// scene.add(pointlight, ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 0);
// controls.update();
// // geometry

// const box = new THREE.BoxGeometry(30, 30, 30);
// const material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
// });
// const box_mesh = new THREE.Mesh(box, material);
// scene.add(box_mesh);
// const div = Tag.createTag("mine");
// box_mesh.tag = div;

// // materital

// function resizeRenderTosiplaySize(renderer) {
//   const canvas = renderer.domElement;
//   const pixelRatio = window.devicePixelRatio;
//   const width = (canvas.clientWidth * pixelRatio) | 0;
//   const height = (canvas.clientHeight * pixelRatio) | 0;

//   const needResize = canvas.width !== width || canvas.height !== height;
//   if (needResize) {
//     renderer.setSize(width, height, false);
//   }
//   return needResize;
// }

// function render() {
//   if (resizeRenderTosiplaySize(renderer)) {
//     const canvas = renderer.domElement;
//     camera.aspect = canvas.width / canvas.height;
//     camera.updateProjectionMatrix();
//   }

//   if (box_mesh.position.z < 100) {
//     box_mesh.position.z += 0.5;
//   } else {
//     box_mesh.position.z = 0;
//   }

//   Tag.tag(box_mesh, camera);
//   renderer.render(scene, camera);
//   // rotation
//   requestAnimationFrame(render);
// }

// render();

var scene = new THREE.Scene();
/**需要添加标签的立方体*/
var geometry = new THREE.BoxGeometry(100, 100, 100);
// var geometry = new THREE.SphereGeometry(150, 30, 30);
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
});
var boxMesh = new THREE.Mesh(geometry, material);
// 网格模型设置不同的位置，标签显示在对应的位置
// boxMesh.position.set(80, 0, 0);
// boxMesh.position.set(0, 100, 0);
// boxMesh.position.set(0, 0, 50);
scene.add(boxMesh);
var axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
/**
 * 光源设置
 */
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
var ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0x888888, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();

/**
 * 立方体世界坐标转屏幕坐标
 */
//创建一个三维向量作为世界坐标
var worldVector = new THREE.Vector3();
const v3 = new THREE.Vector3();
console.log();

//获取网格模型boxMesh的世界坐标，赋值给worldVector
boxMesh.getWorldPosition(worldVector);
//获取模型某个顶点的坐标
// var v3 = geometry.vertices[0].clone();

const vertices = boxMesh.geometry.attributes.position.array;
v3.x = vertices[0];
v3.y = vertices[1];
v3.z = vertices[2];
console.log(v3);

//世界坐标加上顶点坐标，进行更精准的标注
worldVector.add(v3);
//世界坐标转标准设备坐标，standardVector是WebGL标准设备坐标
// .project()方法提取相机参数的视图矩阵、投影矩阵对世界坐标进行变换
var standardVector = worldVector.project(camera);

// 根据WebGL标准设备坐标standardVector计算div标签在浏览器页面的屏幕坐标
// 标准设备坐标转屏幕坐标
var a = window.innerWidth / 2;
var b = window.innerHeight / 2;
var x = Math.round(standardVector.x * a + a); //模型标签x坐标，单位像素
var y = Math.round(-standardVector.y * b + b); //模型标签y坐标，单位像素

/**
 * 创建div元素(作为立方体标签)
 */
var div = document.createElement("div");
div.innerHTML = "立方体";
div.style.padding = "10px";
div.style.color = "#fff";
div.style.position = "absolute";
div.style.backgroundColor = "rgba(25,25,25,0.5)";
div.style.borderRadius = "5px";
document.body.appendChild(div);

/**
 * 设置标签元素的位置
 */
div.style.left = x + "px";
div.style.top = y + "px";
