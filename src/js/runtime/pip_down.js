import {Pip} from './pip.js'
import {DataStore} from '../base/data_store.js'


export class Pip_down extends Pip {

    constructor (top) {
        const image = DataStore.get_instance().resource.get('pie_down')
        super(image)
        this.top = top
    }

    draw_pic () {
        this.image_y = this.top+100
        super.draw_pic()
    }
}