<template>
  <div class="home">
    <div class="page-top">
      <md-field md-inline>
        <label>请输入查询歌曲或歌手</label>
        <md-input v-model="searchData"></md-input>
        <md-button @click="send" class="md-icon-button">
          <img class="app-filter-btow icon-img" src="@/assets/icon/ss.svg" alt srcset>
        </md-button>
      </md-field>
    </div>
    <div class="page-body">
      <mescroll-vue class="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <md-list class="md-triple-line">
          <div v-for="(item,index) in formData" :key="index">
            <md-list-item>
              <div class="md-list-item-text">
                <span>{{item.OriSongName}}</span>
                <span>{{item.FileName}}</span>
                <p>{{item.AlbumName}}</p>
              </div>
              <md-menu md-size="small" :md-offset-x="50">
                <md-button md-menu-trigger class="md-icon-button">
                  <img class="app-filter-btow icon-img" src="@/assets/icon/gd.svg" alt srcset>
                </md-button>
                <md-menu-content>
                  <md-menu-item class="has-ripple" @click="palye(item.FileHash)">
                    <img class="icon-img" src="@/assets/icon/bf.svg" alt srcset>
                    <span>播放</span>
                  </md-menu-item>
                  <md-menu-item class="has-ripple" @click="down(item.FileHash)">
                    <img class="app-filter-btow icon-img" src="@/assets/icon/xz.svg" alt srcset>
                    <span>下载</span>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-list-item>
            <md-divider></md-divider>
          </div>
        </md-list>
      </mescroll-vue>
    </div>
    <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
      <md-dialog-title>{{audioData.song_name}}</md-dialog-title>
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{audioData.author_name}}</div>
            <div class="md-subhead">{{audioData.album_name}}</div>
          </md-card-header-text>
          <md-card-media md-big>
            <img :src="audioData.img" alt="People">
          </md-card-media>
        </md-card-header>
        <md-card-actions>
          <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
          <md-button class="md-primary" :href="audioData.play_url">确定下载</md-button>
        </md-card-actions>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
// import { list } from "../config.js";
export default {
  name: "home",
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      // formData: list,
      formData:this.$store.state.queryList,
      searchData: "",
      showDialog: false,
      audioData: {},
      mescroll:{},
      mescrollDown: {},
      mescrollUp: {
        // 上拉加载的配置
        callback: this.upCallback,
        auto: false,
        page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 30, //每页数据条数,默认10
				}
      }
    };
  },
  created() {},
  methods: {
    /**
     * mescroll组件初始化的回调,可获取到mescroll对象
     */
    mescrollInit (mescroll) {
      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    /**
     * 上拉加载数据
     */
    upCallback(page, mescroll) {
      this.getList({
        page:page.num,
        pagesize:page.size
      })
        .then(res => {
          this.formData = this.formData.concat(res.lists);
          //更新到缓存中去
          this.$store.commit('setQueryList',this.formData);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endBySize(res.lists.length,res.total)
          })
        })
        .catch(error => {
          console.error(error);
        });
    },
    /**
     * 获取歌曲列表
     */
    getList(pro = {}) {
      let _this = this;
      return new Promise(function(resolve, reject) {
        //当没有进行传递值的时候函数不运行
        let dom = document.createElement("script");
        dom.src = `http://songsearch.kugou.com/song_search_v2?callback=rabbit&keyword=${
          _this.searchData
        }&page=${pro.page || 1}&pagesize=${pro.pagesize || 30}`;
        window.rabbit = response => {
          resolve(response.data);
          //删除script
          dom.remove();
        };
        document.body.appendChild(dom);
      });
    },
    /**
     * 搜索歌曲
     */
    send() {
      //数据清空
      this.formData = [];
      //重新获取数据
      this.mescroll.resetUpScroll( true );
    },
    /**
     * 根据hash获取歌曲的信息
     */
    hashData(hash) {
      function ajax(file) {
        this.xml = new XMLHttpRequest();
        var myxml = this.xml;
        var my = this;
        this.xml.onreadystatechange = function() {
          if (myxml.readyState == 4) {
            my.data = myxml.responseText;
          }
        };
        this.xml.open("get", file, false);
        this.xml.send(null);
      }
      return JSON.parse(new ajax(`/api?r=play/getdata&hash=${hash}`).data).data;
    },
    /**
     * 歌曲播放
     */
    palye(hash) {
      let data = this.hashData(hash);
      $audio.play(data.play_url);
      this.$store.commit("setPlayAudio", data);
    },
    /**
     * 下载
     */
    down(hash) {
      let data = this.hashData(hash);
      this.audioData = data;
      this.showDialog = true;
    }
  }
};
</script>

<style scoped lang="less">
.page-top {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  padding: 0 15px;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.8);
}
.mescroll {
  height: ~"calc( 100vh - 85px )";
}
.home {
  padding: 15px;
  padding-top: 0px;
  height: 100vh;
}
.icon-img {
  width: 20px;
  height: 20px;
}
.page-body {
  padding-top: 85px;
  height: 100vh;
}
</style>
