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
        name="value"
        v-validate="'required|max:5'"
        :error="errors.has('value')"
        :error-message="errors.first('value')"
      />

      <van-field
        v-model="username"
        label="用户名"
        placeholder=""
        clearable
        icon="question-o"
        @click-icon="$toast('question')"
      />
      
      <van-field
        v-model="email"
        label="邮箱"
        placeholder=""
        required
        name="email"
        v-validate="'required|email'"
        :error="errors.has('email')"
        :error-message="errors.first('email')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder=""
        required
        name="password"
        v-validate="'required|password'"
        :error="errors.has('password')"
        :error-message="errors.first('password')"
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
        placeholder="请输入用户名"
        error
        required
      />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        required
        name="phone"
        v-validate="'required|phone'"
        :error="errors.has('phone')"
        :error-message="errors.first('phone')"
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
        placeholder="">
        <van-button
          slot="button"
          size="small"
          type="primary">
          发送验证码
        </van-button>
      </van-field>

      <van-field
        center
        v-model="dateStr"
        label="时间选择"
        placeholder=""
        disabled>
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="openDatePicker">
          选择
        </van-button>
      </van-field>

      <van-button type="primary" @click="save">保存</van-button>

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
  </div>
</template>

<script>
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
      currentDate: new Date()
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
    save() {
      this.$validator.validateAll().then((result) => {
        console.log(result)
        if(result){
          // ...
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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

