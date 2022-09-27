// import Image from "next/image";

import { get_image } from "./image_lookup";

//need to dynamiclly find these offsets

export class VisibleItem {
  constructor(icon, x, y, isPlacedCenter = true) {
    this.icon = icon;
    this.x = x;
    this.y = y;
    this.load(isPlacedCenter);
  }

  load(isPlacedCenter) {
    this.pic = new Image();
    this.pic.addEventListener("load", () => {
      if (isPlacedCenter === true) {
        this.x = this.x - this.pic.naturalHeight / 2;
        this.y = this.y - this.pic.naturalWidth / 2;
      }
    });
    this.pic.src = get_image(this.icon);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  changeIcon(icon) {
    this.icon = icon;
    this.load();
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.x, this.y);
  }
}
