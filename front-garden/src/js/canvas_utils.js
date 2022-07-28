import {VisiblePlant} from './plant_object';


export class CanvasControl{
    constructor (canvas) {
            this.canvas = canvas
            this.ctx = this.canvas.getContext("2d")
            this.plant_list = []
        }

    visual_draw(plant_selected, x, y){ 
            this.plant_list.push(new VisiblePlant(this.ctx, plant_selected.value, x, y))
        }

    visual_load(plant_list){
        this.plant_list = []
        plant_list.forEach(plant => {
            this.plant_list.push(new VisiblePlant(this.ctx, plant["plant"], plant["x"], plant["y"]))
        });

    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
