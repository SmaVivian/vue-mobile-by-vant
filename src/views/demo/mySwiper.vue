<template>
  <div class="page-swiper">
    <div>vant内置轮播：</div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>

    <div>插件vue-awesome-swiper轮播：</div>
    <div class="swiper-box">
      <swiper :options="swiperOption" v-if="images.length" class="swiper">
        <!-- slides -->
        <swiper-slide class="swiper-slide" v-for="(item, index) in images" :key="index">
          <div class="item-img">
            <img :src="item" alt="">
            <div class="b"></div>
          </div>
        </swiper-slide>
      </swiper>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </div>

    <!-- 最新展览 start -->
    <div class="content-wrap content-wrap-exhibition">
      <div class="g-title" flex="dir:left main:justify cross:center">
        <h1>最新展览</h1>
        <router-link tag="span" to="/display" flex="dir:left cross:center">全部 {{dataExhibition.count}} <i class="icon-more"></i></router-link>
      </div>

      <swiper :options="swiperOption1" v-if="dataExhibition.listData.length" class="swiper swiper-container slide-wrap-exhibition" ref="mySwiper1">
        <swiper-slide class="swiper-slide" v-for="(item, index) in dataExhibition.listData" :key="index">
          <div class="slide-item">
            <img :src="item.pictureId" alt="" :onerror="defaultImg">
            <div class="slide-content">
              <p class="content ell">{{item.headline}}</p>
              <span class="des">{{item.orgName}}</span>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="g-no-data" v-if="dataExhibition.listData.length === 0 && !isLoading">
        <div class="no-data-bg"></div>
      </div>
    </div>
    <!-- 最新展览 end -->

    <!-- 最热活动 start -->
    <div class="content-wrap content-wrap-activity">
      <div class="g-title" flex="dir:left main:justify cross:center">
        <h1>最热活动</h1>
        <router-link tag="span" to="/activity" flex="dir:left cross:center">全部 {{dataActivity.count}} <i class="icon-more"></i></router-link>
      </div>

      <swiper :options="swiperOption2" v-if="dataActivity.listData.length" class="swiper swiper-container slide-wrap-activity" ref="mySwiper2">
        <swiper-slide class="swiper-slide" v-for="(item, index) in dataActivity.listData" :key="index">
          <router-link tag="div" :to="{path: '/list/pulldown/detail', query: {id: item.id}}" class="slide-item">
            <img :src="item.picUrl" alt="" :onerror="defaultImg">
            <p flex="dir:left main:justify">
              <span class="des ell">{{item.activityName}}</span>
              <span class="time">{{item.activityStartDate}}</span>
            </p>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="g-no-data" v-if="dataActivity.listData.length === 0 && !isLoading">
        <div class="no-data-bg"></div>
      </div>
    </div>
    <!-- 最热活动 end -->
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.min.css'

