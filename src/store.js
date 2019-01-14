import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * 当前播放歌曲
     */
    playAudio:{},
    /**
     * 当前歌曲查询框
     */
    queryInput:"",
    /**
     * 当前歌曲列表
     */
    queryList:[]
  },
  mutations: {
    setPlayAudio(state,playAudioStr){
      state.playAudio=playAudioStr;
    },
    setQueryInput(state,queryInputStr){
      state.queryInput = queryInputStr;
    },
    setQueryList(state,queryListStr){
      state.queryList = queryListStr
    }
  },
  actions: {

  }
})
