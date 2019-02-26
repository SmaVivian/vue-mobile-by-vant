import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {
      
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: () => import('@/views/demo/index'),
      meta: { }
    },
    {
      path: '/demo',
      name: 'DemoList',
      component: () => import('@/views/demo/demoList'),
      meta: {rank: 1 }
    },
    {
      path: '/list/infinite',
      name: 'ListInfinite',
      component: () => import('@/views/demo/listInfinite'),
      meta: {rank: 2 }
    },
    // 缓存组件示例start
    {
      path: '/list/pulldown',
      name: 'ListPullDown',
      component: () => import('@/views/demo/listPullDown'),
      meta: {rank: 2 }
    },
    {
      path: '/list/pulldown/detail',
      name: 'ListPullDownDetail',
      component: () => import('@/views/demo/listPullDownDetail'),
      meta: {rank: 3 }
    },
    // 缓存组件示例end
    {
      path: '/list/tab',
      name: 'ListTab',
      component: () => import('@/views/demo/listTab'),
      meta: { rank: 2 }
    },
    {
      path: '/demo/form',
      name: 'DemoForm',
      component: () => import('@/views/demo/form'),
      meta: { }
    },
    {
      path: '/demo/login',
      name: 'DemoLogin',
      component: () => import('@/views/demo/login'),
      meta: { }
    },
    {
      path: '/demo/myCmp',
      name: 'DemoMyCmp',
      component: () => import('@/views/demo/myCmp'),
      meta: { }
    },
    {
      path: '/demo/swiper',
      name: 'DemoSwiper',
      component: () => import('@/views/demo/mySwiper'),
      meta: { }
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
