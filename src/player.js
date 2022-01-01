import * as THREE from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
export class Player {
    /**
     * @param {THREE.Scene} scene 
     * @param {THREE.Camera} camera 
     * @param {THREE.WebGLRenderer} renderer 
     */
    constructor(scene, camera, renderer) {
        /**
         * @type {THREE.Scene}
         */
        this.scene = scene
        /**
         * @type {THREE.Camera}
         */
        this.camera = camera
        /**
         * @type {THREE.WebGLRenderer}
         */
        this.renderer = renderer
        /**
         * @type {THREE.Group}
         */
        this.leftHand = null
        /**
        * @type {THREE.Group}
        */
        this.rightHand = null
        /**
        * @type {Number}
        */
        this.movementSpeed = .02
        /**
        * @type {Number}
        */
        this.rotationSpeed = 1
        /**
        * @type {THREE.Group}
        */
        this.user = new THREE.Group()
        /**
        * @type {THREE.Group}
        */
        this.worldDirection = new THREE.Vector3()
    }
    init() {
        const [leftHand, leftHandGrip] = this.makeController(0)
        const [rightHand, rightHandGrip] = this.makeController(1)
        leftHand.name = 'LEFT_HAND'
        rightHand.name = 'RIGHT_HAND'
        this.leftHand = leftHand
        this.rightHand = rightHand
        this.scene.add(leftHand, leftHandGrip, rightHand, rightHandGrip);
        this.user.position.set(0, 0, 0);
        this.user.name = "USER";
        this.user.add(this.camera, leftHand, rightHand, leftHandGrip, rightHandGrip)
        this.scene.add(this.user)
    }
    makeController(index) {
        const controller = this.renderer.xr.getController(index);
        controller.addEventListener('disconnected', () => {
            controller.remove(controller.children[0]);
        });
        const controllerModelFactory = new XRControllerModelFactory();
        const controllerGrip = this.renderer.xr.getControllerGrip(index);
        controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
        return [controller, controllerGrip]
    }
    animate() {
        const session = this.renderer.xr.getSession();
        if (!session) return;
        session.inputSources.forEach(this.handleMovement)
    }
    /**
     * @param {THREE.XRInputSource} param0 
     */
    handleMovement = ({ gamepad, handedness }) => {
        if (!gamepad) return;
        // xAxis positive -> negative <-
        // zAxis positive V negative ^
        const [, , xAxis, zAxis] = gamepad.axes
        if (!xAxis && !zAxis) return;
        this.renderer.xr.getCamera(this.camera).getWorldDirection(this.worldDirection)
        switch (handedness) {
            case 'left':
                this.user.position.x -= this.movementSpeed * xAxis;
                this.user.position.z -= this.worldDirection.z * this.movementSpeed * zAxis;
                break;
            case 'right':
                this.user.rotateY(THREE.MathUtils.degToRad(this.rotationSpeed * -xAxis))
                break;
        }
    }
}