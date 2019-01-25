<template>
  <div class="page-swiper4">
    <div class="swiper-box">
      <!-- swiper -->
      <swiper :options="swiperOption" ref="swiperUl">
        <swiper-slide v-for="(item, index) in dataList" :key="item.id">
          <!-- <a @click="swiperTo(item,index)"><span>{{item.saleCatgName}}</span></a> -->
          <div class="slide-item">
            <img :src="item.pictureId" alt="" :onerror="defaultImg">
            <div class="slide-content">
              <p class="content ell">{{item.headline}}</p>
              <span class="des">{{item.orgName}}</span>
            </div>
          </div>
        </swiper-slide>

        <div class="pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop : true,
        autoplay: 3000,
        pagination: '.pagination'
      },
      defaultImg: this.$store.getters.defaultImg,
      dataList: []
    }
  },
  methods: {
    getData() {
      this.$http.get(this.$staticUrl+'/data/swiper.json', {
        
      }).then(res => {
        if(res.success === 1) {
          console.log(res)
          let data = res.data;
          this.dataList = data.newSpreadtrum;  // 最新展览
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  .slide-item {
    position: relative;
    width: 300px;
    box-shadow: 0px 0.2rem 0.3rem rgba(234,234,234,1);
    border-radius: .75rem;
    img {
      width: 100%;
      height: 200px;
      border-radius: .75rem .75rem 0 0;
    }
    .slide-content {
      padding: .5rem 1rem;
      .content {
        font-size: 0.75rem;
        line-height: 1.05rem;
        font-weight: bold;
        color: #666;
      }
      .des {
        margin-top: .25rem;
        color: #B9B9B9;
        font-size: .65rem;
        font-weight: 400;
        line-height: .9rem;
      }
    }
  }
</style>


