# vue-mobile-by-vant

> [vue-mobile-by-vant]主要实现移动端H5页面一些基础的业务代码，基于 [vue](https://github.com/vuejs/vue) 和 [vant](https://youzan.github.io/vant/#/zh-CN/intro)实现。

## 功能

- 登录

- 列表
  - 无限加载
  - 列表下拉刷+图片懒加载
  - tab列表

- 详情

- 表单

- 自定义组件（收藏、计数器、Marquee跑马灯）

- 轮播

- 组件缓存（`keep-alive`向前清除缓存、返回不清除缓存）首页->列表->详情：清除缓存  详情->列表：不清除缓存 

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

## 效果演示

![img](https://github.com/SmaVivian/vue-mobile-by-vant/blob/master/src/assets/vueVant.gif)

## 安装依赖

npm i

## 项目启动

npm run dev

## 项目打包

npm run build
