<template>
<!-- 下拉刷新Demo -->
  <div class="page-list-infinite">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh">
      <van-list
        class="m-list-wrap"
        v-model="loading"
        :finished="finished"
        :finished-text="(dataList.length === 0 && !loading) ? '' : '没有更多了'"
        @load="onLoad">
        <router-link tag="div" class="m-list" flex="dir:left cross:center" 
          v-for="(item, index) in dataList" 
          :to="{path: '/list/pulldown/detail', query: {id: item.id}}"
          :key="item.id">
          <img v-lazy="item.picUrl" :src="item.picUrl || ''" alt="">
          <div class="content" flex="dir:top">
            <p class="ell">{{item.title}}</p>
            <p>...</p>
          </div>
        </router-link>
      </van-list>
    </van-pull-refresh>

    <div class="g-no-data" v-if="dataList.length === 0 && !loading">
      <div class="no-data-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      refreshing: false,
      loading: false,
      finished: false,

      size: 15,
      currentPage: 0
    }
  },
  methods: {
    onLoad() {
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

            this.dataList = this.currentPage === 1 ? data : this.dataList.concat(data)
          } else {
            
          }
        }, error => {
          console.log('异常')
        })
      }, 500)
    },
    onRefresh() {
      setTimeout(() => {
        this.currentPage = 0
        this.refreshing = false
        this.finished = false
        this.onLoad()
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
  .m-list-wrap {
    font-size: 16px;
    .m-list {
      height: 80px;
      border-bottom: solid 1px #ececec;
      img {
        width: 100px;
        height: 100%;
      }
      img[lazy=loading] {
        width: 100px;
        height: 100%;
        // background: #ececec;
      }
      .content {
        padding-left: 10px;
        width: 260px;
      }
    }
  }
</style>