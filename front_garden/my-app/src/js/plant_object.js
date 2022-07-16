
import {get_image} from './plant_image_lookup'

const image_pixels = 128

export class VisiblePlant {
    constructor(ctx, plant_type, x, y) {
        this.plant_type = plant_type
        this.x = x
        this.y = y
        this.draw_once(ctx)
    }

    draw_once(ctx) {
        const plant_pic = new Image()
        plant_pic.addEventListener("load", () => {
            console.log(this.plant_pic)
            const x_position = this.x - image_pixels/2
            const y_position = this.y - image_pixels
            ctx.drawImage(plant_pic, x_position, y_position)
        })
        plant_pic.src = get_image(this.plant_type)
    }
}
