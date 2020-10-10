
function createSun(root) {

    // CENTRAL SUN OBJECT
    const loader = new THREE.TextureLoader();
    const sunTexture = loader.load('../public/sunmap.jpg');
    const sunMaterial = new THREE.MeshPhongMaterial({
        map: sunTexture,
        bumpMap: sunTexture,
        bumpScale: 0.04,
    });

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const sun = new THREE.Mesh(geometry, sunMaterial);
    sun.position.set(0, 0, 0);
    sun.scale.setScalar(3);
    root.add(sun);

    const sunOrbit1 = new createOrbit(root, 4.8, 5, 0, 0, true);
    const sunOrbit2 = new createOrbit(root, 5.8, 6, 0, 0, true);
    const sunOrbit3 = new createOrbit(root, 6.8, 7, 0, 0, true);

    this.objUpdate = function () {

        sun.rotation.y += 0.01;
        sunOrbit1.objUpdate();
        sunOrbit2.objUpdate();

        sunOrbit3.objUpdate();

    }

}