<template>
<!-- 下拉刷新Demo -->
  <div class="page-list-tabs">
    <van-tabs class="tabs">
      <van-tab :title="list[0].title">
        <van-pull-refresh
          v-model="list[0].refreshing"
          @refresh="onRefresh(0)">
          <van-list
            v-model="list[0].loading"
            :finished="list[0].finished"
            :finished-text="(list[0].items.length === 0 && !list[0].loading) ? '' : '没有更多了'"
            @load="onLoad(0)">
            <router-link tag="div" 
              v-for="item in list[0].items"
              :to="{path: '/list/pulldown/detail', query: {id: item.id}}"
              :key="item.id">
              <van-cell :title="item.title"/>
            </router-link>
          </van-list>
        </van-pull-refresh>

        <div class="g-no-data" v-if="list[0].items.length === 0 && !list[0].loading">
          <div class="no-data-bg"></div>
        </div>
      </van-tab>

      <van-tab :title="list[1].title">
        <van-pull-refresh
          v-model="list[1].refreshing"
          @refresh="onRefresh(1)">
          <van-list
            class="m-list-wrap"
            v-model="list[1].loading"
            :finished="list[1].finished"
            :finished-text="(list[1].items.length === 0 && !list[1].loading) ? '' : '没有更多了'"
            @load="onLoad(1)">
            <router-link tag="div" class="m-list" flex="dir:left cross:center" 
              v-for="(item, index) in list[1].items" 
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

        <div class="g-no-data" v-if="list[1].items.length === 0 && !list[1].loading">
          <div class="no-data-bg"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        title: 'tab1样式',
        items: [],
        refreshing: false,
        loading: false,
        finished: false,
        size: 15,
        currentPage: 0,
      }, {
        title: 'tab2样式',
        items: [],
        refreshing: false,
        loading: false,
        finished: false,
        size: 15,
        currentPage: 0,
      }]
    }
  },
  methods: {
    onLoad(index) {
      this.list[index].currentPage++
      this.getData(index)
    },
    getData(index) {
      let _list = this.list[index];
      setTimeout(()=>{
        // this.$http.get("/list/nodata", {
        this.$http.get("/list", {
          type: index,  // 类型
          size: _list.size,
          currentPage: _list.currentPage
        }).then(res => {
          if(res.success) {
            let data = res.data.list
            _list.loading = false
            _list.finished = _list.currentPage >= res.data.page.totalPage ? true : false

            _list.items = _list.currentPage === 1 ? data : _list.items.concat(data)
          } else {
            
          }
        }, error => {
          console.log('异常')
        })
      }, 500)
    },
    onRefresh(index) {
      let _list = this.list[index];
      setTimeout(() => {
        _list.currentPage = 0
        _list.refreshing = false
        _list.finished = false
        this.onLoad(index)
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