import {DataStore} from '../base/data_store.js'

export class Bird {
    constructor(){
        this.data_store = DataStore.get_instance()
        this.pen = this.data_store.pen
        this.image = this.data_store.resource.get('birds')
        this.clipping_x = [9, 9+34+18, 9+34+18+34+18]
        this.clipping_y = 10
        this.image_w = 34
        this.image_h = 24
        this.image_x = 50
        this.image_y = 50
        this.clipping_w = 32
        this.clipping_h = 24
        this.pic_change_speed = 0.2
        this.count = 0
        this.index = 0
        this.a = 0.098
        this.v = -3
    }

    draw_pic () {
        // 扇动翅膀效果
        this.count = this.count + this.pic_change_speed
        if(this.count>3){
            this.count = 0
        }
        this.index = Math.floor(this.count)
        // 上下飞效果
        this.v = this.v + this.a
        this.image_y = this.image_y + this.v

        this.pen.drawImage(
            this.image,
            this.clipping_x[this.index],
            this.clipping_y, 
            this.clipping_w, 
            this.clipping_h,
            this.image_x,
            this.image_y,
            this.image_w,
            this.image_h,
        )
    }
}