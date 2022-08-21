// import Image from "next/image";

import { get_image } from "./plant_image_lookup";

//need to dynamiclly find these offsets

export class VisiblePlant {
  constructor(ctx, plant_type, x, y) {
    this.plant_type = plant_type;
    this.x = x;
    this.y = y;
    this.draw_once(ctx);
  }

  draw_once(ctx) {
    const plant_pic = new Image();
    plant_pic.addEventListener("load", () => {
      console.log("trying to draw on canvas");
      console.log(plant_pic);
      const x_position = this.x - plant_pic.naturalHeight / 2;
      const y_position = this.y - plant_pic.naturalWidth / 2;
      ctx.drawImage(plant_pic, x_position, y_position);
    });
    plant_pic.src = get_image(this.plant_type);
  }
}
