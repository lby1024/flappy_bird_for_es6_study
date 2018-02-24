import {ImageFather} from '../base/image_father.js'
import {DataStore} from '../base/data_store.js'

export class Land extends ImageFather {
    
    constructor () {
        const image = ImageFather.get_image('land')
        super(
            image,
            0,
            window.innerHeight-image.height,
            image.width,
            image.height
        )
        this.speed = DataStore.get_instance().land_speed
    }

    draw_pic () {
        this.image_x = this.image_x-this.speed
        if(-this.image_x>this.image_w-window.innerWidth){
            this.image_x = 0
        }
        super.draw_pic()
    }
}