import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
export default class GltfLoader {
  constructor() {
    this.model = "";
    this.animate = "";
    this.gltf = "";
    this.actions = ["idle", "walk"];
    this.animations = {};
    this.loader = new GLTFLoader();
  }

  async loadAnimations() {
    for (let action of this.actions) {
      const glb = await this.loadAnimation(action);
      this.animations[action] = glb.animations[0];
    }
  }

  loadAnimation(action) {
    return new Promise((reslove, reject) => {
      this.loader.load("./model/actions/" + action + ".glb", (glb) => {
        reslove(glb);
      });
    });
  }

  async loadModel(scene) {
    await this.loadAnimations();
    const loader = new GLTFLoader();
    loader.load("./model/scene.gltf", (gltf) => {
      // this.model = model;
      this.gltf = gltf;
      this.model = gltf.scene;
      this.model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
      });
      this.model.scale.set(0.02, 0.02, 0.02);
      this.setAnimation();
      scene.add(this.model);
    });
  }

  setAnimation(action = "idle") {
    var animationClip = this.animations[action];
    if (!animationClip) return alert("暂无动画");
    console.log(animationClip, action);
    // 创建 AnimationMixer 对象
    console.log(this.model)
    var mixer = new THREE.AnimationMixer(this.model);
    // 创建 AnimationAction 对象
    // var animationAction = mixer.clipAction(animationClip);
    // 开始播放动画
    console.log(animationAction);
    // animationAction.play();
  }
}
