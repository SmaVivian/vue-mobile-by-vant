<template>
  <div class="home">
    <div class="clearfix">
      <p class="test-rem" @click="changeUserState('vivi')">测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度测试修改状态及rem自适应宽度</p>
      <p class="test-rem">2</p>
      <p class="test-rem" style="margin-right:0;">3</p>
    </div>

    <div>
      这里是首页 <span>用户状态：{{aaa}}</span>
      <van-button type="default" size="small" @click="handleClick">默认按钮</van-button>
    </div>
    
  </div>
</template>

<style lang="less" scoped>
  @import '~@/assets/css/mixin.less';
  .home {
    padding: 20px;
    font-size: 14px;
  }
  .test-rem {
    width: 109px;
    float: left;
    margin-right: 4px;
    background: #84d5da;
    font-size: @title;
    #f-radius(5px);
    // #f-textoverflow(2);
  }
</style>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    aaa() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    changeUserState(info) {
      console.log(info)
      this.$store.dispatch('setUserIfo', info)
    },
    handleClick() {
      this.$toast('Hello world!')  // 测试mint-ui
    },
    getData() {
      this.$http.get('/list', {
        
      }).then(response => {
        console.log('data:', response)
      }, error => {
        console.log('异常');
      })

      // this.$http.get('/stp-web/route/list', {
      //   keyWord: '',
      //   orderType: 0,
      //   orderName: 1,
      //   scenicSpot: '',
      //   currentPageNo: 1,
      //   pageSize: 10,
      //   travelDays: '',
      //   searchPriceMax: '',
      //   searchPriceMin: '',
      //   hotelStar: '',
      //   startDate: ''
      // }).then(response => {
      //   console.log('data:', response);
      // }, error => {
      //   console.log('异常');
      // })
    }
  },
  mounted() {
    this.getData()
  },
  created() {
      
  },
}
</script>
