class Scene {

    constructor(canvas) {

        this.canvas = canvas;
        this.root = null;
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.objects = [];
        this.controls = null;
        this.pickHelper = null;

    }

    init() {

        const scene = new THREE.Scene();
        const root = new THREE.Object3D();

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
        camera.position.set(CAMERA_POSITION[0], CAMERA_POSITION[1], CAMERA_POSITION[2]);

        const controls = new THREE.OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;


        this.scene = scene;
        this.root = root;
        this.camera = camera;
        this.renderer = renderer;
        this.objects = this.createObjects();
        this.controls = controls;

        this.pickHelper = new PickHelper();

        this.scene.add(this.root);

    }

    createObjects() {
        const objects = [

            new SolarSystem(this.scene),
            new createSun(this.root),
            new createEarth(this.root),
            new createJupiter(this.root)

        ];

        PLANET_PROP.forEach(prop => {
            const planet = new Planet(this.root, prop);
            objects.push(planet);


        })

        return objects;
    }

    resizeRendererToDisplaySize() {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }

    update() {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].objUpdate)
                this.objects[i].objUpdate();
        }


     if (this.resizeRendererToDisplaySize()) {
        const canvas = this.renderer.domElement;
       this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
       this.camera.updateProjectionMatrix();
     }


        this.pickHelper.pick(this.scene, this.camera);

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}