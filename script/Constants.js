const FOV = 45;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 1000;
const CAMERA_POSITION = [-30, 20, 50];


const PLANET_PROP = [
{scale: 1, distance : 10, rotSpeed: 0.015, revSpeed : 0.01, mapurl : "../public/mercurymap.jpg", bumpurl : "../public/mercurybump.jpg", isSaturn : false},
{scale: 1.3, distance : 19, rotSpeed: 0.012, revSpeed : 0.009, mapurl : "../public/venusmap.jpg", bumpurl : "../public/venusbump.jpg", isSaturn : false},
{scale: 1, distance : 35, rotSpeed: 0.012, revSpeed : 0.006, mapurl : "../public/marsmap.jpg", bumpurl : "../public/marsbump.jpg", isSaturn : false},
{scale: 1, distance : 60, rotSpeed: 0.004, revSpeed : 0.002, mapurl : "../public/mercurymap.jpg", bumpurl : "../public/mercurymap.jpg", isSaturn : true},
{scale: 1.1, distance : 80, rotSpeed: 0.02, revSpeed : 0.0008, mapurl : "../public/uranusmap.jpg", bumpurl : "../public/uranusmap.jpg", isSaturn : false},
{scale: 1.3, distance : 95, rotSpeed: 0.02, revSpeed : 0.0006, mapurl : "../public/neptunemap.jpg", bumpurl : "../public/neptunemap.jpg", isSaturn : false},
{scale: 1.1, distance : 120, rotSpeed: 0.02, revSpeed : 0.0003, mapurl : "../public/plutomap.jpg", bumpurl : "../public/plutobump.jpg", isSaturn : false}
    
];