const swiperOpt = {
  height: 380,
  speed: 500,//切换速度
  watchOverflow: true, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
  loop: true,//开启循环模式
  slidesPerView: 1,
  spaceBetween: 30,
  preventClicksPropagation: true,//阻止click冒泡。拖动Swiper时阻止click事件。
}

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    let vm = this
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-box .swiper-pagination',
        },
        on: {
          touchEnd: function (event) {
            //你的事件
          },
        }
      },
      swiperOption1: {
        // ...swiperOpt,
        effect: 'coverflow',
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true,
        },
        // observer:true,//修改swiper自己或子元素时，自动初始化swiper
        // observeParents:true,//修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: '.slide-wrap-exhibition .swiper-pagination',
        },
        on: {
          click: function() {
            vm.handleClickSlide(this.realIndex) 
          },
          touchEnd: function (event) {
            //你的事件
          },
        }
      },
      swiperOption2: {
        ...swiperOpt,
        pagination: {
          el: '.slide-wrap-activity .swiper-pagination',
        },
        on: {
          touchEnd: function (event) {
            //你的事件
          },
        }
      },
      
      images: [
        'http://123.59.106.171:51100/tianjin/publish/img/2018-12-18/1f630f3958f144aa9442adf1d300d082.jpg',
        'http://123.59.106.171:51100/tianjin/publish/img/2018-12-18/51fc235e49bb400b9b4c90ba7bd351f9.jpg',
        'http://123.59.106.171:51100/tianjin/publish/img/2018-12-18/bc8e659ed04d45a9852b48cd642bda8d.jpg'
      ],

      isLoading: false,
      defaultImg: this.$store.getters.defaultImg,
      dataExhibition: {
        count: '',
        listData: []
      },
      dataActivity: {
        count: '',
        listData: []
      },
    }
  },
  computed: {
    swiper() {
      debugger
      return this.$refs.mySwiper1.swiper
      return this.$refs.mySwiper2.swiper
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      this.$http.get('/getSwiper', {
       
      }).then(res => {
        this.isLoading = false
        if(res.success) {
          let data = res.data
          this.dataExhibition.listData = data.newSpreadtrum  // 最新展览
          this.dataActivity.listData = data.activityList.data    // 最热活动

          this.dataExhibition.count = data.countSpreadtrum  // 最新展览
          this.dataActivity.count = data.countActivity    // 最热活动

        } else {
          this.$toast(res.data || '服务器异常')
        }
      }, error => {
        this.isLoading = false
      })
    },
    handleClickSlide(index) {
      this.$router.push({path: '/list/pulldown/detail', query: {id: this.dataExhibition.listData[index].id}})
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.page-swiper {
  font-size: 16px;
  line-height: 30px;
  padding: 20px 0;
  .swiper-box {
    img {
      width: 100%;
    }
  }
  .content-wrap {
    padding: 0 20px;
    margin-bottom: 40px;
  }
  .icon-more {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    margin-left: 5px;
    margin-top: 2px;
  }
  .content-wrap-exhibition {
    margin-top: 40px;
    padding: 0;
    min-height: 200px;
    position: relative;
    .g-title {
      padding: 0 20px;
    }
    .swiper-container {
      width: 100%;
      .swiper-slide {
        width: 300px;
        padding-bottom: 6px;
      }
    }
    .slide-item {
      position: relative;
      width: 300px;
      box-shadow: 0px 4px 6px rgba(234,234,234,1);
      border-radius: 15px;
      img {
        width: 100%;
        height: 200px;
        border-radius: 15px 15px 0 0;
      }
      .slide-content {
        padding: 10px 20px;
        .content {
          font-size: 15px;
          line-height: 20px;
          font-weight: bold;
          color: #666;
        }
        .des {
          margin-top: 5px;
          color: #B9B9B9;
          font-size: 14px;
          font-weight: 400;
          line-height: 18px;
        }
      }
    }
  }
  .content-wrap-activity {
    min-height: 200px;
    position: relative;
    .swiper-container {
      padding-bottom: 10px;
      .swiper-pagination {
        position: absolute;
        bottom: 30px;
      }
    }
    .slide-wrap-activity {
      box-shadow: 0px 4px 6px rgba(234,234,234,1);
      border-radius: 15px;
      img {
        width: 100%;
        height: 180px;
        border-radius: 15px 15px 0 0;
      }
      p {
        padding: 10px 10px 54px;
        .des {
          color: #666;
          font-size: 15px;
          font-weight: bold;
          line-height: 50px;
          height: 50px;
        }
        .time {
          color: #B9B9B9;
          font-size: 14px;
          font-weight: 400;
          line-height: 18px;
        }
      }
    }
  }
}
.van-swipe-item img {
  width: 100%;
  height: 200px;
}
</style>

<style lang="less">
.page-swiper {
  .swiper-pagination {
    .swiper-pagination-bullet {
      width: 10px;
      height: 4px;
      background: rgba(216,216,216,1);
      border-radius: 2px;
    }
    .swiper-pagination-bullet-active {
      width: 25px;
      height: 4px;
      background: linear-gradient(54deg,rgba(128,226,255,1) 0%,rgba(72,165,255,1) 100%);
      border-radius: 2px;
    }
  }
  .swiper-container-3d .swiper-slide-shadow-bottom,
  .swiper-container-3d .swiper-slide-shadow-left,
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-top {
    border-radius: 15px;
  }
}
</style>


