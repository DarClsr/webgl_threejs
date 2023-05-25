import * as THREE from "three";

export default class FloorTexture {
  constructor(src) {
    this.texture = "";
    this.loadTexture(src);
  }

  loadTexture(src) {
    this.texture = new THREE.TextureLoader().load(src);
    // this.texture.minFilter = THREE.LinearMipmapLinearFilter; // 改变缩小过滤器
    // this.texture.magFilter = THREE.LinearFilter; // 改变放大过滤器
    this.texture.wrapS = THREE.RepeatWrapping; // 改变水平重复方式
    this.texture.wrapT = THREE.RepeatWrapping; // 改变垂直重复方式
    // cubeMaterial.map.wrapS = THREE.RepeatWrapping;
	// cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    this.texture.flipY = false; // 设置 flipY 属性为 false
    this.texture.repeat.set(10, 10); // 设
  }
}
