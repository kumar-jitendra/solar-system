class SolarSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.objects = [];
        this.groupObjects = [];

    }

    init() {

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // camera.lookAt(0,0,0);
        camera.position.set(-30, 25, 50);


        const scene = new THREE.Scene();


        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;


        var light = new THREE.PointLight(0xffffff, 1.5, 1000);
        light.position.set(0, 2, 15);
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x888888));

        var light = new THREE.DirectionalLight(0xcccccc, 1);
        light.position.set(4, 5, 5)
        this.scene.add(light);


        const controls = new THREE.OrbitControls(mysolar.camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

    }

    resizeRendererToDisplaySize() {
       
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const needResize = this.canvas.width !== width || this.canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }


    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {

        // if (resizeRendererToDisplaySize(renderer)) {
        //   const canvas = renderer.domElement;
        //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
        //   camera.updateProjectionMatrix();
        // }
    
        sun.rotation.y += 0.01;
    
        this.objects.forEach((obj) => {
            obj.object.rotation.y += obj.speed;
        })
    
        this.groupObjects.forEach((g) => {
            g.group.rotation.y += g.speed;
        });
    
    
        //    pickHelper.pick(scene, camera);
    
    
        this.renderer.render(this.scene, this.camera);
    
        controls.update();
    
        requestAnimationFrame(render);
    }

}

const canvas = document.getElementById("mycanvas");
const mysolar = new SolarSystem(canvas);
mysolar.init();







// Ray Picker Handling
//  /// const pickHelper = new PickHelper();

//   /// window.addEventListener('mousemove', pickHelper.setPickPosition);
//  window.addEventListener('mouseout', pickHelper.clearPickPosition);
//  window.addEventListener('mouseleave', pickHelper.clearPickPosition);

//  window.addEventListener('touchstart', (event) => {
//      // prevent the window from scrolling
//      event.preventDefault();
//      pickHelper.setPickPosition(event.touches[0]);
//  }, { passive: false });

//  window.addEventListener('touchmove', (event) => {
//      pickHelper.setPickPosition(event.touches[0]);
//  });

// ///// window.addEventListener('touchend', pickHelper.clearPickPosition);
//  pickHelper.clearPickPosition();


window.addEventListener('resize', mysolar.onWindowResize);

mysolar.requestAnimationFrame(render);

