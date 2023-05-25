import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class InitThree {
  constructor(id) {
    this.scene = "";
    this.camera = "";
    this.renderer = "";
    this.container = id ? document.getElementById(id) : document.body;
    this.controls = "";
    this.initAll();
  }
  initAll() {
    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    const loader = new THREE.TextureLoader();
    loader.load(
      "model/textures/sky.jpg",
      (texture) => {
        this.scene.background = texture;
      },
      undefined,
      (err) => {
        console.error("An error happened.", err);
      }
    );

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.25,
      100
    );
    this.camera.position.set(-5, 3, 10);
    this.camera.lookAt(0, 2, 0);
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 开启阴影
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    // 使用控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1, 0);
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }

  animate(render) {
    requestAnimationFrame(() => {
      this.animate(render, this.controls);
    });
    if (render) {
      render();
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
