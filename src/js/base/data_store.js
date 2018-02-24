// 数据缓存器

export class DataStore {

    static get_instance () {
        if(!DataStore.instance){
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }

    constructor () {
        this.map = new Map()
    }

    put (k, v) {
        // if(typeof v=='function'){
        //     v = new v()
        // }
        this.map.set(k, v)
        // 返回原对象实现链式调用.put().put().put()
        return this
    }

    get (k) {
        return this.map.get(k)
    }

    destroyed () {
        for (let [k,v] of this.map) {
            v = null
        }
    }
}