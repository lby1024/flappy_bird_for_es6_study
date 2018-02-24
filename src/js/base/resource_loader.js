// 加载图片资源

import {resource} from './resource.js'

export class ResourceLoader {
    
    constructor(){
        console.log('资源加载器创建完毕')
        // 1: 利用数据resource生成map对象
        this.map = new Map(resource)
        // 2: 遍历map对象,改变map对象的value值
        //        {
        //          'image1': src图片地址,
        //          'image2': src图片地址, 
        //          ...
        //         }
        // 变成==> {
        //          'image1': image对象,
        //          'image2': imag对象, 
        //          ...
        //          }
        for (let [k, v] of this.map) {
            let image = new Image()
            image.src = v
            this.map.set(k, image)
        }
    }

    onloaded(callback){
        let count = 0
        for (let [key, value_pic] of this.map) {
            value_pic.onload = ()=> {
                count++
                if(count==this.map.size){
                    console.log('图片资源加载完毕')
                    callback(this.map)
                }
            }
        }
    }
}