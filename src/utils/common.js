// import { MessageBox, Toast } from 'mint-ui';
import { Dialog } from 'vant';

export const common = {
  confirmLogin: function(msg, closeOnClickOverlay) {
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容'
    }).then(() => {
      // on close
    });
    Dialog.confirm({
      title: '提示',
      message: msg || '登录超时，是否重新登录',
      closeOnClickOverlay: closeOnClickOverlay || true  // 点击遮罩是否关闭弹窗
    })
    .then(action => {
      location.href = '#/my/login';
      // this.$router.push({ path: '/my/login'});
    }).catch(() => {
      location.href = '#/';
    });
  },
  confirm: function(title, okCall, cancalCall) {
    Dialog.confirm(title)
    .then((action) => {
      okCall();
    }).catch(() => {
      cancalCall && cancalCall();
    });
  }
}