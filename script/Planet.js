
function Planet(root, param) {
    const prop = {
        scale : param.scale,
        xPos : param.distance,
       rotSpeed : param.rotSpeed,
       revSpeed : param.revSpeed,
       mapurl : param.mapurl,
       bumpurl : param.bumpurl,
       saturn : param.isSaturn
    }
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.ImageUtils.loadTexture(prop.mapurl);
    const material = new THREE.MeshStandardMaterial(
        {
            map: texture,
            bumpMap: prop.bumpurl == undefined ? texture : THREE.ImageUtils.loadTexture(prop.bumpurl),
            bumpScale: 0.005,
        });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = prop.xPos;
    mesh.scale.setScalar(prop.scale);
    const group = new THREE.Group();
    group.add(mesh);

    root.add(group);

    const planetOrbit = new createOrbit(root, prop.xPos-0.2, prop.xPos, 0, 0, true);
    let saturnRing = null;
    
     if(prop.saturn) {
         saturnRing = new createSaturnRing(root, 2, 3, 60, prop.revSpeed);
     }

    this.objUpdate = function () {
        group.rotation.y += prop.revSpeed;
        mesh.rotation.y += prop.rotSpeed;

        if(saturnRing != null){
            saturnRing.objUpdate();
        }
      
        planetOrbit.objUpdate();
    }

}




