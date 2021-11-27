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
// public
const solar_system = [];
const sunOrib = new THREE.Object3D();
scene.add(sunOrib);
solar_system.push(sunOrib);
const geometry = new THREE.SphereGeometry(10, 25, 25);

const textloader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
  map: textloader.load("../assets/sun/512/sun.jpg"),
});
const mesh_sun = new THREE.Mesh(geometry, material);
mesh_sun.scale.set(5, 5, 5);
sunOrib.add(mesh_sun);
solar_system.push(mesh_sun);

// geometry earth

const earth_Orib = new THREE.Object3D();
earth_Orib.position.x = 150;
// earth rotational radius
const rot_earth = 150;
circle(rot_earth);
solar_system.push(earth_Orib);
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
const mesh_e = new THREE.Mesh(geometry, material_e);
mesh_e.scale.set(1.4, 1.4, 1.4);
sunOrib.add(earth_Orib);
earth_Orib.add(mesh_e);
solar_system.push(mesh_e);

// moon
const moon_Oribit = new THREE.Object3D();
moon_Oribit.position.x = 26;
earth_Orib.add(moon_Oribit);
const material_moon = new THREE.MeshPhongMaterial({
  map: textloader.load("../assets/moon/moon.jpg"),
  normalMap: textloader.load("../assets/moon/normal.jpg"),
  normalScale: new THREE.Vector2(4, 4),
});
const mesh_moon = new THREE.Mesh(geometry, material_moon);
mesh_moon.scale.set(0.7, 0.7, 0.7);
moon_Oribit.add(mesh_moon);
solar_system.push(moon_Oribit);

// Staturn
createSaturn(20);
circle(230);

// mesh_e.position.x = 150;
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
  // mesh_sun.rotateY(0.01);
  // mesh_e.rotateY(0.02);
  solar_system.forEach((star, ndx) => {
    star.rotateY(0.005 * (ndx + 1));
  });

  requestAnimationFrame(render);
}

render();

function circle(r) {
  // use ArcCurve to draw a curve
  // Math.PI==180
  const arc = new THREE.ArcCurve(0, 0, r, 0, Math.PI * 2, true);
  // the more points the curve more smooth
  const points = arc.getPoints(300); // it will reture a vector2 array
  // new THREE.Geometry()不能使用了，现在用new THREE.BufferGeometry()来代替
  const geometry_line = new THREE.BufferGeometry();
  //setFromPoints方法的本质：遍历points把vector2转变化vector3
  geometry_line.setFromPoints(points);
  const material_line = new THREE.LineBasicMaterial({
    color: 0x006666,
  });
  const line = new THREE.LineLoop(geometry_line, material_line);
  // 圆弧线默认在XOY平面上，绕x轴旋转到XOZ平面上
  line.rotateX(Math.PI / 2);
  scene.add(line);
}

function createSaturn(r) {
  // create orib
  const SatuOrib = new THREE.Object3D();
  SatuOrib.position.z = 230;
  sunOrib.add(SatuOrib);
  solar_system.push(SatuOrib);
  // create a group

  const group = new THREE.Group();
  SatuOrib.add(group);
  solar_system.push(group);

  const material_sta = new THREE.MeshBasicMaterial({
    map: textloader.load("../assets/saturn/saturn.jpg"),
  });
  const mesh_sta = new THREE.Mesh(geometry, material_sta);
  mesh_sta.scale.set(2, 2, 2);
  group.add(mesh_sta);

  // ring
  const geometry_ring = new THREE.RingGeometry(r * 1.1, r * 1.6, 30);
  const material_ring = new THREE.MeshBasicMaterial({
    map: textloader.load("../assets/saturn/saturn_ring.png"),
    side: THREE.DoubleSide,
  });
  const mesh_ring = new THREE.Mesh(geometry_ring, material_ring);
  group.add(mesh_ring);
  // 调整姿态
  mesh_ring.rotateX(Math.PI / 2);
}
