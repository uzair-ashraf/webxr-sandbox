import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three'
import { Player } from './player';
import { Mirror } from './mirror';

export class App {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        })
        this.player = new Player(this.scene, this.camera, this.renderer)
    }
    addListeners = () => {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }
    animate = () => {
        this.renderer.render(this.scene, this.camera)
        this.player.animate()
    }
    init = async () => {
        this.renderer.xr.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.append(this.renderer.domElement, VRButton.createButton(this.renderer));
        this.addListeners()
        const loader = new GLTFLoader()
        const model = await loader.loadAsync('./scene.glb')
        model.scene.position.set(0, -1, 5)
        this.scene.add(model.scene)
        const light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);
        this.player.init()
        const mirror = new Mirror()
        this.scene.add(mirror.mirror)
        this.renderer.setAnimationLoop(this.animate)
    }
}