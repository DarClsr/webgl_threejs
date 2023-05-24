import * as THREE from "three";

export default class DirController {
  constructor(model, camera,callback) {
    this.initialDirection = new THREE.Vector3(0, 0, 1);
    this.initialQuaternion = new THREE.Quaternion();
    this.cameraDirection = new THREE.Vector3();
    this.camera = camera;
    this.camera.getWorldDirection(this.cameraDirection);
    this.direction = new THREE.Vector3();
    this.model = model;
    const clock = new THREE.Clock();
    this.delta = clock.getDelta();
    this.velocity =2;
    this.initEvents(callback);

  }

  initEvents(callback) {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w": // w 键
          this.direction
            .copy(this.initialDirection)
            .applyQuaternion(this.initialQuaternion);
          break;
        case "a": // a 键
          this.direction
            .copy(this.initialDirection)
            .applyQuaternion(this.initialQuaternion);
          this.direction.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            Math.PI / 2
          );
          break;
        case "s": // s 键
          this.direction
            .copy(this.initialDirection)
            .applyQuaternion(this.initialQuaternion);
          this.direction.negate();
          break;
        case "d": // d 键
          this.direction
            .copy(this.initialDirection)
            .applyQuaternion(this.initialQuaternion);
          this.direction.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            -Math.PI / 2
          );
          break;
      }
      if(callback){
        callback(event.key)
      }
    });

   
  }

  update() {
    // 根据方向变量更新人物模型的方向
    if (this.direction.lengthSq() > 0) {
      var angle = Math.atan2(this.direction.x, this.direction.z);
      this.initialQuaternion.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angle
      );
      this.model.quaternion.copy(this.initialQuaternion);
    }

    
    // 根据相机的方向向量更新相机的方向
    // this.cameraDirection.y = 0;
    // var angle = Math.atan2(this.cameraDirection.x, this.cameraDirection.z);
    // console.log(angle)
    // this.camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

    var angle = Math.atan2(this.direction.x, this.direction.z);
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
  
    // 将旋转四元数应用到相机的 quaternion 属性上
    this.camera.quaternion.copy(quaternion);
  
    
  }
}
