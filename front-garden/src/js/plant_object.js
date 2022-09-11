// import Image from "next/image";

import { get_image } from "./plant_image_lookup";

//need to dynamiclly find these offsets

export class VisiblePlant {
  constructor(plantType, x, y) {
    this.plantType = plantType;
    this.x = x;
    this.y = y;
    this.load();
  }

  load() {
    this.plant_pic = new Image();
    //this.loaded = false;
    this.plant_pic.addEventListener("load", () => {
      this.loaded_x = this.x - this.plant_pic.naturalHeight / 2;
      this.loaded_y = this.y - this.plant_pic.naturalWidth / 2;
    });
    this.plant_pic.src = get_image(this.plantType);
  }

  //move_loaded(x, y) {
  move(x, y) {
    this.loaded_x = x;
    this.loaded_y = y;
  }

  changePlant(plant) {
    this.plantType = plant;
    this.load();
  }

  draw(ctx) {
    //console.log(`trying to draw ${this.plant_pic.src} on canvas`);
    ctx.drawImage(this.plant_pic, this.loaded_x, this.loaded_y);
  }
}
