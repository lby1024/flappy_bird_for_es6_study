<template>
  <div>
    <canvas id="app"></canvas>
    <audio src="../static/music/a2.mp3" class="music"></audio>
    <audio src="../static/music/a3.mp3" class="music"></audio>
    <audio src="../static/music/a4.mp3" class="music"></audio>
    <audio src="../static/music/a7.mp3" class="music"></audio>
    <audio src="../static/music/a8.mp3" class="music"></audio>
    <audio src="../static/music/a9.mp3" class="music"></audio>
    <audio src="../static/music/a10.mp3" class="music"></audio>
    <audio src="../static/music/b3.m4a" class="music"></audio>
    <audio src="../static/music/b4.m4a" class="music"></audio>
    <audio src="../static/music/b5.m4a" class="music"></audio>
    <audio src="../static/music/hit.ogg" class="music2"></audio>
  </div>
</template>

<script>
import {Game} from './js/game.js'

export default {
  name: 'app',
  mounted () {
    Game.sington()
  }
}
</script>

<style>
#app {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
