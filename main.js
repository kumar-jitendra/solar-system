
const canvas = document.getElementById("mycanvas");
const myscene = new Scene(canvas);
myscene.init();

// window.addEventListener('resize', myscene.onWindowResize);

window.addEventListener('touchend', myscene.pickHelper.clearPickPosition);


render();

function render() {
	
    myscene.update();
    
    requestAnimationFrame(render);
}



