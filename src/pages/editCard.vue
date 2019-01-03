<template>
    <div class="bgcolor-white cardstyle height100 refreshheightg" style="padding-bottom:80px">
        <div class="flex-align-justify"><card :data="userinfo" :ifqrcode="false"></card></div>
        <van-cell-group class="margin-top46 font-size8 noboder">
            <van-field v-model="name" clearable placeholder="请填写真实姓名"  @blur="blur"/>
            <van-field v-model="idcard"  clearable placeholder="请填写身份证号码"  @blur="blur" />
            <!-- <van-cell :title="nation" :style="{color:(nation=='请选择民族'?'#cdcdcd':'#333')}" is-link @click="showNation"/> -->
            <van-cell value="" @click="showNation"  is-link>
                <template slot="title">
                    <van-field v-model="nation"  clearable placeholder="请选择民族" readonly  @blur="blur"/>
                </template>
            </van-cell>
            <van-field v-model="phone" clearable placeholder="请输入手机号码" @blur="blur"/>
        </van-cell-group>
        <div class="flex-spacebetween van-hairline--top margin-right40" style="align-items:flex-end">
            <div class="van-hairline--bottom"><van-field v-model="sms" center clearable placeholder="请输入验证码"  @blur="blur"></van-field></div>
            <van-button v-if="!timer" slot="button" size="small" type="default" class="itemflex-00auto" style="width:96px" @click="getCode">获取验证码</van-button>
            <van-button v-else slot="button" size="small" type="default" class="itemflex-00auto" style="width:96px">重新获取{{timeCount}}s</van-button>
        </div>
        <div class="width100 fixed bottom0 flex-align-justify padding16X bgcolor-white"><van-button type="custom"  :disabled="!ableSubmit" :custom-class="ableSubmit? 'btn-theme' : 'btn-theme-disabled'" class="width90" @click="apply">确认申请</van-button></div> 
        <identify ref="identify" :mobile="phone" :type="2" @identified="identified"></identify>
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns"   @cancel="onCancel" @confirm="onConfirm"   show-toolbar value-key="desc"/>
        </van-popup>
    </div>
</template>
<style lang="scss">
.refreshheightg{
    // height:calc(100vh-60px);
    overflow: scroll;
}
.cardstyle .van-cell:not(:last-child):after{
    right:4vw;
}
.cardstyle .van-cell{
    padding-top:26px;
}
.cardstyle .van-cell__title .van-cell{
    padding-top:0;
    padding-left:0;
}
.noboder.van-hairline--top-bottom:after{
     border:none;
}
.cardstyle .van-field__control{
    font-size:18px;
}
.cardstyle .van-cell__title{
    font-size:18px;
    // color:#999;
}
.btn-theme {
    background-color: #1C97FC;
}
.btn-theme-disabled {
    &.van-button--disabled {
        color: white !important;
        background-color: #1C97FC !important;
    }
}
.van-button--disabled{
    opacity: 0.3;
}
.cardstyle .van-button--default{
    color:#999;
}
.cardstyle .van-button--small{
    padding:0px 10px;
    line-height:36px;
    height:36px;
}
</style>
<style scoped>
html{
    background: #fff;
}
</style>

<script>
    import { Dialog } from 'vant';
    import card from '@/components/card'
    import identify from "@/components/identify_code";
    export default {
        components:{
            card,
            identify
        },
        data(){
           return {
               userinfo:{
                   name:'XXX',
                   idCard:'XXXX******XXXX'
               },
               name:'',
               idcard:'',
               phone:'',
               sms:'',
               timer:null,
               timeCount: 60,
               columns:[],
               show:false,
               nation:'',
               nationId:''
           }
        },
        computed:{
              ableSubmit () {
                return this.name && this.idcard&&this.phone&&this.sms&&this.nation
              }
        },
        methods:{
            blur(){
                console.log('>>>>>>>>')
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            getnation(){
                this.$post({
                    url:this.$apis.getnation,
                }).then(res =>{
                    this.columns=res.data;
                })
            },
            showNation(){
                this.show=true
            },
            onConfirm(value, index) {
                 this.nation = value.desc
                 this.nationId = value.code
                 this.show=false
            },
            onCancel() {
                this.show=false
            },
            getCode () {
                if(!this.phone){
                     this.$widget.toast('手机号不能为空')
                    return 
                }
                if (!this.$validate.isMobile(this.phone)) {
                    this.$widget.toast('手机号格式错误')
                    return
                }
                this.$refs.identify.isShow = true
            },
            identified() {
                this.clearTimer();
                this.timeCount = 60;
                this.$cache.set(this.$cacheKey.loginTimes, {
                    mobile: this.phone,
                    time: new Date().getTime()
                });
                this.timer = setInterval(() => {
                    this.timeCount--;
                    if (this.timeCount <= 0) {
                    this.clearTimer();
                    }
                }, 1000);
            },
            initTimer() {
                this.clearTimer();
                let data = this.$cache.get(this.$cacheKey.loginTimes);
                if (data) {
                    let nowTime = new Date().getTime();
                    if (nowTime - data.time * 1 < 60 * 1000) {
                    this.phone = data.mobile;
                    this.timeCount = parseInt((data.time * 1 + 60000 - nowTime) / 1000);
                    this.timer = setInterval(() => {
                        this.timeCount--;
                        if (this.timeCount <= 0) {
                        this.clearTimer();
                        }
                    }, 1000);
                    }
                }
            },
            clearTimer() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                this.timeCount = 0;
            },
            vertify () {
                if(this.nation=='请选择民族'){
                    this.$widget.toast('姓名不能为空')
                }
                if (!this.$validate.isMobile(this.phone)) {
                    this.$widget.toast('手机号码格式错误')
                    return false
                }
                if (!this.$validate.isIdCard(this.idcard)) {
                    this.$widget.toast('身份证号码格式错误')
                    return false
                }
                
                return true
            },
            apply(){
                if (!this.vertify()) {
                    return false
                }
                // this.$widget.alert("",'申请成功')
                //  this.$widget.alert("身份证号查无此人，请确认",'申请失败')
                this.$post({
                    url:this.$apis.apply,
                    isLoading:true,
                    param:{
                        userId:this.$cache.get(this.$cacheKey.userId),
                        openId:this.$cache.get(this.$cacheKey.openId),
                        hospitalId:this.$cache.get(this.$cacheKey.hospitalId),
                        projectId:this.$cache.get(this.$cacheKey.projectId),
                        idCardType:'01',//0动态二维码
                        idCard:this.idcard,
                        name:this.name,
                        nation:this.nationId,
                        phone:this.phone,
                        vaild:this.sms
                    }
                }).then(res =>{
                    if(res.code==200){
                        // this.$widget.alert("",'申请成功')
                        Dialog.alert({
                            title: '申请成功',
                            message: ''
                        }).then(() => {
                            this.$router.push({path:'/cardList'})
                        });
                        
                    }
                },res =>{
                     this.$widget.alert(res.data.message,'申请失败')
                })
                //
            }
        },
        mounted(){
            this.phone=''
            this.getnation()
            this.initTimer()
            console.log(navigator.userAgent)
        },
        created(){

        }
    }
</script>