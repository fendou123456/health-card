<template>
    <div style="padding-bottom:60px">
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"   > -->
           <div class="flex-align-justify flex-column">
                <card  v-for="(item,index) in mainList"  :key="index" :data="item"></card>
            </div>
            <empty v-if="nodata" style="margin-top:124px;"></empty>
        <!-- </van-pull-refresh> -->
        <div class="width100 fixed bottom0 flex-align-spacearound padding16X bgcolor-white">
            <van-button type="default" class="width50 margin-left30" @click="$router.push({path:'/myCardList'})" >扫一扫</van-button>
            <van-button type="custom" class="width50 margin-left30 margin-right30" @click="go">健康卡申请</van-button>
        </div> 
    </div>  
</template>
<style lang='scss' scoped>
.refreshheight{
     height:100%;
}
</style>
<script>
import card from '@/components/card'
import empty from '@/components/empty'

    export default {
        components:{
            card,
            empty
        },
        data(){
           return {
               userId:'',
               openId:'',
               hospitalId:'dce0eb83-f2a7-469e-8125-dc2b1ba25174',
               projectId:'75029b79-488f-4005-831d-f5d9455fc68f',
               isLoading:false,
               nodata:null,
               mainList:[]
           }
        },
        methods:{
            onRefresh(){
                this.$post({
                    url:this.$apis.cardList,
                    isLoading:true,
                    param:{
                        userId:this.userId,
                        openId:this.openId,
                        hospitalId:this.hospitalId,
                        projectId:this.projectId,
                    }
                }).then(res =>{
                    this.isLoading=false
                    this.mainList = res.data
                    this.nodata = this.$util.switchNodata(this.mainList)
                },res =>{
                    this.isLoading=false
                     this.$widget.toast(res.data.message)
                })
            },
            go(){
                this.$router.push({path:'/editCard'})
            },
            wxConfig(_appid,_timestamp,_nonceStr,_signature){
                var that = this;
                wx.config({ 
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。   
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: [
                                'checkJsApi',
                                'startRecord',
                                'stopRecord',
                                'translateVoice',
                                'scanQRCode',// 微信扫一扫接口
                                'openCard'
                                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
                }); 
                wx.error(function(res) {
                    alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                });
                wx.ready(function() {
                    wx.checkJsApi({
                        jsApiList : ['scanQRCode'],
                        success : function(res) {

                        }
                    });
                });
            },
            scanCode(){//页面点击扫码按钮
                wx.scanQRCode({
                    needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType : [ "qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success : function(res) {
                        var result;
                        if(/,/.test(res.resultStr)){
                            result = res.resultStr.split(',')[1]; // 当needResult 为 1 时，扫码返回的结果
                        }else{
                            result = resultStr;
                        }
                    },
                    fail : function(){
                        console.log('出错了');
                    }
                });
            },
            getauthorize(){
                this.$post({
                    url:this.$apis.authorize,
                    param:{
                        userId:this.userId,
                        openId:this.openId,
                        hospitalId:this.hospitalId,
                        projectId:this.projectId,
                    }
                }).then(res =>{

                })
            }
        },
        mounted(){
            this.userId = this.$route.query.uid||this.$cache.get(this.$cacheKey.userId)
            this.openId = this.$route.query.openid||this.$cache.get(this.$cacheKey.openId)
            this.$cache.set('userId',this.userId)
            this.$cache.set('openId',this.openId)
            this.$cache.set('hospitalId',this.hospitalId)
            this.$cache.set('projectId',this.projectId)
            this.onRefresh()
        },
        created(){

        }
    }
</script>