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
// 提高球体的复用率
const geometry = new THREE.SphereGeometry(1, 100, 100);
function createSphereMesh(name, R, URL) {
  const mesh_sphere = createMesh(geometry, URL);
  mesh_sphere.scale.set(R, R, R);
  mesh_sphere.name = name;
  return mesh_sphere;
}

function createNorSphereMesh(name, R, URL_map, URL_nor) {
  // const geometry = new THREE.SphereGeometry(R, 100, 100);
  const mesh_nor_sphere = createNormalMesh(geometry, URL_map, URL_nor);
  mesh_nor_sphere.scale.set(R, R, R);
  mesh_nor_sphere.name = name;
  return mesh_nor_sphere;
}

function createRingMesh(inner_r, outer_R, URL) {
  const geometry_ring = new THREE.RingGeometry(inner_r, outer_R, 32);
  const ring_mesh = createMesh(geometry_ring, URL);

  return ring_mesh;
}

function createPlanetMesh(
  name,
  sphere_R,
  shpere_url,
  inner_r,
  outer_R,
  ring_URL
) {
  const group = new THREE.Group();
  const shpere = createSphereMesh(name, sphere_R, shpere_url);
  const ring = createRingMesh(inner_r, outer_R, ring_URL);
  //   调整姿态
  ring.rotateX(Math.PI / 2);
  return group.add(shpere, ring);
}

// use ArcCurve to draw a curve
// Math.PI==180
const arc = new THREE.ArcCurve(0, 0, 1, 0, Math.PI * 2, true);
// the more points the curve more smooth
const points = arc.getPoints(300); // it will reture a vector2 array
// new THREE.Geometry()不能使用了，现在用new THREE.BufferGeometry()来代替
const geometry_line = new THREE.BufferGeometry();
//setFromPoints方法的本质：遍历points把vector2转变化vector3
geometry_line.setFromPoints(points);
const material_line = new THREE.LineBasicMaterial({
  color: 0x006666,
});

function circle(r) {
  const line = new THREE.LineLoop(geometry_line, material_line);
  line.scale.set(r, r, r);
  // 圆弧线默认在XOY平面上，绕x轴旋转到XOZ平面上
  line.rotateX(Math.PI / 2);
  return line;
}

export { createSphereMesh, createNorSphereMesh, createPlanetMesh, circle };
