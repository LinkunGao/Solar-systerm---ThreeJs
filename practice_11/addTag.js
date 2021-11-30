import * as THREE from "../three/build/three.module.js";

// function craeteCamera() {
//   // 正交投影相机
//   const aspect = window.innerWidth / window.innerHeight; //窗口宽高比
//   //可以根据最外围的海王星公转半径100 * 5设置改参数
//   const s = 620; //s参数影响相机渲染的上下左右范围
//   //创建相机对象
//   // 注意相机参数6远裁界面可以包含全部星体在内
//   const camera = new THREE.OrthographicCamera(
//     -s * aspect,
//     s * aspect,
//     s,
//     -s,
//     1,
//     1500
//   );

//   return camera;
// }

function createImg() {
  const div = document.createElement("div");
  // div.style.position = "absolute";
  // div.style.display = "block";
  document.body.appendChild(div);
  // const img = document.createElement("img");
  // div.appendChild(img);
  // div.style.padding = "6px 10px";
  // div.style.color = "#fff";
  // div.style.backgroundColor = "rgba(78, 212, 203,0.5)";
  // div.className = "planet_tag";
  // return img;
  return div;
}

function createTag(str) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.position = "absolute";
  div.style.display = "block";
  div.innerText = str;
  div.style.padding = "6px 10px";
  div.style.color = "#fff";
  div.style.fontSize = "14px";
  div.style.backgroundColor = "rgba(25,25,25,0.3)";
  div.style.borderRadius = "5px";
  return div;
}

// 通过该函数计算星体在canvas画布上的屏幕坐标
function tagXYVertex(planet, camera) {
  const worldVetor = new THREE.Vector3();
  // 获取选中行星的世界坐标
  planet.getWorldPosition(worldVetor);

  //   获取选中星球的第一个顶点
  const v3 = new THREE.Vector3();

  //   var vertices = planet.geometry.boundingSphere;
  //   v3.copy(planet.geometry.vertices[0]); 现在已经淘汰了
  if (planet.type == "Group") {
    v3.copy(planet.up);
  } else {
    v3.copy(planet.up);
  }

  //   还需要考虑星球的缩放
  // v3.multiplyScalar(planet.R);
  //   console.log(v3);
  //   在世界坐标上加上几何体的顶点坐标
  worldVetor.add(v3);
  // 将世界坐标转换为标准设备坐标
  const standardVertor = worldVetor.project(camera);
  const a = window.innerWidth / 2;
  const b = window.innerHeight / 2;
  // 标准设备坐标转屏幕坐标：计算HTML标签纵横坐标
  const x = Math.round(standardVertor.x * a + a);
  const y = Math.round(-standardVertor.y * b + b);

  //   console.log(x);
  // 设置标签纵横坐标适当偏移一定距离
  if (planet.name === "Sun") {
    planet.tag.style.left = x + "px";
    planet.tag.style.top = y - 60 + "px";
  } else {
    planet.tag.style.left = x + "px";
    planet.tag.style.top = y - 40 + "px";
  }
}

export { createTag, tagXYVertex, createImg };
