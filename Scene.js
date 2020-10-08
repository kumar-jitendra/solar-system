class Scene {

    constructor(canvas) {
        this.canvas = canvas;
        this.root = null;
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.objects = [];
    }
    init() {

        const scene = new THREE.Scene();
        const root = new THREE.Object3D();

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(width, height);

        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(-30, 25, 50);
        

        this.scene = scene;
        this.root = root;
        this.camera = camera;
        this.renderer = renderer;
        this.objects = this.createObjects();

        this.scene.add(this.root);

    }

    createObjects() {
        objects = [
           
            new SolarSystem(this.scene),
            new createSun(this.root),
            new createEarth(this.root),
            new createJupiter(this.root)

        ];

        PLANET_PROP.forEach(prop => {
            const planet = new Planet(root, prop);
            this.objects.push(planet);
           
            const planetOrbit = new createOrbit(root, prop.distance-0.2, prop.distance, 0, 0, true);
            this.objects.push(planetOrbit);

        })

        return objects;
    }

    update() {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].objUpdate)
                objects[i].objUpdate();
        }

        renderer.render(scene, camera);
        
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}