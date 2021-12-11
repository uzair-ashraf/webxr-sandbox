import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer()
renderer.xr.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
})
