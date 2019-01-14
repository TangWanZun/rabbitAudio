<template>
  <div class="home">
    <md-toolbar>
      <h2 class="md-subheading page-title" style="flex: 1">{{playAudio.song_name||'rabbitAudio'}}</h2>
      <md-button class="md-icon-button" @click="search">
        <img class="app-filter-btow" src="@/assets/icon/ss.svg" alt srcset>
      </md-button>
    </md-toolbar>
    <div class="page-img" :style="{'backgroundImage':'url('+playAudio.img+')'}"></div>
    <div class="page-con">
      <div class="top-item page-con-top">
        <md-button class="md-icon-button">
          <img class=" app-filter-btow" src="@/assets/icon/xz.svg" alt>
        </md-button>
        <md-button class="md-icon-button">
          <div class="md-title">词</div>
        </md-button>
      </div>
      <div class="top-item page-con-center">
        <div class="page-rong"></div>
        <div class="page-rong-text">
          <div>00:00</div>
          <div>{{playAudio.timelength|timeToDate}}</div>
        </div>
      </div>
      <div class="top-item page-con-bottom">
        <md-button class="md-icon-button page-con-bottom-item app-filter-btow">
          <img src="@/assets/icon/xh.svg" alt>
        </md-button>
        <md-button class="md-icon-button page-con-bottom-item app-filter-btow app-rotate-180">
          <img src="@/assets/icon/xs.svg" alt>
        </md-button>
        <md-button class="md-fab page-con-bottom-item page-con-play ">
          <img src="@/assets/icon/bf_2.svg" class="app-filter-btow" alt>
        </md-button>
        <md-button class="md-icon-button page-con-bottom-item app-filter-btow">
          <img src="@/assets/icon/xs.svg" alt>
        </md-button>
        <md-button class="md-icon-button page-con-bottom-item app-filter-btow">
          <img src="@/assets/icon/gdlb.svg" alt>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { pad } from "../sdk.js";
export default {
  name: "home",
  components: {},
  computed: {
    playAudio() {
      return this.$store.state.playAudio;
    }
  },
  filters: {
    timeToDate(val) {
      if (!val) {
        return "00:00";
      }
      let s = parseInt(val / 1000);
      let m = parseInt(s / 60);
      let xS = s % 60;
      return `${pad(m, 2)}:${pad(xS, 2)}`;
    }
  },
  mounted() {
    // this.$alert();
    // console.log(this.$store.state.playAudio);
  },
  methods: {
    /**
     * 进入搜索页面
     */
    search() {
      this.$router.push("/search");
    }
  }
};
</script>

<style scoped lang="less">
.page-img {
  width: 75vw;
  height: 75vw;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  background-color: rgb(87, 87, 87);
  background-size: 100% 100%;
}
// 标题
.page-title {
  white-space: nowrap;
  width: ~"calc( 100vw - 60px )";
  overflow: hidden;
  text-overflow: ellipsis;
}
.page-con {
  box-sizing: border-box;
  height: ~"calc( 100vh - 76px - 75vw)";
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  & > div {
    flex-grow: 1;
  }
  .top-item {
    padding: 0 15px;
  }
  // 按钮功能
  .page-con-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    >button{
      margin:0 10px;
    }
  }
  // 进度条
  .page-con-center {
    padding: 0 15px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      width: 100%;
    }
    .page-rong {
      height: 2px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
    }
    .page-rong-text {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      color: white;
      font-size: 13px;
    }
  }
  // 控制
  .page-con-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .page-con-bottom-item {
      img {
        width: 20px;
        height: 20px;
      }
    }
    // 播放按钮
    .page-con-play {
      img {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
    }
  }
}
</style>
