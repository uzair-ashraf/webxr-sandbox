import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import * as THREE from 'three'

export class App {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.renderer = new THREE.WebGLRenderer()
    }
    animate = () => {
        this.renderer.render(this.scene, this.camera)
    }
    init = () => {
        this.renderer.xr.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.append(this.renderer.domElement, VRButton.createButton(this.renderer));
        this.renderer.setAnimationLoop(this.animate)
    }
}