<template>
  <div id="app">
    <canvas id="game" :width="canvas_width" :height="canvas_height"></canvas>
    <!-- <img :src="pen" alt=""> -->
  </div>
</template>

<script>
import {Manager} from './js/manager.js'

export default {
  name: 'app',
  data () {
      return {
        pen: '../static/image/pie_up.png'
      }
  },
  computed: {
    canvas_width () {
      return document.documentElement.clientWidth
    },
    canvas_height () {
      return document.documentElement.clientHeight
    }
  },
  mounted () {
    Manager.getInstance()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#game {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
