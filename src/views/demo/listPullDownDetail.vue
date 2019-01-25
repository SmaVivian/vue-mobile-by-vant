<template>
  <div class="demo-detail">
    <h1>{{dataDetail.title}}</h1>
    <div v-html="dataDetail.detailContent"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataDetail: ''
    }
  },
  methods: {
    getData() {
      this.$http.get('/detail', {
        id: this.$route.query.id
      }).then(res => {
        console.log('data2:', res);
        this.dataDetail = res.data;
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="less">
  .demo-detail { 
    img {
      max-width: 100%;
    }
  }
</style>

<style lang="less" scoped>
  .demo-detail {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    
    h1 {
      color: #000;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
    }
  }
</style>

