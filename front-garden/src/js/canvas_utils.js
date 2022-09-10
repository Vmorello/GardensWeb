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

  visual_load(plant_list) {
    let plant;
    let visualPlants = [];
    for (let i = 0; i < plant_list.length; i++) {
      plant = plant_list[i];
      console.log(plant);
      visualPlants.push(
        new VisiblePlant(plant["name"], plant["x"], plant["y"])
      );
    }
    return visualPlants;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startAnimation(visualPlants) {
    return () => {
      this.clear();
      for (let i = 0; i < visualPlants.length; i++) {
        visualPlants[i].draw(this.ctx);
      }
      // requestAnimationFrame(this.startAnimation(visualPlants));
    };
  }
}
