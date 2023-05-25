import * as THREE from 'three'; 


export default class SceneLight {
  constructor(color = 0xffffff) {
    this.light = "";
    this.ambientLight = "";
    this.color = color;
    this.directlight=""
    this.addLight();
  }

  addLight() {
    // 添加环境光
    this.ambientLight = new THREE.AmbientLight(0x404040, 5.5);
    // this.ambientLight.castShadow = true; // 设置光源投射阴影
    // this.ambientLight.position.set(0, 20, 0);
    // color：环境光的颜色，使用十六进制数值表示，默认值为 0xffffff（白色）。
    // intensity：环境光的强度，使用浮点数表示，默认值为 1。
    this.light = new THREE.DirectionalLight(this.color, 1, 100);
    this.light.castShadow = true; // 设置光源投射阴影
    // color：点光源的颜色，使用十六进制数值表示，默认值为 0xffffff（白色）。
    // intensity：点光源的强度，使用浮点数表示，默认值为 1。
    // distance：点光源的距离，使用浮点数表示，默认值为 0。距离越远，光照效果越弱。
    // decay：点光源的衰减，使用浮点数表示，默认值为 1。衰减越大，光照效果越弱。

    var directlight = new THREE.DirectionalLight(0xffffff, 5,100);
    directlight.position.set(0, 5, 5);
    directlight.castShadow = true; // 设置光源投射阴影
    directlight.shadow.mapSize.width = 1024;
    directlight.shadow.mapSize.height = 1024;
    directlight.shadow.camera.near = 0.1;
    directlight.shadow.camera.far = 100;
    this.directlight = directlight;
  }

  setPosition(x, y, z) {
    this.light.position.set(x, y, z);
  }
}
