import {ImageFather} from '../base/image_father.js'
import {DataStore} from '../base/data_store.js'

export class Pip extends ImageFather {

    constructor (image) {
        super(
            image,
            window.innerWidth,
            0,
            image.width,
            image.height
        )
        this.speed = DataStore.get_instance().land_speed
        this.is_over_bird = false
    }

    draw_pic () {
        this.image_x = this.image_x-this.speed
        super.draw_pic()
    }
}