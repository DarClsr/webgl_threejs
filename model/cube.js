import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
export default class CubebOX {
  constructor(w = 100, h = 100, color = "0x00ff00") {
    this.cube = "";
    this.w = w;
    this.h = h;
    this.color = color;
    this.createCube();
  }

  createCube() {
    // 创建一个立方体并将其添加到场景中
    var geometry = new THREE.BoxBufferGeometry(this.w, this.h);
    var material = new THREE.MeshPhongMaterial({ color: "green" });
    this.cube = new THREE.Mesh(geometry, material);

    this.cube.castShadow = true; // 设置立方体投射阴影
    this.cube.receiveShadow = true; // 设置立方体接收阴影
    this.cube.material.shadowSide = THREE.BackSide; // 设置立方体背面也能接收阴影
    this.setPosition();
    this.createUI()
  }

  createUI() {
    const gui = new GUI({ width: 310 });
    var folder = gui.addFolder("立方体缩放");
    folder.add(this.cube.scale, "x", 0.1, 5);
    folder.add(this.cube.scale, "y", 0.1, 5);
    folder.add(this.cube.scale, "z", 0.1, 5);
    var folder2 = gui.addFolder("立方体移动");
    folder2.add(this.cube.position, "x", 0.1, 5);
    folder2.add(this.cube.position, "y", 0.1, 5);
    folder2.add(this.cube.position, "z", 0.1, 5);
  }

  setPosition() {
    this.cube.position.set(1, 3, -2);
  }
}
