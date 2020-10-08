function createEarth() {
    const earthMesh = createSphere(1, 32);
    const earthGroup = addMesh(26, 1.6, earthMesh, { gs: 0.007, os: 0.01 })

    var clouds = createClouds(1.05, 32);

    // const cloudGroup = addMesh(19, 0.5, cloudMesh, { gs: 0.01, os: 0.010 });
    // scene.add(cloudsGroup);

    clouds.position.set(26, 0, 0);
    clouds.scale.setScalar(1.6)
   //  clouds.rotation.y = 6;
    const cloudsGroup = new THREE.Group();
    const ob3 = { object: clouds, speed: 0.007 };
    const ob4 = { group: cloudsGroup, speed: 0.007 };
    cloudsGroup.add(clouds);

    objects.push(ob3);
    groupObjects.push(ob4);
    // scene.add(cloudsGroup);


    // createSatellite(earthGroup, 26, 3.8, 1, 'public/moonmap.jpg', 'public/moonbump.jpg', 0.001, 0.02);

    return {earthGroup, cloudsGroup};

    // scene.add(earthGroup);
    // getRing("earthring", 25.8, 26, 0, 0, true);
    // getRing("moonring", 3.8, 4, 26, 0.007, false);


}

function createSphere(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('public/earthmap.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('public/earth_bump.jpg'),
            bumpScale: 0.2,
            specularMap: THREE.ImageUtils.loadTexture('public/earthspec.png'),
            // specular:    new THREE.Color('grey')								
        })
    );

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

}