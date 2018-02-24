import {DataStore} from './base/data_store.js'

export class Director {

    constructor () {
        console.log('导演创建完毕')
        // 叫数据管理器滚过来
        this.data_store = DataStore.get_instance()
        this.is_game_start = true  
        this.timer = null 
    }

    static getInstance () {
        if(!Director.instance){
            Director.instance = new Director()
        }
        return Director.instance
    }
    
    draw_pipe () {
        let pipe_list = this.data_store.get('pip')
        if(pipe_list[0].image_x<-pipe_list[0].image_w){
            pipe_list.shift()
            pipe_list.shift()
        }
        if(pipe_list[0].image_x<window.innerWidth/2&&pipe_list.length==2){
            this.data_store.get('manager').add_2_pipe()
        }
        this.data_store.get('pip').map(item=> {
            item.draw_pic()
        })
    }

    is_collide (a, b) {
        let is_collide = false
        // 如果a和b没有发生碰撞,return false
        if(
            a.top>b.bottom||
            a.left>b.right||
            a.bottom<b.top||
            a.right<b.left
        ){
            return false
        }else{
            return true
        }
    }

    check () {
        let bird = this.data_store.get('bird')
        let land = this.data_store.get('land')
        let pip = this.data_store.get('pip')
        let score = this.data_store.get('score')
        // 确保演员在画布之内
        if(bird.image_y<0){
            bird.image_y = 0
        }
        // 如果和地面发生碰撞游戏结束
        if(bird.image_y>window.innerHeight-land.image_h-24){
            this.is_game_start = false
        }
        // 如果和pipe发生碰撞,那么游戏结束
        let bird_border = {
            'top': bird.image_y,
            'bottom': bird.image_y+bird.image_h,
            'left': bird.image_x,
            'right': bird.image_x+bird.image_w
        }
        this.data_store.get('pip').map(item=> {
            let pipe_border = {
                'top': item.image_y,
                'bottom': item.image_y+item.image_h,
                'left': item.image_x,
                'right': item.image_x+item.image_w
            }
            let is_collide = this.is_collide(bird_border, pipe_border)
            if(is_collide){
                this.is_game_start = false
            }
        })
        // 当第一个pipe越过小鸟时
        if(bird.image_x>pip[0].image_x+pip[0].image_w&&pip[0].is_over_bird==false){
            pip[0].is_over_bird = true
            score.number++
        }
    }

    run_action () {
        this.check()
        if(this.is_game_start){
            console.log('playing')
            this.data_store.get('background').draw_pic()
            this.draw_pipe()
            this.data_store.get('land').draw_pic()
            this.data_store.get('bird').draw_pic()
            this.data_store.get('score').draw_text()
            this.timer = requestAnimationFrame(()=> this.run_action())
        }else{
            console.log('游戏结束')
            cancelAnimationFrame(this.timer)
            this.data_store.get('start_button').draw_pic()
        }

    }
}