import {ImageFather} from '../base/image_father.js'

export class Background extends ImageFather {

    constructor () {
        const image = ImageFather.get_image('background')
        // super() 相当于 new ImageFather() 
        super(
            image,
            0,
            0,
            window.innerWidth,
            window.innerHeight
        )
    }
}