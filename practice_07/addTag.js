import * as THREE from "../three/build/three.module.js";

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
    // v3.copy(obj.children[0].geometry.vertices[0]);
    // console.log(planet);
    v3.copy(planet.up);
  } else {
    v3.copy(planet.up);
    // console.log(obj.geometry);
  }

  //   还需要考虑星球的缩放
  v3.multiplyScalar(planet.R);
  //   console.log(v3);
  //   在世界坐标上加上几何体的顶点坐标
  worldVetor.add(v3);
  // 将世界坐标转换为标准设备坐标
  const standardVertor = worldVetor.project(camera);
  const a = window.innerWidth / 2;
  const b = window.innerHeight / 2;
  // 标准设备坐标转屏幕坐标：计算HTML标签纵横坐标
  const x = Math.round(standardVertor.x * a + a);
  const y = Math.round(standardVertor.y * b + b);

  //   console.log(x);
  // 设置标签纵横坐标适当偏移一定距离
  planet.tag.style.left = x + "px";
  planet.tag.style.top = y - 70 + "px";
}

function tag(box, camera) {
  /**
   * 立方体世界坐标转屏幕坐标
   */
  //创建一个三维向量作为世界坐标
  var worldVector = new THREE.Vector3();
  //获取网格模型boxMesh的世界坐标，赋值给worldVector
  box.getWorldPosition(worldVector);
  //世界坐标转标准设备坐标，standardVector是WebGL设备坐标
  var standardVector = worldVector.project(camera);
  // 根据WebGL标准设备坐标standardVector计算div标签在浏览器页面的坐标
  var a = window.innerWidth / 2;
  var b = window.innerHeight / 2;
  var x = Math.round(standardVector.x * a + a); //标准设备坐标转屏幕坐标
  var y = Math.round(-standardVector.y * b + b); //标准设备坐标转屏幕坐标
  /**
   * 设置标签元素的位置
   */
  box.tag.style.left = x + "px";
  //这里的130px主要是为了标签和模型有一定偏移，当然也可以不设置，两者叠加在一起
  box.tag.style.top = y - 130 + "px";
}

export { createTag, tagXYVertex, tag };
