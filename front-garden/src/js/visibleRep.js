// import Image from "next/image";

import { get_image } from "./image_lookup";

class VisibleItem {
  constructor(x, y, placedCenter) {
    this.x = x;
    this.y = y;
    this.placedCenter = placedCenter;
  }

  startLoad() {
    this.pic = new Image();
    this.pic.addEventListener("load", () => {
      if (this.placedCenter === true) {
        this.x = this.x - this.pic.naturalHeight / 2;
        this.y = this.y - this.pic.naturalWidth / 2;
      }
    });
  }

  load() {
    throw "load function not implemented";
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.x, this.y);
  }
}

export class IconVisibleItem extends VisibleItem {
  constructor(icon, x, y, placedCenter = true) {
    super(x, y, placedCenter);
    this.load(icon);
  }

  load(icon) {
    this.startLoad();
    this.pic.src = get_image(icon);
  }
}

export class FileVisibleItem extends VisibleItem {
  constructor(file, x, y, placedCenter = true) {
    super(x, y, placedCenter);
    this.load(file);
  }

  load(file) {
    this.startLoad();
    this.pic.src = URL.createObjectURL(file);
  }
}
