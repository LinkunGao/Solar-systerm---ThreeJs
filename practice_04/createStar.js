import * as THREE from "../three/build/three.module.js";

const textloader = new THREE.TextureLoader();

function createMesh(geometry, URL) {
  const material = new THREE.MeshBasicMaterial({
    map: textloader.load(URL),
    side: THREE.DoubleSide,
    transparent: true, // 开启透明模式
  });
  return new THREE.Mesh(geometry, material);
}
function createNormalMesh(geometry, URL_map, URL_nor) {
  const material = new THREE.MeshPhongMaterial({
    map: textloader.load(URL_map),
    normalMap: textloader.load(URL_nor),
    normalScale: new THREE.Vector2(4, 4),
    side: THREE.DoubleSide,
    transparent: true, // 开启透明模式
  });
  return new THREE.Mesh(geometry, material);
}
// para: radius
function createSphereMesh(R, URL) {
  const geometry = new THREE.SphereGeometry(R, 100, 100);
  return createMesh(geometry, URL);
}

function createNorSphereMesh(R, URL_map, URL_nor) {
  const geometry = new THREE.SphereGeometry(R, 100, 100);
  return createNormalMesh(geometry, URL_map, URL_nor);
}

function createRingMesh(inner_r, outer_R, URL) {
  const geometry = new THREE.RingGeometry(inner_r, outer_R, 32);
  return createMesh(geometry, URL);
}

function createPlanetMesh(sphere_R, shpere_url, inner_r, outer_R, ring_URL) {
  const group = new THREE.Group();
  const shpere = createSphereMesh(sphere_R, shpere_url);
  const ring = createRingMesh(inner_r, outer_R, ring_URL);
  //   调整姿态
  ring.rotateX(Math.PI / 2);
  return group.add(shpere, ring);
}

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
  return line;
}

export { createSphereMesh, createNorSphereMesh, createPlanetMesh, circle };
