class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
    this.pickPosition = null;
  }
  pick(root, camera) {
    
    // console.log(this.pickPosition, normalizedPosition)
    // restore the color if there is a picked object
    if (this.pickedObject) {

      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
      console.log("from pick function ")
    }

    if (this.pickPosition) {
      this.raycaster.setFromCamera(this.pickPosition, camera);

      const intersectedObjects = this.raycaster.intersectObjects(root.children);
       console.log(scene.children);

      if (intersectedObjects.length) {
        console.log("asigning this.pickObject");
        this.pickedObject = intersectedObjects[0].object;
        // this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // console.log(this.pickedObject);
        this.pickedObject.material.emissive.setHex(0x00FF00);
      }
    }
  }

  getCanvasRelativePosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
  }

  setPickPosition = (event) => {
    const pos = this.getCanvasRelativePosition(event);
    this.pickPosition = {};
    this.pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    this.pickPosition.y = (pos.y / canvas.height) * -2 + 1;
    console.log("from setPickPosition");
  }

  clearPickPosition() {
    this.pickPosition = {};
    this.pickPosition.x = -100000;
    this.pickPosition.y = -100000;
    console.log("from clearPickPosition");
  }
}

