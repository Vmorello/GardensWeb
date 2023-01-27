
export class VisibleItem {
  x:number
  y:number
  placedCenter:boolean
  pic?:HTMLImageElement

  constructor(x:number, y:number, placedCenter:boolean) {
    this.x = x;
    this.y = y;
    this.placedCenter = placedCenter;
  }

  startLoad() {
    this.pic = new Image();
  }

  load(input:any) {
    throw "load function not implemented";
  }

  move(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx:CanvasRenderingContext2D) {
    ctx.drawImage(this.pic!, this.x, this.y);
  }
}

class SrcImageVisibleItem extends VisibleItem {
  constructor(image:string, x:number, y:number, placedCenter = true) {
    super(x, y, placedCenter);

    this.load(image);
  }

  load(imageSrc:string) {
    this.startLoad();
    // console.log(imageSrc);
    this.pic!.src = imageSrc;
  }
}

// export class PublicImageVisibleItem extends VisibleItem {
//   constructor(image:HTMLImageElement, x:number, y:number, placedCenter = true) {
//     super(x, y, placedCenter);
//     this.load(image);
//   }

//   load(image:HTMLImageElement) {
//     this.startLoad();
//     // console.log(image);
//     this.pic!.src = image.src;
//   }
// }

class FileVisibleItem extends VisibleItem {
  constructor(file:Blob, x:number, y:number, placedCenter = true) {
    super(x, y, placedCenter);
    this.load(file);
  }

  load(file:Blob) {
    this.startLoad();
    this.pic!.src = URL.createObjectURL(file);
  }
}

export const getVisibleItemBy = (type:string[], data:any, x:number, y:number, placedCenter:boolean=true) => {
  if (data instanceof Blob) {
    return new FileVisibleItem(data, x, y, placedCenter);
  }

  return new SrcImageVisibleItem(data, x, y, placedCenter);
};
