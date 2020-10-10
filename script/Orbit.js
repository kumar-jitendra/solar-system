
 function createOrbit(root, innerRadius, outerRadius, distanceFromAxis, satelliteSpeed, isCentral) {
   
    var ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    var ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    var myRing = new THREE.Mesh(ringGeometry, ringMaterial);

    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = -Math.PI / 2;

    const ringGroup = new THREE.Group();

    if (isCentral) {

        root.add(myRing);
    }
    else {
       
        ringGroup.add(myRing);
        root.add(ringGroup);
    }

    this.objUpdate = function () {
        
        // if(!isCentral)
        ringGroup.rotation.y += satelliteSpeed;
    }
    
}