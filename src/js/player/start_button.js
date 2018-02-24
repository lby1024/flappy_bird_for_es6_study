import {ImageFather} from '../base/image_father.js'
import {DataStore} from '../base/data_store.js'

export class StartButton extends ImageFather {

    constructor(){
        const image = DataStore.get_instance().resource.get('start_button') 
        super(
            image,
            window.innerWidth/2-image.width/2,
            window.innerHeight/3,
            image.width,
            image.height
        )
    }
}