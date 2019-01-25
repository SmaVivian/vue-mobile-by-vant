<template>
<!-- 列表无限加载Demo -->
  <div class="page-list-infinite">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="(dataList.length === 0 && !loading) ? '' : '没有更多了'"
      @load="onLoad">
      <router-link tag="div" 
        v-for="item in dataList"
        :to="{path: '/list/pulldown/detail', query: {id: item.id}}"
        :key="item.id">
        <van-cell :title="item.title"/>
      </router-link>
    </van-list>

    <div class="g-no-data" v-if="dataList.length === 0 && !loading">
      <div class="no-data-bg"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .m-list-wrap {
    .m-list {
      height: 4rem;
      border-bottom: solid 1px #ececec;
      img {
        width: 5rem;
        height: 100%;
      }
      .content {
        padding-left: .5rem;
      }
    }
  }
</style>

<script>
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      finished: false,

      size: 15,
      currentPage: 0
    }
  },
  methods: {
    onLoad() {
      this.$common.confirmLogin()  // 测试登录超时弹框

      this.currentPage++
      this.getData()
    },
    getData() {
      setTimeout(()=>{
        this.$http.get("/list", {
        // this.$http.get("/list/nodata", {
          size: this.size,
          currentPage: this.currentPage
        }).then(res => {
          if(res.success) {
            let data = res.data.list
            this.loading = false
            this.finished = this.currentPage >= res.data.page.totalPage ? true : false
            this.dataList = this.dataList.concat(data)
          } else {
            
          }
        }, error => {
          console.log('异常')
        })
      }, 500)
    }
  }
}
</script>

