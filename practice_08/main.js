import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
import * as CREATE from "./createStar.js";
import { getData } from "./data.js";
import * as C_Tag from "./addTag.js";

// all stars data
const data = getData();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
const scene = new THREE.Scene();

// camera;
// const fov = 75;
// const aspect = window.innerWidth / window.innerHeight;
// const near = 1;
// const far = 1500;

// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

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

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// geometry sun
// public
// 公转思路一
const solar_system = [];
// 公转思路二
// const planetGroup = new THREE.Group();
const sunOrib = new THREE.Object3D();
scene.add(sunOrib);
solar_system.push(sunOrib);

const sun = CREATE.createSphereMesh(data.sun.name, data.sun.R, data.sun.URL);

sunOrib.add(sun);
sun.tag = C_Tag.createTag(sun.name);
// planetGroup.add(sun);

solar_system.push(sun);
data.planet.forEach((planet) => {
  const line = CREATE.circle(planet.revolutionR);
  scene.add(line);
  // 计算角度，让每个星球的分布不同
  let angle = 2 * Math.PI * Math.random();
  if (planet.name === "Earth") {
    const Earth_Orib = new THREE.Object3D();
    const earth = CREATE.createNorSphereMesh(
      planet.name,
      planet.R,
      planet.URL,
      planet.URL_Nor
    );
    const Moon_Orib = new THREE.Object3D();
    const moon = CREATE.createNorSphereMesh(
      planet.moon.name,
      planet.moon.R,
      planet.moon.URL,
      planet.moon.URL_Nor
    );

    Earth_Orib.R = planet.R;
    Earth_Orib.tag = C_Tag.createTag(earth.name);
    Moon_Orib.R = planet.moon.R;
    Moon_Orib.tag = C_Tag.createTag(moon.name);

    Earth_Orib.name = "earth";
    Earth_Orib.angle = angle;
    Earth_Orib.revolutionR = planet.revolutionR;
    Earth_Orib.position.x = planet.revolutionR;
    Moon_Orib.position.x = 35;
    Moon_Orib.angle = angle;
    Moon_Orib.name = "moon";
    Moon_Orib.revolutionR = 35;

    sunOrib.add(Earth_Orib);
    Earth_Orib.add(earth);
    Earth_Orib.add(Moon_Orib);
    Moon_Orib.add(moon);

    solar_system.push(Earth_Orib);
    solar_system.push(Moon_Orib);
  } else if (planet.name === "Saturn" || planet.name === "Uranus") {
    const star_Orib = new THREE.Object3D();
    const star = CREATE.createPlanetMesh(
      planet.name,
      planet.shpere.R,
      planet.shpere.URL,
      planet.ring.r,
      planet.ring.R,
      planet.ring.URL
    );
    // star_Orib.position.z = planet.recolutionR;
    star_Orib.position.set(
      planet.revolutionR * Math.sin(angle),
      0,
      planet.revolutionR * Math.cos(angle)
    );
    star_Orib.tag = C_Tag.createTag(star.children[0].name);
    star_Orib.angle = angle;
    star_Orib.revolutionR = planet.revolutionR;
    star_Orib.add(star);
    sunOrib.add(star_Orib);
    solar_system.push(star_Orib);
  } else {
    const Orib = new THREE.Object3D();

    const star = CREATE.createSphereMesh(planet.name, planet.R, planet.URL);

    const x = planet.revolutionR * Math.sin(angle);
    const z = planet.revolutionR * Math.cos(angle);

    Orib.tag = C_Tag.createTag(star.name);
    Orib.position.set(x, 0, z);
    Orib.angle = angle;
    Orib.revolutionR = planet.revolutionR;
    Orib.add(star);
    sunOrib.add(Orib);
    solar_system.push(Orib);
  }
});

// 坐标轴用于辅助开发  x、y、z轴颜色分别为R、G、B
// const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

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
// solar_system[0].children.forEach((a) => {
//   console.log(a.revolutionR);
// });

function render() {
  if (resizeRenderTosiplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);

  C_Tag.tagXYVertex(sun, camera);

  solar_system[0].children.forEach((planet) => {
    planet.rotateY(0.02);
    if (planet.angle) {
      if (planet.name == "earth") {
        planet.rotateY(0.01);
        planet.children.forEach((star) => {
          if (star.name === "moon") {
            C_Tag.tagXYVertex(star, camera);
            // console.log(star.revolutionR);
            star.angle += (0.005 / star.revolutionR) * 130;
            star.position.set(
              star.revolutionR * Math.sin(star.angle),
              0,
              star.revolutionR * Math.cos(star.angle)
            );
            // star.position.set(15, 0, 15);
          }
        });
      }
      // 半径越大，转动速度越慢
      planet.angle += (0.005 / planet.revolutionR) * 300;
      // 行星公转过程位置设置
      planet.position.set(
        planet.revolutionR * Math.sin(planet.angle),
        0,
        planet.revolutionR * Math.cos(planet.angle)
      );
      C_Tag.tagXYVertex(planet, camera);
    }
  });

  requestAnimationFrame(render);
}

render();
