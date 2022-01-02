import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'

export class Mirror {
    constructor() {
        this.geometry = new THREE.PlaneGeometry( 100, 100 );
        this.mirror = new Reflector( this.geometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0x889999
        } );
        this.mirror.position.y = 0;
        this.mirror.position.z = -5;
    }
}