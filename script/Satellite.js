
 function createSatellite(parent, parentPosition, posFromParent, scale, mapurl, bumpurl, rotSpeed, revSpeed) {

    const texture = THREE.ImageUtils.loadTexture(mapurl);
    const satelliteMaterial = new THREE.MeshStandardMaterial(
        {
            map: texture,
            bumpMap: bumpurl == undefined ? texture : THREE.ImageUtils.loadTexture(bumpurl),
            bumpScale: 0.005,
        });
    
    const satelliteMesh = new THREE.Mesh(geometry, satelliteMaterial);
    satelliteMesh.position.x = posFromParent;
    satelliteMesh.scale.setScalar(scale);
    const satelliteGroup = new THREE.Group();
    satelliteGroup.position.x = parentPosition;

    satelliteGroup.add(satelliteMesh);
    parent.add(satelliteGroup);

    this.objUpdate = function () {
        satelliteGroup.rotation.y += revSpeed;
        satelliteMesh.rotation.y += rotSpeed;
    }
}