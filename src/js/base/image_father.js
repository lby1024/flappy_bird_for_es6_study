import {DataStore} from './data_store.js'

export class ImageFather {

    constructor (
        image = null,
        image_x = 0,
        image_y = 0,
        image_w = 0,
        image_h = 0,
    ) {
        this.data_store = DataStore.get_instance()
        this.pen = this.data_store.pen
        this.image = image
        this.image_x = image_x
        this.image_y = image_y
        this.image_w = image_w
        this.image_h = image_h
    }

    // 将image画入画布
    draw_pic (
        image=this.image,
        image_x=this.image_x,
        image_y=this.image_y,
        image_w=this.image_w,
        image_h=this.image_h,
    ) {
        this.pen.drawImage(
            image,
            image_x,
            image_y,
            image_w,
            image_h,
        )
    }
    // 从缓存中获取图片
    static get_image (k) {
        return DataStore.get_instance().resource.get(k)
    }
}