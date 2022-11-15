import { FileVisibleItem, SrcImageVisibleItem } from "./visibleRep";

import { get_image } from "./image_lookup";

export class CanvasControl {
  constructor(canvas) {
    if (canvas === "not_defined" || canvas === "null") {
      return;
    } else {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      // this.animationFrame = undefined;
      // this.paintBackground = undefined;
    }
  }

  clear(clearColor = "#FFFFFF") {
    //console.log(`trying to clear the background with ${clearColor}`);
    this.ctx.fillStyle = clearColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setPaintBackground(background) {
    return () => background.draw(this.ctx);
  }

  setBackground(background) {
    if (background === undefined) {
      this.paintBackground = this.clear;
    } else {
      try {
        this.paintBackground = this.setPaintBackground(
          new SrcImageVisibleItem(background, 0, 0, false)
        );
      } catch (err) {
        console.log(err);
        this.paintBackground = this.setPaintBackground(
          new FileVisibleItem(background, 0, 0, false)
        );
      }
    }
  }

  setHover(currentIcon) {
    this.hover = new SrcImageVisibleItem(get_image(currentIcon), null, null);
    this.hoverVisable = false;

    this.hoverOnPointerMove = (event) => {
      if (!(this.hover === null)) {
        this.hover.move(
          event.pageX - this.hover.pic.naturalHeight / 2,
          event.pageY - this.hover.pic.naturalWidth / 2
        );
        this.hoverVisable = true;
      }
    };
    this.canvas.addEventListener("pointermove", this.hoverOnPointerMove, true);

    this.canvas.addEventListener("pointerout", (event) => {
      this.hoverVisable = false;
    });
  }

  updateHover(currentIcon) {
    this.hover.changeType(currentIcon);
  }

  removeHover() {
    this.hover = null;
    this.hoverVisable = false;
  }

  visual_load(rep_list) {
    let rep;
    let visualReps = [];
    for (let i = 0; i < rep_list.length; i++) {
      rep = rep_list[i];
      visualReps.push(
        new SrcImageVisibleItem(get_image(rep["icon"]), rep["x"], rep["y"])
      );
    }
    return visualReps;
  }

  killGhostAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }

  animate(visualReps) {
    this.killGhostAnimation();
    return () => {
      this.animationFrame = requestAnimationFrame(this.animate(visualReps));
      //this.clear();
      this.paintBackground();
      //console.log(visualReps);
      for (let i = 0; i < visualReps.length; i++) {
        visualReps[i].draw(this.ctx);
      }
      if (this.hoverVisable) {
        // console.log("drawing hover");
        this.hover.draw(this.ctx);
      }
    };
  }
}
