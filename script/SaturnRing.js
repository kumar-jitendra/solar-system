function createSaturnRing(root, innerRadius, outerRadius, distanceFromAxis, saturnSpeed) {
     
    const saturnRingTexture = new THREE.ImageUtils.loadTexture('../public/saturnringcolor.jpg');
    var ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
    var ringMaterial = new THREE.MeshStandardMaterial({ map: saturnRingTexture, side: THREE.DoubleSide });
    var myRing = new THREE.Mesh(ringGeometry, ringMaterial);

    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = -Math.PI / 3;

    const ringGroup = new THREE.Group();
    ringGroup.add(myRing);

    root.add(ringGroup);

    this.objUpdate = function() {
       
        myRing.rotation.y += 0;
        ringGroup.rotation.y += saturnSpeed;
    }
    
}