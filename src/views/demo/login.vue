<template>
  <div class="page-login">
    <div class="login" flex="dir:top">
      <div class="logo">
        <img src="@/assets/images/demo/logo.png" alt="">
      </div>
      <div class="item-wrap item-phone" flex="dir:left cross:center box:first">
        <i class="g-icon icon-person"></i>
        <input type="text" placeholder="手机号/用户名" v-model="phoneNo">
      </div>
      <div class="item-wrap item-password" flex="dir:left cross:center box:first">
        <i class="g-icon icon-pass"></i>
        <input placeholder="密码" :type="passType" v-model="pass" @keyup.enter="goLogin">
      </div>
    </div>
    <div flex="dir:left main:center">
      <a class="submit" href="javascript:;" :class="{enable: submitEnable}" @click="goLogin">登&nbsp;&nbsp;录</a>
    </div>
    <div class="mgt7" flex="dir:left main:justify">
      <router-link tag="span" to="/my/register?type=forget" class="">忘记密码</router-link>
      <router-link tag="span" to="/my/register?type=add" class="">创建账号</router-link>
    </div>

    <!-- 其他方式登录 start -->
    <div class="other-way">
      <div flex="dir:left main:center cross:center">
        <span class="line"></span>
        <span class="des">其他方式登录</span>
        <span class="line"></span>
      </div>
      <div flex="dir:left main:center">
        <div class="icon-box" flex="dir:left main:justify cross:center">
          <a href=""><i class="icon-wechat"></i></a>
          <a href=""><i class="icon-blog"></i></a>
          <a href=""><i class="icon-qq"></i></a>
        </div>
      </div>
    </div>
    <!-- 其他方式登录 end -->
  </div>
</template>

<script>
// import { Toast } from 'mint-ui';
import { validate } from '@/utils/util';
import md5 from 'js-md5';
export default {
  data() {
    return {
      phoneNo: '',
      pass: '',
      passType: 'password'
    }
  },
  // watch: {
  //   phoneNo(a,b) {
  //     console.log(a,b)
  //   }
  // },
  computed: {
    // 登录按钮是否可用
    submitEnable() {
      if(validate(this.phoneNo, 'phone') && this.pass) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goLogin() {
      this.$store.dispatch('LoginUser', {
        phone: this.phoneNo,
        password: md5(this.pass)
      })
      .then(() => {
        this.$router.push({ path: '/my'})
      }).catch(() => {
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/mixin.less';
  .page-login {
    width: 100%;
    height: 100%;
    padding: 50px 20px;
    background-size: cover;
    color: #666;
    font-size: 16px;
    font-weight:400;
    .login {
      .logo {
        margin: 20px auto 40px;
        img {
          width: 92px;
          height: 64px;
        }
      }
      .item-wrap {
        padding: 0 20px;
        height: 44px;
        background:rgba(241,241,241,1);
        border-radius: 22px;
        .icon-person {
          #f-bg(12px, 14px, "../images/demo/icon-person.png");
        }
        .icon-pass {
          #f-bg(12px, 14px, "../images/demo/icon-pass.png");
        }
        input {
          margin-left: 10px;
          display: inline-block;
          font-size: 16px;
          line-height: 24px;
          background: transparent;
          color: #666;
          &::-webkit-input-placeholder {
            color: #B9B9B9;
          }
          &:-moz-placeholder {
            color: #B9B9B9;
          }
          &:-ms-input-placeholder {
            color: #B9B9B9;
          }
        }
      }
      .item-password {
        margin-top: 20px;
      }
      .other-wrap {
        margin-top: 5px;
        i {
          display: inline-block;
          width: 75px;
          height: 75px;
          margin-right: 2px;
          background-size: contain;
          &.icon-sel-no {
            background-size: contain;
          }
        }
      }
    }
    .submit {
      width: 100%;
      text-align: center;
      margin-top: 44px;
      height:44px;
      line-height: 44px;
      background: #999;
      border-radius: 22px;
      color: #fff;
      font-size: 16px;
      &.enable {
        background:linear-gradient(126deg,rgba(72,165,255,1) 0%,rgba(129,226,255,1) 100%);
      }
    }
    .other-way {
      margin-top: 40px;
      .line {
        display: inline-block;
        width: 30px;
        height: 0;
        border-top: solid 1px #666;
      }
      .des {
        margin: 0 5px;
      }
      .icon-box {
        margin-top: 20px;
        width: 90px;
        i {
          display: inline-block;
          width: 32px;
          height: 32px;
        }
        .icon-wechat {
          // #f-bg-url("../images/demo/icon-wechat.png");
          #f-bg-url("~@images/demo/icon-wechat.png");
          background-size: contain;
        }
        .icon-blog {
          // #f-bg-url("../images/icon/icon-blog.svg");
          background-size: contain;
        }
        .icon-qq {
          #f-bg-url("~@images/demo/icon-qq.png");
          background-size: contain;
        }
      }
    }
  }
</style>


