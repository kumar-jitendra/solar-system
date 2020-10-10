function createEarth(root) {

    const earthGroup = new THREE.Group();
    
    const earthMesh =  new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../public/earthmap.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('../public/earth_bump.jpg'),
            bumpScale: 0.2,
            specularMap: THREE.ImageUtils.loadTexture('../public/earthspec.png'),
           							
        })
    );

    earthMesh.scale.setScalar(1.6);
    earthMesh.position.set(26, 0, 0);
    const clouds = new createClouds(root, 1.05, 32);
    const satellite = new createSatellite(earthGroup, 26, 3.8, 1, '../public/moonmap.jpg', '../public/moonbump.jpg', 0.02, 0.02);

    earthGroup.add(earthMesh);

    root.add(earthGroup);

    const earthOrbit = new createOrbit(root, 25.8, 26, 0, 0, true);
    const moonRing =  new createOrbit(root, 3.8, 4, 26, 0.007, false);

    this.objUpdate = function() {

          earthGroup.rotation.y += 0.007;
          earthMesh.rotation.y += 0.01;

        clouds.objUpdate();
        satellite.objUpdate();

        moonRing.objUpdate();
        earthOrbit.objUpdate();
    }


}



