


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
// camera.lookAt(0,0,0);
camera.position.set(0, 0, 5);


// const controls = new THREE.OrbitControls(camera);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// controls.autoRotate = true;



const scene = new THREE.Scene();

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

// var light = new THREE.PointLight(0xffffff, 1.5, 1000);
// light.position.set(0, 2, 15);
// scene.add(light);

scene.add(new THREE.AmbientLight(0x888888));

var light = new THREE.DirectionalLight(0xcccccc, 1);
light.position.set(5,5,5)
	scene.add( light )
	light.castShadow	= true
	light.shadowCameraNear	= 0.01
	light.shadowCameraFar	= 15
	light.shadowCameraFov	= 45

	light.shadowCameraLeft	= -1
	light.shadowCameraRight	=  1
	light.shadowCameraTop	=  1
	light.shadowCameraBottom= -1
	// light.shadowCameraVisible	= true

	light.shadowBias	= 0.001
	light.shadowDarkness	= 0.2

	light.shadowMapWidth	= 1024
	light.shadowMapHeight	= 1024


// GEOMETRY 
const geometry = new THREE.SphereGeometry(1, 32, 16);

function getTube(distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(10, 1, 32, 32);
    var ringMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
    const myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    // myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
   
}

// CENTRAL SUN OBJECT
const loader = new THREE.TextureLoader();
const sunTexture = loader.load('public/sunmap.jpg');
const sunMaterial = new THREE.MeshPhongMaterial({
		map	: sunTexture,
		bumpMap	: sunTexture,
		bumpScale: 0.05,
	});
const sun = new THREE.Mesh(geometry, sunMaterial);
sun.position.set(0, 0, 0);
sun.scale.setScalar(1);
scene.add(sun);
// getTube(0);


// function getRing(name, distanceFromAxis) {
//     var ring1Geometry = new THREE.RingGeometry(1, 3, 40);
//     var ring1Material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
//     var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
//     myRing.name = name;
//     myRing.position.set(distanceFromAxis, 0, 0);
//     myRing.rotation.x = Math.PI / 2;
//     scene.add(myRing);
//     // return myRing;
// }

// getRing("sunRing", 0);

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
    const texture = THREE.ImageUtils.loadTexture(url);
    const material = new THREE.MeshStandardMaterial(
        { map: texture,
        
        });
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

		
function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 32, 32),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('public/earthmap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('public/earth_bump.jpg'),
				bumpScale:   0.2,
				specularMap: THREE.ImageUtils.loadTexture('public/earthspec.png'),
				// specular:    new THREE.Color('grey')								
			})
		);
    }
    

    function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:  THREE.ImageUtils.loadTexture('public/cloudmap.jpg'),
				side  : THREE.DoubleSide,
                opacity     : 0.8,
                transparent : true,
			})
		);		
    }
    

    function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshPhongMaterial({
				map:  THREE.ImageUtils.loadTexture('public/galaxy_stars.png'), 
				side: THREE.BackSide
			})
		);
    }
    
    
    var stars = createStars(200, 64);
	scene.add(stars);

 {

    
    var earthMesh = createSphere(1, 32);
    earthMesh.position.set(19, 0, 0);
    earthMesh.scale.setScalar(4)
    earthMesh.rotation.y = 6; 
    
    const earthGroup = new THREE.Group();
    earthGroup.add(earthMesh);

    const ob1 = { object: earthMesh, speed: 0.010 };
    const ob2 = { group: earthGroup, speed: 0.01 };
    objects.push(ob1);
    groupObjects.push(ob2);

    var clouds = createClouds(1+0.1, 32);
    clouds.position.set(19, 0, 0);
    clouds.scale.setScalar(2)
    clouds.rotation.y = 6;
    const cloudsGroup = new THREE.Group();
    const ob3 = { object: clouds, speed: 0.010 };
    const ob4 = { group: cloudsGroup, speed: 0.01 };
    cloudsGroup.add(clouds);

    objects.push(ob3);
    groupObjects.push(ob4);

	scene.add(cloudsGroup);

   
    const moonMaterial = createMaterial('public/moon.jpg');
    const moonMesh = new THREE.Mesh(geometry, moonMaterial);
    moonMesh.position.x = 3;
    moonMesh.scale.setScalar(0.6);
    const moonGroup = new THREE.Group();
    moonGroup.position.x = 19;

    const ob5 = { object: moonMesh, speed: 0.2 };
    const ob6 = { group: moonGroup, speed: 0.05 };
    objects.push(ob5);
    groupObjects.push(ob6);

    moonGroup.add(moonMesh);
    earthGroup.add(moonGroup);
    
    
    scene.add(earthGroup);
   

    // addPlanet(19, 1.4, 'public/earth.jpg', { gs: 0.002, os: 0.010 });
}  



// {
//     // addPlanet(24, 1, 'public/mars.jpg', { gs: 0.0015, os: 0.012 });
// }

// {
//     // addPlanet(32, 4, 'public/jupiter.jpg', { gs: 0.0005, os: 0.005 });
// }

{

    addPlanet(40, 1, 'public/saturn.jpg', { gs: 0.006, os: 0.02 });
}

{
    addPlanet(55, 1, 'public/uranus.jpg', { gs: 0.004, os: 0.02 });
}

{
    addPlanet(59, 1.3, 'public/neptune.jpg', { gs: 0.0005, os: 0.02 });
}

{
    addPlanet(64, 1.1, 'public/pluto.jpeg', { gs: 0.0006, os: 0.02 });
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);


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
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  
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

  sun.rotation.y += 0.01;

      objects.forEach((obj) => {
          obj.object.rotation.y += obj.speed;
      })
  
      groupObjects.forEach((g) => {
          g.group.rotation.y += g.speed;
      });

  
//   pickHelper.pick(pickPosition, scene, camera, time);

  
  renderer.render(scene, camera);

  // controls.update();

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
