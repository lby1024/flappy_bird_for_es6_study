import {ResourceLoader} from './base/resource_loader.js'
import {Director} from './director.js'
import {DataStore} from './base/data_store.js'
import {Background} from './runtime/background.js'
import {Land} from './runtime/land.js'
import {Pip_up} from './runtime/pip_up.js'
import {Pip_down} from './runtime/pip_down.js'
import {Bird} from './player/bird.js'
import {StartButton} from './player/start_button.js'
import {Score} from './player/score.js'

export class Manager {

    static getInstance () {
        if(!Manager.instance){
            Manager.instance = new Manager()
        }
        return Manager.instance
    }
    // 1: 生成数据加载对象 并自动加载图片资源(constructor)
    // 2: 当图片资源加载完成后, ............?
    constructor () {
        console.log('管理者创建完毕')
        // 获取画布
        this.game_canvas = document.getElementById('game')
        // 创建画笔
        this.pen = this.game_canvas.getContext('2d')
        // 1: 生成数据加载对象
        // => 自动加载图片资源(constructor) 并保存在map对象image_data里面
        // => image_data == {'background': 图片obj, 'bird': 图片obj, ...}
        // => 图片obj == { 'src': 图片地址, ...}
        const resource_loader = new ResourceLoader()
        // 2: 当图片资源加载完成后,............?
        // => image_data == {'background': 图片obj, 'bird': 图片obj, ...} == map对象
        resource_loader.onloaded(image_data=> this.resource_first_loaded(image_data))
        // 3: 召唤导演
        this.game_director = Director.getInstance()
        // 4: 创建数据缓存器
        this.data_store = DataStore.get_instance()

    }
    // 往缓存器里写数据
    resource_first_loaded (map) {
        // 将数据存入数据缓存器
        this.data_store.pen = this.pen
        this.data_store.resource = map
        this.data_store.land_speed = 2
        // 游戏初始化
        this.init()
    }

    // 招聘pipe扮演者
    add_2_pipe () {
        let min_top = window.innerHeight/6
        let max_top = window.innerHeight/2
        let top = Math.random()*(max_top-min_top) + min_top
        this.data_store.get('pip').push(new Pip_up(top))
        this.data_store.get('pip').push(new Pip_down(top))
    }

    register_event () {
        this.game_canvas.addEventListener('touchstart', event=> {
            if(this.game_director.is_game_start){
                // 阻止冒泡
                event.stopPropagation()
                this.data_store.get('bird').v = - 3
            }else{
                this.game_director.is_game_start = true
                this.init()
            }
        })
    }

    init () {
        this.data_store.destroyed()
        this.data_store.put('background', new Background())
                       .put('land', new Land()) 
                       .put('pip', [])
                       .put('manager', Manager.getInstance())
                       .put('bird', new Bird())
                       .put('director', this.game_director)
                       .put('start_button', new StartButton())
                       .put('score', new Score())
        this.add_2_pipe()
        this.register_event()
        this.game_director.run_action()
    }
}