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


 const controls = new THREE.OrbitControls(camera);
 controls.enableDamping = true;
 controls.dampingFactor = 0.25;
 controls.enableZoom = true;
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
 light.position.set(4, 5, 5)
 scene.add(light)

 // to store objects and groups
 const objects = [];
 const groupObjects = [];


 // GEOMETRY 
 const geometry = new THREE.SphereGeometry(1, 32, 16);

 function getTube(name, innerRadius, outerRadius, distanceFromAxis, satelliteSpeed) {

     const saturnRingTexture = new THREE.ImageUtils.loadTexture('public/saturnringcolor.jpg');
     var ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
     var ringMaterial = new THREE.MeshStandardMaterial({ map: saturnRingTexture, side: THREE.DoubleSide });
     var myRing = new THREE.Mesh(ringGeometry, ringMaterial);

     myRing.name = name;
     myRing.position.set(distanceFromAxis, 0, 0);
     myRing.rotation.x = -Math.PI / 3;

     const ringGroup = new THREE.Group();
     ringGroup.add(myRing);

     const ob1 = { object: myRing, speed: 0 };
     const ob2 = { group: ringGroup, speed: satelliteSpeed };
     objects.push(ob1);
     groupObjects.push(ob2);

     scene.add(ringGroup);
 }


 function getRing(name, innerRadius, outerRadius, distanceFromAxis, satelliteSpeed, isCentral) {
     var ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
     var ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
     var myRing = new THREE.Mesh(ringGeometry, ringMaterial);

     myRing.name = name;
     myRing.position.set(distanceFromAxis, 0, 0);
     myRing.rotation.x = -Math.PI / 2;

     if (isCentral) {

         scene.add(myRing);
     }
     else {
         const ringGroup = new THREE.Group();
         ringGroup.add(myRing);

         const ob1 = { object: myRing, speed: 0 };
         const ob2 = { group: ringGroup, speed: satelliteSpeed };
         objects.push(ob1);
         groupObjects.push(ob2);

         scene.add(ringGroup);
     }

 }

 function addMesh(x, scale, obj, { gs, os }) {

     obj.position.x = x;
     obj.scale.setScalar(scale);
     const group = new THREE.Group();
     const ob1 = { object: obj, speed: os };
     const ob2 = { group: group, speed: gs };
     objects.push(ob1);
     groupObjects.push(ob2);
     group.add(obj);
     // scene.add(group);
     return group;


 }

 function createMaterial(mapurl, bumpurl) {
     const texture = THREE.ImageUtils.loadTexture(mapurl);
     const material = new THREE.MeshStandardMaterial(
         {
             map: texture,
             bumpMap: bumpurl == undefined ? texture : THREE.ImageUtils.loadTexture(bumpurl),
             bumpScale: 0.005,
         });
     return material;
 }

 function createPlanet(x, scale, mapurl, bumpurl, speed) {
     const mesh = new THREE.Mesh(geometry, createMaterial(mapurl, bumpurl));
     return addMesh(x, scale, mesh, speed);
 }


 function createSphere(radius, segments) {
     return new THREE.Mesh(
         new THREE.SphereGeometry(0.5, 32, 32),
         new THREE.MeshPhongMaterial({
             map: THREE.ImageUtils.loadTexture('public/earthmap.jpg'),
             bumpMap: THREE.ImageUtils.loadTexture('public/earth_bump.jpg'),
             bumpScale: 0.2,
             specularMap: THREE.ImageUtils.loadTexture('public/earthspec.png'),
             // specular:    new THREE.Color('grey')								
         })
     );
 }


 function createClouds(radius, segments) {
     return new THREE.Mesh(
         new THREE.SphereGeometry(radius, segments, segments),
         new THREE.MeshPhongMaterial({
             map: THREE.ImageUtils.loadTexture('public/cloudmap.jpg'),
             side: THREE.DoubleSide,
             opacity: 0.8,
             transparent: true,
         })
     );
 }


 function createStars(radius, segments) {
     return new THREE.Mesh(
         new THREE.SphereGeometry(radius, segments, segments),
         new THREE.MeshPhongMaterial({
             map: THREE.ImageUtils.loadTexture('public/galaxy_stars.png'),
             side: THREE.BackSide
         })
     );
 }


 var stars = createStars(200, 80);
 scene.add(stars);



 function createSatellite(parent, parentPosition, posFromParent, scale, mapurl, bumpurl, rotSpeed, revSpeed) {

     const satelliteMaterial = createMaterial(mapurl, bumpurl);
     const satelliteMesh = new THREE.Mesh(geometry, satelliteMaterial);
     satelliteMesh.position.x = posFromParent;
     satelliteMesh.scale.setScalar(scale);
     const satelliteGroup = new THREE.Group();
     satelliteGroup.position.x = parentPosition;

     const ob1 = { object: satelliteMesh, speed: rotSpeed };
     const ob2 = { group: satelliteGroup, speed: revSpeed };
     objects.push(ob1);
     groupObjects.push(ob2);
     satelliteGroup.add(satelliteMesh);
     parent.add(satelliteGroup);
 }


 // CENTRAL SUN OBJECT
 const loader = new THREE.TextureLoader();
 const sunTexture = loader.load('public/sunmap.jpg');
 const sunMaterial = new THREE.MeshPhongMaterial({
     map: sunTexture,
     bumpMap: sunTexture,
     bumpScale: 0.04,
 });
 const sun = new THREE.Mesh(geometry, sunMaterial);
 sun.position.set(0, 0, 0);
 sun.scale.setScalar(3);
 scene.add(sun);
 getRing("sunRing", 4.8, 5, 0, 0, true);
 getRing("sunRing", 5.8, 6, 0, 0, true);
 getRing("sunRing", 6.8, 7, 0, 0, true);


 // PLANETS ROTATING AROUND THE SUN

 {
     const mercuryGroup = createPlanet(10, 1, 'public/mercurymap.jpg', 'public/mercurybump.jpg', { gs: 0.01, os: 0.015 });
     // createSatellite(mercuryGroup, 10, 2, 0.5, 'public/sunmap.jpg', 'public/sunbump.jpg',0.2, 0.05);
     scene.add(mercuryGroup);
     getRing("marsring", 9.8, 10, 0, 0, true);
 }

 {
     const venusGroup = createPlanet(19, 1.3, 'public/venusmap.jpg', 'venusbump.jpg', { gs: 0.009, os: 0.012 });
     scene.add(venusGroup);
     getRing("marsring", 18.8, 19, 0, 0, true);
 }

 {

     const earthMesh = createSphere(1, 32);
     const earthGroup = addMesh(26, 1.6, earthMesh, { gs: 0.007, os: 0.01 })

     var clouds = createClouds(1.1, 32);

     // const cloudGroup = addMesh(19, 0.5, cloudMesh, { gs: 0.01, os: 0.010 });
     // scene.add(cloudsGroup);

     clouds.position.set(26, 0, 0);
     clouds.scale.setScalar(2)
     clouds.rotation.y = 6;
     const cloudsGroup = new THREE.Group();
     const ob3 = { object: clouds, speed: 0.007 };
     const ob4 = { group: cloudsGroup, speed: 0.007 };
     cloudsGroup.add(clouds);

     objects.push(ob3);
     groupObjects.push(ob4);
     scene.add(cloudsGroup);


     createSatellite(earthGroup, 26, 3.8, 1, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.001, 0.02);

     scene.add(earthGroup);
     getRing("earthring", 25.8, 26, 0, 0, true);
     getRing("moonring", 3.8, 4, 26, 0.007, false)

 }

 {
     const marsGroup = createPlanet(35, 1, 'public/marsmap.jpg', 'public/marsbump.jpg', { gs: 0.005, os: 0.012 });
     scene.add(marsGroup);
     getRing("marsring", 34.8, 35, 0, 0, true);
 }

 {
     const jupiterGroup = createPlanet(44, 1, 'public/jupitermap.jpg', undefined, { gs: 0.003, os: 0.005 });
     createSatellite(jupiterGroup, 44, 3, 0.5, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.002, 0.03);
     createSatellite(jupiterGroup, 44, 5, 0.7, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.003, 0.05);

     scene.add(jupiterGroup);
     getRing("marsring", 43.8, 44, 0, 0, true);
     getRing("jupiterSatellite", 2.8, 3, 44, 0.003, false);
     getRing("jupiterSatellite", 4.8, 5, 44, 0.003, false);

 }

 {

     const saturnGroup = createPlanet(60, 1, 'public/saturnmap.jpg', undefined, { gs: 0.001, os: 0.004 });
     scene.add(saturnGroup);
     getRing("marsring", 59.8, 60, 0, 0, true);
     getTube("staurnring", 2, 3, 60, 0.001);

 }

 {
     const uranusGroup = createPlanet(80, 1, 'public/uranusmap.jpg', undefined, { gs: 0.0007, os: 0.02 });
     scene.add(uranusGroup);
     getRing("marsring", 79.8, 80, 0, 0, true);
 }

 {
     const neptuneGroup = createPlanet(100, 1.3, 'public/neptunemap.jpg', undefined, { gs: 0.0005, os: 0.02 });
     scene.add(neptuneGroup);
     getRing("marsring", 99.8, 100, 0, 0, true);
 }
 {
     const plutoGroup = createPlanet(125, 1.1, 'public/plutomap.jpg', 'public/plutobump.jpg', { gs: 0.0003, os: 0.02 });
     scene.add(plutoGroup);
     getRing("marsring", 124.7, 125, 0, 0, true);
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
         x: (event.clientX - rect.left) * canvas.width / rect.width,
         y: (event.clientY - rect.top) * canvas.height / rect.height,
     };
 }

 function setPickPosition(event) {
     const pos = getCanvasRelativePosition(event);
     pickPosition.x = (pos.x / canvas.width) * 2 - 1;
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
 }, { passive: false });

 window.addEventListener('touchmove', (event) => {
     setPickPosition(event.touches[0]);
 });

 window.addEventListener('touchend', clearPickPosition);


 const pickPosition = { x: 0, y: 0 };
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

     controls.update();

     requestAnimationFrame(render);
 }

 requestAnimationFrame(render);

