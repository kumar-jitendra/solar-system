function createClouds(root, radius, segments) {
  const clouds =  new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('public/cloudmap.jpg'),
            side: THREE.DoubleSide,
            opacity: 0.8,
            transparent: true,
        })
    );

    clouds.position.set(26, 0, 0);
    clouds.scale.setScalar(1.6)
    const cloudGroup = new THREE.Group();
    cloudGroup.add(clouds);
    
    this.objUpdate = function() {
        clouds.rotation.y += 0.02;
        cloudGroup.rotation.y += 0.001;
    }

}