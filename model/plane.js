import * as THREE from 'three'; 



export default class PlaneFloor {
  constructor(w = 2000, h = 2000, wc = 100, hc = 100, color = 0xffffff) {
    this.floor = "";
    this.edgesLines = "";
    this.w = w;
    this.h = h;
    this.wc = wc;
    this.hc = hc;
    this.color = color;
    this.grid = "";
    this.createPlane();
  }

  createPlane() {
    // THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    // width 和 height 是平面的宽度和高度，widthSegments 和 heightSegments 是可选的参数，用于定义平面矩形的网格密度。
    var floorGeometry = new THREE.PlaneGeometry(this.w, this.h);
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: this.color,
      depthWrite: false,
    });
    this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
    this.floor.receiveShadow = true; // 设置平面接收阴影
    this.floor.rotation.x = -Math.PI / 2;
    // 创建地板的边框几何体和材质
    const grid = new THREE.GridHelper(500, 100, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    grid.receiveShadow = true; // 设置平面接收阴影

    this.grid = grid;

    // this.floor.add(grid)
  }
}
