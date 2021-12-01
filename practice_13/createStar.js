import * as THREE from "../three/build/three.module.js";

const textloader = new THREE.TextureLoader();

function createMesh(geometry, URL) {
  let text_map = textloader.load(URL);
  const material = new THREE.MeshBasicMaterial({
    map: text_map,
    side: THREE.DoubleSide,
    transparent: true, // 开启透明模式
  });

  let mesh_sphere = new THREE.Mesh(geometry, material);
  return { mesh_sphere, text_map };
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
function createSphereMesh(name, R, URL, color) {
  let { mesh_sphere, text_map } = createMesh(geometry, URL);

  mesh_sphere.scale.set(R, R, R);
  mesh_sphere.name = name;
  if (name !== "Saturn" || name !== "Uranus") {
    let group = new THREE.Group();
    const sprite = createSprite(R, color);
    group.name = name;
    group.add(mesh_sphere);
    group.add(sprite);
    if (name === "Sun") {
      return { group, text_map };
    }
    return group;
  } else {
    return mesh_sphere;
  }
}

function createNorSphereMesh(name, R, URL_map, URL_nor, color) {
  // const geometry = new THREE.SphereGeometry(R, 100, 100);
  const mesh_nor_sphere = createNormalMesh(geometry, URL_map, URL_nor);
  mesh_nor_sphere.scale.set(R, R, R);
  mesh_nor_sphere.name = name;
  const group = new THREE.Group();
  group.add(mesh_nor_sphere);
  const sprite = createSprite(R, color);
  group.add(sprite);
  group.name = name;
  return group;
}

function createRingMesh(inner_r, outer_R, URL) {
  const geometry_ring = new THREE.RingGeometry(inner_r, outer_R, 32);
  const { mesh_sphere, text_map } = createMesh(geometry_ring, URL);

  return mesh_sphere;
}

function createPlanetMesh(
  name,
  sphere_R,
  shpere_url,
  inner_r,
  outer_R,
  ring_URL,
  color
) {
  const group = new THREE.Group();
  const shpere = createSphereMesh(name, sphere_R, shpere_url, color);
  const ring = createRingMesh(inner_r, outer_R, ring_URL);
  //   调整姿态
  ring.rotateX(Math.PI / 2);
  group.add(shpere, ring);
  const lightSprite = createLightMesh(outer_R, color);
  lightSprite.rotateX(Math.PI / 2);
  lightSprite.position.y += 0.01;
  group.add(lightSprite);
  return group;
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

const texture = new THREE.CanvasTexture(CanvasCir());
function createSprite(R, color) {
  const spriteMaterial = new THREE.SpriteMaterial({
    color: color,
    transparent: true,
    map: texture,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(2 * R * 1.2 + 1.3, 2 * R * 1.2 + 1.3, 1);
  return sprite;
}

// 通过矩形平面创建光圈
const lightGeometry = new THREE.PlaneGeometry(1, 1);
function createLightMesh(R, color) {
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(lightGeometry, material);
  mesh.scale.set(2 * R * 1.2, 2 * R * 1.2, 1);
  return mesh;
}

function CanvasCir() {
  const R = 400;
  const canvas = document.createElement("canvas");
  canvas.width = R;
  canvas.height = R;
  canvas.style.background = "rgba(255,0,0,0)";
  // get canvas content
  const c = canvas.getContext("2d");

  c.translate(R / 2, R / 2);

  c.lineWidth = R / 10;
  const grd = c.createRadialGradient(0, 0, R / 2 - c.lineWidth, 0, 0, R / 2);
  grd.addColorStop(0, "rgba(255,255,255,0.5)");
  grd.addColorStop(1, "rgba(255,255,255,0.0)");

  // 径向渐变
  c.strokeStyle = grd;
  c.arc(0, 0, (R - c.lineWidth) / 2, 0, Math.PI * 2, true);
  c.stroke();
  return canvas;
}

export { createSphereMesh, createNorSphereMesh, createPlanetMesh, circle };
