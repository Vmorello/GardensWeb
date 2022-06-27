
import {get_image} from './plant_image_lookup'


const pic_scale = 150

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
            const x_position = this.x - (pic_scale/2)//this.plant_pic.width
            const y_position = this.y - (pic_scale/2) //this.plant_pic.height
            ctx.drawImage(plant_pic, x_position, y_position, pic_scale, pic_scale )
        })
        plant_pic.src = get_image(this.plant_type)
    }
    
}



    // this quote here is string templating, sorta like f-strings 
        // const color = `hsla(${Math.random()*360}, 50%, 50%, 1)`

        // fetch(`http://localhost:8000/v0/get_list?user=${this.props.user}`).then(response => {

        // }).then(json =>{
    
        // }).catch(error);
