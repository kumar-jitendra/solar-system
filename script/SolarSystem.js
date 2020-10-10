function SolarSystem(scene) {
    const amblight = new THREE.AmbientLight(0xcccccc);
    scene.add(amblight);


 var light = new THREE.DirectionalLight(0xcccccc, 1);
 light.position.set(0, 5, 5)
 scene.add(light)

 const starField = new createStars(200,80);
 scene.add(starField);

}