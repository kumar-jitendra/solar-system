// SCENE SETUP
var scene = new THREE.Scene();

// CAMERA SETUP
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 2, 15);

// RENDERER SETUP
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


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
sun.scale.setScalar(8);
scene.add(sun);


// to store objects and groups
const objects = [];
const groupObjects = [];
// const gap = 3;

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
    addPlanet(10, 1, 'public/mercury.jpg', { gs: 0.03, os: 0.015 });
}

{
    addPlanet(15, 1.2, 'public/venus.jpg', { gs: 0.025, os: 0.012 });
}

{
    addPlanet(19, 1.4, 'public/earth.jpg', { gs: 0.02, os: 0.010 });
}

{
    addPlanet(24, 1, 'public/mars.jpg', { gs: 0.015, os: 0.012 });
}

{
    addPlanet(32, 4, 'public/jupiter.jpg', { gs: 0.005, os: 0.005 });
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



// const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

// domEvents.addEventListener(sun, 'click', event => {
//     sunMaterial.wireframe = true;
// })



// var lineGeometry = new THREE.LineGeometry();

// var i, len =60, twopi = 2* Math.PI;
// var distance = 5;
// for(i=0; i<=120; i++)
// {
//     var x = distance * Math.cos( i / 120 *twopi);
//     var z = distance * Math.sin(i / 120 *twopi);
//     var vertex = new THREE.Vertex(new THREE.Vector3(x, 0, z));
//     lineGeometry.vertices.push(vertex);
// }


// var lineMaterial = new THREE.LineBasicMaterial({
//     color : 0xffffff,
//     linewidth : 3
// });

// var line = new THREE.Line(lineGeometry, lineMaterial);
// line.position.set(0, 10, 0);
// scene.add(line);





// function createStars(minDistance ){

//     var starGroup = new THREE.Object3D();

//     var i;
//     var starsGeometry = new THREE.Geometry();

//     for(i=0; i<667; i++)
//     {
//         var vector = new THREE.Vector3(
//             (Math.random() * 2 - 1) * minDistance,
//             (Math.random() * 2 - 1) * minDistance,
//             (Math.random() * 2 - 1) * minDistance
//         );

//         if(vector.length() < minDistance)
//         {
//             vector = vector.setLength(minDistance);
//         }

//         starsGeometry.vertices.push(new THREE.Vertex(vector));
//     }


//     var starsMaterials = [];
//     for(i=0; i<8; i++)
//     {
//         starsMaterials.push(
//             new THREE.ParticleBasicMaterial(
//                 {
//                     color : 0x101010 * (i + 1),
//                     size : i % 2 + 1,
//                     sizeAttenuation : false
//                 }
//             )
//         );
//     }


//       for( i =0; i<24; i++);
//       {
//           var stars = new THREE.ParticleSystem(starsGeometry, 
//             starsMaterials[i % 8]);

//             stars.rotation.y = i / (Math.PI * 2);
//             starGroup.add(stars);
//       }

//       scene.add(starGroup);

// }

// createStars(0.1);

// function createPlanet(group, mesh, x, scale){
//      mesh.position.set(x, 0, -10);
//      mesh.scale.setScalar(scale);
//      group.add(mesh);
//      scene.add(group);
// }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// var controls = new OrbitControls( camera, renderer.domElement );


// controls.update();



var animate = function () {
    requestAnimationFrame(animate);

    // controls.update();

    sun.rotation.y += 0.01;

    objects.forEach((obj) => {
        obj.object.rotation.y += obj.speed;
    })

    groupObjects.forEach((g) => {
        g.group.rotation.y += g.speed;
    });



    renderer.render(scene, camera);
};

animate();