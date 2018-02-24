import {Pip} from './pip.js'
import {DataStore} from '../base/data_store.js'


export class Pip_up extends Pip {

    constructor (top) {
        const image = DataStore.get_instance().resource.get('pie_up')
        super(image)
        this.top = top
    }

    draw_pic () {
        this.image_y = this.top-this.image_h
        super.draw_pic()
    }
}