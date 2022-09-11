import { VisiblePlant } from "./plant_object";

export class CanvasControl {
  constructor(canvas) {
    if (canvas === "not_defined" || canvas === "null") {
      return;
    } else {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
    }
  }

  setHover(plant) {
    this.hover = new VisiblePlant(plant, null, null);
    this.hoverVisable = false;

    this.canvas.addEventListener("pointermove", (event) => {
      this.hoverVisable = true;
      this.hover.move(
        event.pageX - this.hover.plant_pic.naturalHeight / 2,
        event.pageY - this.hover.plant_pic.naturalWidth / 2
      );
    });

    this.canvas.addEventListener("pointerout", (event) => {
      this.hoverVisable = false;
    });
  }

  updateHoverPlant(currentPlant) {
    this.hover.changePlant(currentPlant);
  }

  visual_load(plant_list) {
    let plant;
    let visualPlants = [];
    for (let i = 0; i < plant_list.length; i++) {
      plant = plant_list[i];
      //console.log(plant);
      visualPlants.push(
        new VisiblePlant(plant["name"], plant["x"], plant["y"])
      );
    }
    return visualPlants;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate(visualPlants) {
    return () => {
      requestAnimationFrame(this.animate(visualPlants));
      this.clear();
      for (let i = 0; i < visualPlants.length; i++) {
        visualPlants[i].draw(this.ctx);
      }
      if (this.hoverVisable) {
        this.hover.draw(this.ctx);
      }
    };
  }
}
