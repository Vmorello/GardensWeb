import {VisiblePlant} from './classes';

export class CanvasUtil{
    constructor (canvas, plant_list=null) {
            this.canvas = canvas
            this.ctx = this.canvas.getContext("2d")
            this.plant_list = plant_list
        }

    set_up_canvas(){ 
        this.canvas.addEventListener("click", (event)=> {
            const plant_selection = document.getElementById("plant_selection")
            console.log(plant_selection.value)
            //const new_plant = 
            new VisiblePlant(this.ctx, plant_selection.value, event.clientX, event.clientY)
            // plants.push(new_plant)
    
        })
    }
    
}
// export function set_up_canvas(canvas){ 

//     const ctx = canvas.getContext("2d")

//     canvas.addEventListener("click", (event)=> {
//         const plant_selection = document.getElementById("plant_selection")
//         console.log(plant_selection.value)
//         // console.log(ctx)
//         //const new_plant = 
//         new VisiblePlant(ctx, plant_selection.value, event.clientX, event.clientY)
//         // plants.push(new_plant)

//     })
// }
