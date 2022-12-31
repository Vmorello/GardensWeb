import {CanvasUtilBase} from "../react/canvas_component"

import { get_image } from "./image_lookup";
import { getVisibleItemBy, VisibleItem} from "./visibleRep";


interface setupInit {
  background: string|File
  mode:string
  currentItem:string
}


interface startAnimationInit{
  
}


export class CanvasControl implements CanvasUtilBase {
  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D
  offset:{
    x: number;
    y: number;
  }
  hover:VisibleItem|null
  hoverVisable:boolean
  animationFrame?:number
  hoverOnPointerMove?:(event:MouseEvent)=>void
  


  paintBackground?:()=>void

    constructor(canvas:HTMLCanvasElement, offset = { x: 0, y: 0 }) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d")!;
      this.offset = offset;
      this.hover = null
      this.hoverVisable =false
    }

    setup(props:setupInit){
      this.setBackground(props.background);

      if (props.mode === "place") {
        this.setHover(props.currentItem);
      } else {
        this.removeHover();
      }
    }

    setBackground(background:string|File) {
      if (background === undefined) {
        this.paintBackground = this.clear;
      } else {
        this.paintBackground = this.setPaintBackground(
          getVisibleItemBy(["blob/file", "src"], background, 0, 0, false)
        );
      }
    }

    setPaintBackground(background:VisibleItem) {
      return () => background.draw(this.ctx);
    }
  
    setHover(currentIcon:string) {
      this.hover = getVisibleItemBy(["src"],get_image(currentIcon), -100, -100)
      this.hoverVisable = false
  
      this.hoverOnPointerMove = (event:MouseEvent) => {
        if (!(this.hover === null||this.hover === undefined)) {
          this.hover.move(
            event.pageX - this.hover.pic!.naturalHeight / 2,
            event.pageY - this.hover.pic!.naturalWidth / 2
          );
          this.hoverVisable = true;
        }
      };
      this.canvas.addEventListener("pointermove", this.hoverOnPointerMove, true);
  
      this.canvas.addEventListener("pointerout", (event) => {
        this.hoverVisable = false;
      });
    }
  
    // updateHover(currentIcon:string) {
    //   this.hover.changeType(currentIcon);
    // }
  
    removeHover() {
      this.hover = null;
      this.hoverVisable = false;
    }
  
    visual_load(rep_list:Array<{icon:string,x:number,y:number}>) {
      let rep;
      let visualReps = [];
      for (let i = 0; i < rep_list.length; i++) {
        rep = rep_list[i];
        visualReps.push(
          getVisibleItemBy(["src"],get_image(rep["icon"]), rep["x"], rep["y"])
        );
      }
      return visualReps;
    }


    killPreviousAnimation() {
      cancelAnimationFrame(this.animationFrame!);
    }
  
    animate(visualReps:Array<VisibleItem>) {
      return () => {
        this.animationFrame = requestAnimationFrame(this.animate(visualReps));
        //this.clear();
        this.paintBackground!();
        //console.log(visualReps);
        for (let i = 0; i < visualReps.length; i++) {
          visualReps[i].draw(this.ctx);
        }
        if (this.hoverVisable) {
          // console.log("drawing hover");
          this.hover!.draw(this.ctx);
        }
      };
    }
  
    startAnimation(repList:Array<{icon:string,x:number,y:number}>) {
      this.killPreviousAnimation();
      let visualReps = this.visual_load(repList);
      return () => {
        this.animationFrame = requestAnimationFrame(this.animate(visualReps));
        this.paintBackground!();
      };
    }


    // startAnimation(props:startAnimationBase){

    //   return ()=> {}

    // }


    clear(clearColor = "#FFFFFF") {
      //console.log(`trying to clear the background with ${clearColor}`);
      this.ctx.fillStyle = clearColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}