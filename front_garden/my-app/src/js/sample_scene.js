import {VisiblePlant} from './classes';

// const canvas = document.querySelector("canvas")
// const ctx = canvas.getContext("2d")

export function set_up_canvas(canvas, ctx){

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // let plants
    // function initilize(){
    //     plants = []
    // }
    // initilize()

    canvas.addEventListener("click", (event)=> {
        const plant_selection = document.getElementById("plant_selection")
        console.log(plant_selection.value)
        // console.log(ctx)
        //const new_plant = 
        new VisiblePlant(ctx, plant_selection.value, event.clientX, event.clientY)
        // plants.push(new_plant)

    })
}
