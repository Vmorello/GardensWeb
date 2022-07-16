import {VisiblePlant} from './plant_object';


export class CanvasUtil{
    constructor (canvas) {
            this.canvas = canvas
            this.ctx = this.canvas.getContext("2d")
        }

    set_up_canvas_clicks(){ 
        this.canvas.addEventListener("click", (event)=> {
            const plant_selected = document.getElementById("plant_selection")
            new VisiblePlant(this.ctx, plant_selected.value, event.layerX, event.layerY)
        })
    }

    load(plant_list){
        plant_list.forEach(plant => {
            new VisiblePlant(this.ctx, plant["plant"], plant["x"], plant["y"])
        });
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
