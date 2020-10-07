class SolarSystem {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.canvas = null;
    }

    init() {
        // RENDERER SETUP
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = renderer.domElement;
        document.body.appendChild(canvas);


        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // camera.lookAt(0,0,0);
        camera.position.set(-30, 25, 50);
        const scene = new THREE.Scene();


        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.canvas = canvas;

    }



}