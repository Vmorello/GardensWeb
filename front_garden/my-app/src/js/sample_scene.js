import {VisiblePlant} from './classes';


export function set_up_canvas(canvas){ //, ctx

    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    canvas.addEventListener("click", (event)=> {
        const plant_selection = document.getElementById("plant_selection")
        console.log(plant_selection.value)
        // console.log(ctx)
        //const new_plant = 
        new VisiblePlant(ctx, plant_selection.value, event.clientX, event.clientY)
        // plants.push(new_plant)

    })
}
