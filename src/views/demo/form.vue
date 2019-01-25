<template>
  <div class="page-form">
    <div class="top">
      <img :src="avatarurl" alt="" :onerror="defaultHeadImg" @click="clickFile">
    </div>
    <input type="file" id="fileInput" style="display: none;" @change="triggerFile($event)" ref="filePicker">

    <van-cell-group>
      <van-field
        v-model="value"
        placeholder="基础用法"
      />

      <van-field
        v-model="username"
        label="用户名"
        placeholder=""
        clearable
        icon="question-o"
        required
        @click-icon="$toast('question')"
      />
      
      <van-field
        v-model="email"
        label="邮箱"
        placeholder=""
        required
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder=""
        required
      />

      <van-field
        value="输入框已禁用"
        label="用户名"
        left-icon="contact"
        disabled
      />

      <van-field
        v-model="username2"
        label="用户名"
        placeholder=""
        error
      />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder=""
        error-message="手机号格式错误"
      />

      <van-field
        v-model="message"
        label="高度自适应"
        type="textarea"
        placeholder=""
        rows="1"
        autosize
      />

      <van-field
        center
        clearable
        v-model="sms"
        label="短信验证码"
        placeholder=""
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
        >
          发送验证码
        </van-button>
      </van-field>

      <van-field
        v-model="dateStr"
        label="时间选择"
        placeholder=""
        disabled
      />
        <van-button type="primary" @click="openDatePicker">选择</van-button>
      </van-field>

      <van-popup v-model="showDate" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="showDate=false"
          @confirm="onConfirm"
        />
      </van-popup>

    </van-cell-group>

    <!-- <div class="g-form">
      <div class="top">
        <img :src="avatarurl" alt="" :onerror="defaultHeadImg" @click="clickFile">
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">详情</label>
          <i class="g-icon-more"></i>
        </div>
      </div>

      <div class="m-form-col">
        <div class="title">邮箱验证</div>
        <div class="control">
          <label class="label">邮箱</label>
          <input name="email" type="text" placeholder=""
            v-model="email" 
            v-validate="'required|email'" 
            class="border"
            :class="{'input': true, 'is-danger': errors.has('email') }">
          <i v-show="email" class="clear" @click="email=''">×</i>
          <i class="g-icon-more"></i>
        </div>
        <div v-show="errors.has('email')" class="help">{{ errors.first('email') }}</div>
      </div>

      <div class="m-form-col">
        <div class="title">账户</div>
        <div class="control">
          <label class="label">账户</label>
          <input name="name" type="text" placeholder=""
            v-model="name" 
            v-validate="'required|min:3|alpha'" 
            class="border"
            :class="{'input': true, 'is-danger': errors.has('name') }">
          <i v-show="name" class="clear" @click="name=''">×</i>
        </div>
        <div v-show="errors.has('name')" class="help">{{ errors.first('name') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">密码</label>
          <input v-model="password"  v-validate="'required|min:6'" type="password" name="password">
          <i v-show="password" class="clear" @click="password=''">×</i>
        </div>
        <div v-show="errors.has('password')" class="help">{{ errors.first('password') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">手机号</label>
          <input v-model="phone" v-validate="'required|phone'" type="text" name="phone">
          <i v-show="phone" class="clear" @click="phone=''">×</i>
        </div>
        <div v-show="errors.has('phone')" class="help">{{ errors.first('phone') }}</div>
      </div>

      <div class="m-form-col">
        <div class="control">
          <label class="label">生日</label>
          <span class="tri-name" @click="openPicker">{{birthday ? birthday : '请选择时间'}}</span>
          <i class="g-icon-more"></i>
        </div>
      </div>

      <div class="m-form-col">
        <div class="control t-area">
          <label class="label">文本域</label>
          <textarea name="" id="" cols="30" rows="5" ref="textarea"></textarea>
        </div>
      </div>

      <div class="m-form-col">
        <div class="control t-area">
          <label class="label">自适应高</label>
          <textarea name="" id="" cols="30" rows="1" ref="textarea"></textarea>
        </div>
      </div>
    </div>

    <mt-datetime-picker
      type="date"
      ref="picker"
      v-model="mytime"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      @confirm="handleConfirm"
      confirmText="确定"
      :startDate="startDate">
    </mt-datetime-picker>

    <input type="file" id="fileInput" style="display: none;" @change="triggerFile($event)" ref="filePicker"> -->
  </div>
</template>

<script>
// import Autosize from 'autosize' // 文本域高度自适应
import moment from 'moment'
export default {
  data() {
    return {
      defaultHeadImg: this.$store.getters.defaultHeadImg,
      avatarurl: '',  // 头像

      value: '',
      username: '',
      email: '',
      password: '',
      username2: '',
      phone: '',
      message: '',
      sms: '',

      dateStr: '',
      showDate: false,
      minDate: new Date(),
      maxDate: new Date(2023, 10, 1),
      currentDate: new Date(),


      
      // mytime: "",
      // startDate: new Date(new Date().getTime() + 24*60*60*1000),
      // name: '',
      // email: '',
      // password: '',
      // phone: '',
      // birthday: '',

      // handler:function(e){e.preventDefault();},
    }
  },
  methods: {
    clickFile() {
      // document.getElementById('fileInput').click();
      const event = new MouseEvent('click');
      this.$refs.filePicker.dispatchEvent(event);
    },
    triggerFile(e) {
      let vm = this;
      let deviceFile = e.target.files;
      let formData = new FormData();

      formData.append('file', deviceFile[0]);
      formData.append('userId', this.$store.getters.userid);
      formData.append('token', this.$store.getters.token);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$http.base({
        method: 'post',
        url: '/m/uploadHeadImage.do',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      }).then((response)=>{
        if(response.data.success==1) {
          vm.avatarurl = response.data.data
        } else if (response.data.success==999) {
          this.$common.confirmLogin()
        } else {
          this.$toast(response.data.data || '接口异常')
        }
      });
    },
    // 打开时间选择器
    openDatePicker() {
      this.showDate = true
    },
    onConfirm() {
      this.showDate = false
      this.dateStr = moment(this.currentDate).format('YYYY/MM/DD')
    },
    formatter(type, value) {
  　　if (type === 'year') {
    　　return `${value}年`;
  　　} else if (type === 'month') {
  　　  return `${value}月`
  　　} else if (type === 'day') {
    　　return `${value}日`
  　　} 
  　　return value;
　　},
  }
}
</script>

<style lang="less" scoped>
  // @import '~@/assets/css/form.less';

  .top {
    width: 100px;
    margin: auto;
    padding: 30px 0;
    img {
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
</style>

