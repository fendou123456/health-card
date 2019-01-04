<template>
    <div style="padding-bottom:60px">
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"   > -->
           <div class="flex-align-justify flex-column">
                <card  v-for="(item,index) in mainList"  :key="index" :data="item"></card>
            </div>
            <empty v-if="nodata" style="margin-top:124px;"></empty>
        <!-- </van-pull-refresh> -->
        <div class="width100 fixed bottom0 flex-align-spacearound padding16X bgcolor-white">
            <van-button type="default" class="width50 margin-left30" @click="scanCode" >扫一扫</van-button>
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
import { getjsSign , scanCode, wxConfig} from '@/utils/scanCode.js'
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
           scanCode,
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
            wxConfig(data){
                var that = this;
                wx.config({ 
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。   
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonce_str, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList:  [ 'checkJsApi', 'startRecord', 'stopRecord','translateVoice','scanQRCode', 'openCard' ]
                }); 
                // wx.error(function(res) {
                //     alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                // });
              
            },
        },
        mounted(){
            this.userId = this.$route.query.uid||this.$cache.get(this.$cacheKey.userId)
            this.openId = this.$route.query.openid||this.$cache.get(this.$cacheKey.openId)
            console.log(">>>>>uid",this.$route.query.uid)
            this.$cache.set('userId',this.userId)
            this.$cache.set('openId',this.openId)
            this.$cache.set('hospitalId',this.hospitalId)
            this.$cache.set('projectId',this.projectId)
            this.onRefresh()
            getjsSign()
        },
        created(){

        }
    }
</script>