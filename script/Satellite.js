
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