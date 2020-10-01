
  class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
    }
    pick(normalizedPosition, scene, camera, time) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
      }

      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(scene.children);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        // save its color
        this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // set its emissive color to flashing red/yellow
        this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
      }
    }
  }


// RENDERER SETUP
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;
document.body.appendChild(canvas);




const fov = 60;
const aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

const scene = new THREE.Scene();
// scene.background = new THREE.Color('white');

// // put the camera on a pole (parent it to an object)
// // so we can spin the pole to move the camera around the scene
// const cameraPole = new THREE.Object3D();
// scene.add(cameraPole);
// cameraPole.add(camera);

// {
//   const color = 0xFFFFFF;
//   const intensity = 1;
//   const light = new THREE.DirectionalLight(color, intensity);
//   light.position.set(-1, 2, 4);
//   camera.add(light);
// }

// const boxWidth = 1;
// const boxHeight = 1;
// const boxDepth = 1;
// const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// function rand(min, max) {
//   if (max === undefined) {
//     max = min;
//     min = 0;
//   }
//   return min + (max - min) * Math.random();
// }

// function randomColor() {
//   return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
// }

// const numObjects = 100;
// for (let i = 0; i < numObjects; ++i) {
//   const material = new THREE.MeshPhongMaterial({
//     color: randomColor(),
//   });

//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);

//   cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
//   cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
//   cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));
// }

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


// const controls = new THREE.OrbitControls (camera, canvas);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// controls.autoRotate = true;


var light = new THREE.PointLight(0xffffff, 1.5, 1000);
light.position.set(0, 2, 15);
scene.add(light);


// GEOMETRY 
const geometry = new THREE.SphereGeometry(1, 32, 16);

// CENTRAL SUN OBJECT
const loader = new THREE.TextureLoader();
const sunTexture = loader.load('public/sun.jpg');
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
const sun = new THREE.Mesh(geometry, sunMaterial);
sun.position.set(0, 0, -10);
sun.scale.setScalar(4);
scene.add(sun);


// to store objects and groups
const objects = [];
const groupObjects = [];


function addObject(x, scale, obj, { gs, os }) {
    obj.position.x = x;
    obj.scale.setScalar(scale);
    const group = new THREE.Group();
    const ob1 = { object: obj, speed: os };
    const ob2 = { group: group, speed: gs };
    objects.push(ob1);
    groupObjects.push(ob2);
    group.add(obj);
    scene.add(group);
}

function createMaterial(url) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    return material;
}

function addPlanet(x, scale, url, speed) {
    const mesh = new THREE.Mesh(geometry, createMaterial(url));
    addObject(x, scale, mesh, speed);
}

// PLANETS ROTATING AROUND THE SUN

{
    addPlanet(10, 1, 'public/mercury.jpg', { gs: 0.003, os: 0.015 });
}

{
    addPlanet(15, 1.2, 'public/venus.jpg', { gs: 0.0025, os: 0.012 });
}

{

    const earthMaterial = createMaterial('public/earth.jpg');
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    earthMesh.position.x = 19;
    earthMesh.scale.setScalar(1.4);
    const earthGroup = new THREE.Group();
    earthGroup.add(earthMesh);

    const ob1 = { object: earthMesh, speed: 0.010 };
    const ob2 = { group: earthGroup, speed: 0.002 };
    objects.push(ob1);
    groupObjects.push(ob2);


    const moonMaterial = createMaterial('public/moon.jpg');
    const moonMesh = new THREE.Mesh(geometry, moonMaterial);
    moonMesh.position.x = 3;
    moonMesh.scale.setScalar(0.6);
    const moonGroup = new THREE.Group();
    moonGroup.position.x = 19;

    const ob3 = { object: moonMesh, speed: 0.2 };
    const ob4 = { group: moonGroup, speed: 0.05 };
    objects.push(ob3);
    groupObjects.push(ob4);

    moonGroup.add(moonMesh);
    earthGroup.add(moonGroup);
    
    
    scene.add(earthGroup);
   

    // addPlanet(19, 1.4, 'public/earth.jpg', { gs: 0.002, os: 0.010 });
}

{
    addPlanet(24, 1, 'public/mars.jpg', { gs: 0.0015, os: 0.012 });
}

{
    addPlanet(32, 4, 'public/jupiter.jpg', { gs: 0.0005, os: 0.005 });
}

{
    addPlanet(40, 3.2, 'public/saturn.jpg', { gs: 0.006, os: 0.02 });
}

{
    addPlanet(55, 2.9, 'public/uranus.jpg', { gs: 0.004, os: 0.02 });
}

{
    addPlanet(59, 2.5, 'public/neptune.jpg', { gs: 0.0005, os: 0.02 });
}

{
    addPlanet(64, 1.6, 'public/pluto.jpeg', { gs: 0.0006, os: 0.02 });
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);



// var animate = function () {
//     requestAnimationFrame(animate);

//     // controls.update();

//     sun.rotation.y += 0.01;

//     objects.forEach((obj) => {
//         obj.object.rotation.y += obj.speed;
//     })

//     groupObjects.forEach((g) => {
//         g.group.rotation.y += g.speed;
//     });

//     // pickHelper.pick(normalizedPosition, scene, camera, time);

//     renderer.render(scene, camera);
// };

// animate();




function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}

function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});

window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);





const pickPosition = {x: 0, y: 0};
  const pickHelper = new PickHelper();
  clearPickPosition();

function render(time) {
  time *= 0.001;  // convert to seconds;

  // if (resizeRendererToDisplaySize(renderer)) {
  //   const canvas = renderer.domElement;
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }

  // cameraPole.rotation.y = time * .1;



  sun.rotation.y += 0.01;

      objects.forEach((obj) => {
          obj.object.rotation.y += obj.speed;
      })
  
      groupObjects.forEach((g) => {
          g.group.rotation.y += g.speed;
      });






  pickHelper.pick(pickPosition, scene, camera, time);

  
  renderer.render(scene, camera);


  // controls.update();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
