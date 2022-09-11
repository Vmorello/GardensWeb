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
      //console.log(`trying to load ${this.plant_pic.src} on canvas`);
      // console.log(plant_pic);
      //if (!this.loaded) {
      this.x = this.x - this.plant_pic.naturalHeight / 2;
      this.y = this.y - this.plant_pic.naturalWidth / 2;
      this.loaded = true;
      //}
    });
    this.plant_pic.src = get_image(this.plantType);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  changePlant(plant) {
    this.plantType = plant;
    this.load();
  }

  draw(ctx) {
    //console.log(`trying to draw ${this.plant_pic.src} on canvas`);
    ctx.drawImage(this.plant_pic, this.x, this.y);
  }

  drawFaded(ctx) {
    ctx.drawImage(this.plant_pic, this.x, this.y);
  }
}
