import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import DirController from "./controller.js";

const action_keys = {
  idle: "alistar_idle1.anm",
  walk: "alistar_run.anm",
  run: "alistar_run_fast.anm",
  fast_run: "alistar_run_stompy.anm",
};
export default class GltfLoader {
  constructor(camera, control) {
    this.model = "";
    this.animate = "";
    this.gltf = "";
    this.actions = ["idle", "walk"];
    this.animations = {};
    this.loader = new GLTFLoader();
    this.camera = camera;
    this.controls = control;
  }

  setControls({ x, y, z }) {
    this.controls.target.set(x, y, z);
    this.controls.update();
  }

  loadAnimations(glb) {
    
    for (let action in action_keys) {
      this.animations[action] = glb.animations.find((v) => {
        return v.name == action_keys[action];
      });
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
    const loader = new GLTFLoader();
    loader.load("./model/scene.gltf", (gltf) => {
      // this.model = model;
      this.gltf = gltf;
      this.loadAnimations(gltf);
      this.model = gltf.scene;
      this.model.traverse(function (object) {
        if (object.isMesh) {
          object.castShadow = true;
        }
      });

    // gltf.material.emissive = new THREE.Color(0xffffff);
      this.controller = new DirController(this.model, this.camera, (key) => {
        // this.setControls(data)
        this.keyDown(key);
      });
      this.model.scale.set(2, 2, 2);
      this.setAnimation();
      scene.add(this.model);
      this.createActionUi();
    });
  }

  setAnimation(action = "idle") {
    var animationClip = this.animations[action];
    if (!animationClip) {
        return alert("暂无动画");
    }

    // 创建 AnimationMixer 对象
    var mixer = new THREE.AnimationMixer(this.model);
    // 创建 AnimationAction 对象
    const nextAction = mixer.clipAction(animationClip);
    // 开始播放动画
    this.animationAction = nextAction;
    this.animationAction.play();

    this.mixer = mixer;
  }
  keyDown(key) {
    let action = "";
    switch (key) {
      case "w":
        action = "walk";
        break;
      case "s":
        action = "idle";
        break;
      case "a":
        action = "run";
        break;
      case "d":
        action = "fast_run";
        break;
    }
    this.setAnimation(action);
  }

  createActionUi() {
    const gui = new GUI({ width: 310 });
    var folder = gui.addFolder("牛头动作展示");

    let settings = {};

    for (let action in action_keys) {
      settings[action] = () => {
        this.setAnimation(action);
      };
      folder.add(settings, action);
    }
  }
}
