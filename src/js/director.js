import {Store} from './store.js'
import {Background} from './actor/background.js'
import {Land} from './actor/land.js'
import {Bird} from './actor/bird.js'
import {Flash} from './actor/flash.js'
import {Pipe} from './actor/pipe.js'
import {Score} from './actor/score.js'
import {StartBtn} from './actor/start_btn.js'

export class Director {
    constructor () {
        this.store = Store.sington()
        this.bind_event()
    }
    static sington () {
        if(!Director.obj){
            Director.obj = new Director()
        }
        return Director.obj
    }

    init () {
         // 所有演员会到最初站位==>>数据初始化
         this.store.action_number = 0
         this.store.score = 0
         this.store.can_play_music = true
         this.store.clear_actor()    // 清空之前的数据
         this.store.put_actor('background', new Background())
                   .put_actor('land', new Land())
                   .put_actor('bird', new Bird())
                   .put_actor('flash', new Flash())
                   .put_actor('pipe', [])
                   .put_actor('score', new Score())
                   .put_actor('start_btn', new StartBtn())  
 
         this.store.get_actor('pipe').push(new Pipe())
    }
    // 检查管道的添加或者删除
    check_pipe_list () {
        let pipe = this.store.get_actor('pipe')[0]
        // 当第一个pipe走到屏幕一半时,就往pipe_list里面添加一个管道
        if(pipe.image_x<this.store.canvas.width/2-pipe.image_w){
            if(pipe.can_add_pipe){
                pipe.can_add_pipe = false
                this.store.get_actor('pipe').push(new Pipe())
            }
        }
        // 当管道走出屏幕是就消失
        if(pipe.image_x<-pipe.image_w){
            this.store.get_actor('pipe').shift()
        }
    }
    action () {
        switch(this.store.action_number){
            case 0:
                this.store.get_actor('background').render_and_update()
                this.store.get_actor('land').render_and_update()
                this.store.get_actor('bird').render_update_action_0()
                this.store.get_actor('flash').render_and_update()
                break
            case 1:
                this.store.get_actor('background').render_and_update()
                this.store.get_actor('pipe').map(item=> {
                    item.render_and_update()
                })
                this.check_pipe_list()
                this.store.get_actor('land').render_and_update()
                this.store.get_actor('bird').render_update_action_1()
                this.store.get_actor('score').render()
                break
            case 2:
                this.store.get_actor('background').render()
                this.store.get_actor('pipe').map(item=> {
                    item.render()
                })
                this.store.get_actor('land').render()
                this.store.get_actor('bird').render_update_action_2()
                this.store.get_actor('score').render()
                this.store.get_actor('start_btn').render()
                break

        }
    }
    bind_event () {
        this.store.canvas.addEventListener('touchstart', event=> {
            switch(this.store.action_number){
                case 0:
                    let flash = this.store.get_actor('flash')
                    let top = flash.image_y
                    let bottom = flash.image_y+flash.image_h
                    let left = flash.image_x
                    let right = flash.image_x+flash.image_w
                    let x = event.touches[0].clientX;
                    let y = event.touches[0].clientY;
                    if( x>left&&x<right&&y>top&&y<bottom){
                        this.store.action_number = 1
                    }
                    break
                case 1:
                    let music_list = document.getElementsByClassName('music')
                    let n = parseInt(Math.random()*music_list.length)
                    let music = music_list[n]
                    music.play()
                    this.store.get_actor('bird').v = -3.3
                    break
                case 2:
                    let canvas_h = this.store.canvas.height
                    let land_h = this.store.clothes.get('land').height
                    let bird_h = this.store.get_actor('bird').image_h
                    let h = canvas_h-land_h-bird_h
                    if(this.store.get_actor('bird').image_y==h){
                        this.init()
                    }
                    break
            }
        })
    }

}