import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * 当前播放歌曲
     */
    playAudio:{}
  },
  mutations: {
    setPlayAudio(state,playAudioStr){
      state.playAudio=playAudioStr;
    },
  },
  actions: {

  }
})
