// import Image from "next/image"

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

export class SrcImageVisibleItem extends VisibleItem {
  constructor(image, x, y, placedCenter = true) {
    super(x, y, placedCenter);
    this.load(image);
  }

  load(imageSrc) {
    this.startLoad();
    console.log(imageSrc);
    this.pic.src = imageSrc;
  }
}

export class PublicImageVisibleItem extends VisibleItem {
  constructor(image, x, y, placedCenter = true) {
    super(x, y, placedCenter);
    this.load(image);
  }

  load(image) {
    this.startLoad();
    console.log(image);
    this.pic.src = image.src;
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
