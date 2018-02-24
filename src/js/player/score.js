// 这是积分器

import {DataStore} from '../base/data_store.js'

export class Score {

    constructor () {
        this.pen = DataStore.get_instance().pen
        this.number = 0
    }

    draw_text () {
        this.pen.font = '25px Arial'
        this.pen.fillStyle = '#ffcbeb'
        this.pen.fillText(
            this.number,
            window.innerWidth/2,
            window.innerHeight/2
        )
    }
}