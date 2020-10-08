
function Planet(root, {scale, xPos, rotSpeed, revSpeed,  mapurl, bumpurl}) {
    
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const texture = THREE.ImageUtils.loadTexture(mapurl);
    const material = new THREE.MeshStandardMaterial(
        {
            map: texture,
            bumpMap: bumpurl == undefined ? texture : THREE.ImageUtils.loadTexture(bumpurl),
            bumpScale: 0.005,
        });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = xPos;
    mesh.scale.setScalar(scale);
    const group = new THREE.Group();

    group.add(mesh);
    root.add(group);

    this.objUpdate = function () {
        group.rotation.y += revSpeed;
        mesh.rotation.y += rotSpeed;
    }

}




