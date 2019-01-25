# mobile-project

> a vue mobile project

## 框架说明
- [vue] https://cn.vuejs.org/
- [vant] https://youzan.github.io/vant
- [vuex] https://vuex.vuejs.org/zh/guide/
- [axios] https://www.kancloud.cn/yunye/axios/234845
- [rem布局] postcss-pxtorem插件 + plugins/rem.js
<!-- [rem布局] https://github.com/amfe/article/issues/17 (如设计图宽为375px,则设置1rem=37.5px) -->
- [less] https://less.bootcss.com/
- [Normalize.css] https://www.jianshu.com/p/9d7ff89757fd (CSS reset的替代方案)
- [flex.css] https://github.com/lzxb/flex.css/blob/master/docs/zh-ch.md (移动端快速布局)
- [vee-validate] https://baianat.github.io/vee-validate/examples/ (表单校验)

关于less
- [混合引入]      @import '~@/assets/css/mixin.less';
- [图片路径引入]  "~@images/demo/icon-qq.png"

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
