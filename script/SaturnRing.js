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