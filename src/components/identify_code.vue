<template>
  <div class="identify">
    <van-popup v-model="isShow" class="margin-top100" style="width:80%" :overlay="true" position="top" close-on-click-overlay @close="isShow=false">
      <div class="text-align-center padding-top48  padding-left46 padding-bottom30">
        <i class="icon-close absolute top40 right40 color-999" @click="close"></i>
        <p class="font-size4 margin-bottom24 margin-top0 color-333">请输入图形验证码</p>
        <p style="color:#F6424B" class="padding10X">{{errmeaasge}}</p>
        <div class="code-content padding-top18">
          <img class="height100 code-img inline-block float-left" :src="codeImgUrl" />
          <div @click="refreshCode" class="code-refresh float-left padding28X">
            <i class="icon-refresh font-size22 color-999"></i>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="margin-top48 margin-bottom40 flex height-50" @click="showFocus()">
          <div v-for="i in length" :key="i" class="itemflex-11auto">
            <div class="code-input">
              {{codes.length >= i - 1 ? codes[i - 1] : ''}}
            </div>
          </div>
        </div>
      </div>
       
    </van-popup>
    <!-- <van-cell-group class="hidden">
        <van-field v-model="codetext" autosize  ref="inputcode" @input.native="checkCode" type="password"/>
    </van-cell-group> -->
    <!-- <input @input="checkCode" style="position:fixed;top:0;left:0" type="number" maxlength="4" v-model="codes" :focus="isFocus" /> -->
    <van-number-keyboard :z-index="3000" :show="isShow" extra-key="." close-button-text="完成"  @blur="isShow = false" @input="checkCode" @delete="onDelete" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: -1
    }, //0:注册 1:忘记密码 2:登录 3:修改手机号 4:绑定账号
    mobile: ""
  },
  data() {
    return {
      isShow: false,
      codeImgUrl: "",
      codetext:'',
      codes: [],
      length: 4,
      isFocus:true,
      codeimguuid:'',
      errmeaasge:''
    };
  },
  watch: {
    isShow(curVal, oldVal) {
      this.refreshCode();
    }
  },
methods: {
    close(){
        this.isShow=false;
    },
    showFocus(){
        // this.$refs.inputcode.focus()
    },
    onDelete() {
      if (this.codes.length > 0) {
        this.codes.pop();
      }
    },
    checkCode(v) {
      if (this.codes.length < this.length) {
        this.codes.push(v);
      }
      if (this.codes.length === 4) {
        this.$post({
          isLoading: true,
          url: this.$apis.getSmsVerificationCode,
          param: {
            userId:this.$cache.get(this.$cacheKey.userId),
            openId:this.$cache.get(this.$cacheKey.openId),
            hospitalId:this.$cache.get(this.$cacheKey.hospitalId),
            projectId:this.$cache.get(this.$cacheKey.projectId),
            phone: this.mobile,
            type: this.type,
            uuid:this.codeimguuid,
            verifyCode: this.codes.join(''),
          }
        }).then(
          res => {
            this.$widget.toastSuccess("获取验证码成功").then(res => {
              this.$emit("identified", this.codetext);
              this.isShow = false;
            });
          },
          res => {
            this.codes = [];
            this.codetext =''
            console.log('>>>>>>>>',res)
            this.errmeaasge=res.data.message
            // this.$widget.toast(res.data.message)
          }
        );
      }
    },
    getImageUrl() {
      this.$post({
        isLoading: true,
        url: this.$apis.getGraphicVerificationCode,
      }).then(res => {
        this.codeImgUrl = res.data.imgUrl;
        this.codeimguuid = res.data.uuid
      });
    },
    refreshCode() {
      if (!this.isShow) return;
      this.codes = [];
      this.getImageUrl();
    //   this.$refs.inputcode.focus()
    }
  }
};
</script>

<style lang="scss" scoped>
.identify {
    .van-popup--top{
        border-radius: 10px;
    }
  .hidden {
    width: 0;
    height: 0;
  }
  .height-50 {
    height: 50px;
  }
  .code-input {
    width: 50px;
    height: 50px;
    background-color: #f6f6f6;
    border: #e2e2e2 1px solid;
    text-align: center;
    border-radius: 4px;
    line-height: 50px;
    font-size: 24px;
    color:#333
  }
  .code-img {
    width: 190px;
    background-color: #f6f6f6;
  }
  .code-refresh {
    width: 54px;
    background-color: #f6f6f6;
  }
  .code-content {
    width: 248px;
    height: 54px;
  }
  .get-code-btn {
    font-size: 12px;
    padding: 0 12px;
    border: #1c98fc 1px solid !important;
  }
}
</style>
