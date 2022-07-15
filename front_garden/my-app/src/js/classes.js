
import {get_image} from './plant_image_lookup'


 const image_pixels = 256

export class VisiblePlant{
    constructor (ctx, plant_type, x, y) {
        this.plant_type = plant_type
        this.x = x
        this.y = y
        this.draw_once(ctx)
        }

    draw_once(ctx){
        const plant_pic = new Image()
        plant_pic.addEventListener("load", () =>{

            console.log(this.plant_pic                   )
            const x_position = this.x - image_pixels/2
            const y_position = this.y - image_pixels/2
            ctx.drawImage(plant_pic, x_position, y_position )
        })
        plant_pic.src = get_image(this.plant_type)
    }
    
}



    // this quote here is string templating, sorta like f-strings 
        // const color = `hsla(${Math.random()*360}, 50%, 50%, 1)`

        // fetch(`http://localhost:8000/v0/get_list?user=${this.props.user}`).then(response => {

        // }).then(json =>{
    
        // }).catch(error);
