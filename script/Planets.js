const geometry =  new THREE.SphereGeometry(1, 32, 16);
 
function addMesh(x, scale, obj, { gs, os }, objects, groupObjects) {

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

 function createPlanet(x, scale, mapurl, bumpurl, speed, objects, groupObjects) {
     const mesh = new THREE.Mesh(geometry, createMaterial(mapurl, bumpurl));
     return addMesh(x, scale, mesh, speed, objects, groupObjects);
 }

 
 
//  // PLANETS ROTATING AROUND THE SUN

//  {
//     const mercuryGroup = createPlanet(10, 1, 'public/mercurymap.jpg', 'public/mercurybump.jpg', { gs: 0.01, os: 0.015 });
//     scene.add(mercuryGroup);
//     getRing("marsring", 9.8, 10, 0, 0, true);
// }

// {
//     const venusGroup = createPlanet(19, 1.3, 'public/venusmap.jpg', 'venusbump.jpg', { gs: 0.009, os: 0.012 });
//     scene.add(venusGroup);
//     getRing("marsring", 18.8, 19, 0, 0, true);
// }


// {
//     const marsGroup = createPlanet(35, 1, 'public/marsmap.jpg', 'public/marsbump.jpg', { gs: 0.005, os: 0.012 });
//     scene.add(marsGroup);
//     getRing("marsring", 34.8, 35, 0, 0, true);
// }

// {
//     const jupiterGroup = createPlanet(44, 1, 'public/jupitermap.jpg', undefined, { gs: 0.003, os: 0.005 });
//     createSatellite(jupiterGroup, 44, 3, 0.5, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.002, 0.03);
//     createSatellite(jupiterGroup, 44, 5, 0.7, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.003, 0.05);

//     scene.add(jupiterGroup);
//     getRing("marsring", 43.8, 44, 0, 0, true);
//     getRing("jupiterSatellite", 2.8, 3, 44, 0.003, false);
//     getRing("jupiterSatellite", 4.8, 5, 44, 0.003, false);

// }

// {

//     const saturnGroup = createPlanet(60, 1, 'public/saturnmap.jpg', undefined, { gs: 0.001, os: 0.004 });
//     scene.add(saturnGroup);
//     getRing("marsring", 59.8, 60, 0, 0, true);
//     getTube("staurnring", 2, 3, 60, 0.001);

// }

// {
//     const uranusGroup = createPlanet(80, 1, 'public/uranusmap.jpg', undefined, { gs: 0.0007, os: 0.02 });
//     scene.add(uranusGroup);
//     getRing("marsring", 79.8, 80, 0, 0, true);
// }

// {
//     const neptuneGroup = createPlanet(100, 1.3, 'public/neptunemap.jpg', undefined, { gs: 0.0005, os: 0.02 });
//     scene.add(neptuneGroup);
//     getRing("marsring", 99.8, 100, 0, 0, true);
// }
// {
//     const plutoGroup = createPlanet(125, 1.1, 'public/plutomap.jpg', 'public/plutobump.jpg', { gs: 0.0003, os: 0.02 });
//     scene.add(plutoGroup);
//     getRing("marsring", 124.7, 125, 0, 0, true);
// }
