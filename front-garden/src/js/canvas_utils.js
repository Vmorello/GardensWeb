import { VisiblePlant } from "./plant_object";

export class CanvasControl {
  constructor(canvas) {
    if (canvas === "not_defined") {
      return;
    } else {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      //this.plant_list = []
    }
  }

  visual_draw(plant_selected, x, y) {
    new VisiblePlant(this.ctx, plant_selected.value, x, y);
  }

  visual_load(plant_list) {
    plant_list.forEach((plant) => {
      new VisiblePlant(this.ctx, plant["name"], plant["x"], plant["y"]);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
