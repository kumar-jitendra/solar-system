
const canvas = document.getElementById("mycanvas");
const myscene = new Scene(canvas);
myscene.init();

// window.addEventListener('resize', myscene.onWindowResize);

render();

function render() {
	
    myscene.update();
    
    requestAnimationFrame(render);
}



