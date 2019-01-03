<template>
    <div class="bgcolor-white height100">
        <div class="flex-center margin-top60">
            <div  style="width:133px;height:133px;"><vue-qr  :logoSrc="config.imagePath" :text="config.value" :size="133" :margin="0"></vue-qr></div> 
        </div>
        <div class="margin-top28 text-align-center margin-bottom20">就诊时出示此码，<span  @click="clickrefresh" class="color-blue">刷新</span></div>
        <section class="margin-right40">
            <van-cell-group class="noborder" style="font-size:18px;">
                <van-cell :title="userinfo.name"  />
                <van-cell :title="userinfo.idCard" />
                <van-cell :title="userinfo.phone" class="bottomborder"/>
            </van-cell-group>
        </section>
        <div class="width100 fixed bottom0 flex-align-spacearound padding16X bgcolor-white">
            <van-button type="default" class="width90"  @click="confirmremove">健康卡解绑</van-button>
        </div> 
    </div>
</template>
<style lang='scss' scoped>
.refresh{
    width:18px;
    height:18px;
    background:url('../assets/image/refresh.png');
    background-size:100% 100%;

}
.height100{
    min-height:100vh;
    overflow: hidden;
}
.color-blue{
    color:#1C97FC;
}
.noborder.van-hairline--top-bottom:after{
     border:none;
}
.noborder  .van-cell .van-cell__value{
    flex:0;
}
.van-cell{
    font-size:18px;
    padding-left:5vw;
    padding-top:28px;
}
.van-cell:not(:last-child):after{
    left:5vw;
}
</style>
<style>
.noborder .van-cell.bottomborder:after {
    content: " ";
    position: absolute;
    pointer-events: none;
    left: 5vw;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    border-bottom: 1px solid #ebedf0;
}
</style>

<script>
    import VueQr from 'vue-qr'
    export default {
        components:{
            VueQr
        },
        data(){
           return {
                codeurl:'',
                config: {
                    value: '',//显示的值、跳转的地址
                    imagePath: require('../assets/image/qrlogo.jpg')//中间logo的地址
                },
                time:2*60*1000,//刷新二维码的间隔
                interval:null,
                userinfo:{},
           }
        },
        methods:{
            refresh(){
               let data = JSON.parse(this.$cache.get(this.$cacheKey.cardNumber))
                this.$post({
                    url:this.$apis.getBarCode,
                    isLoading:true,
                    param:{
                        userId:this.$cache.get(this.$cacheKey.userId),
                        openId:this.$cache.get(this.$cacheKey.openId),
                        hospitalId:this.$cache.get(this.$cacheKey.hospitalId),
                        projectId:this.$cache.get(this.$cacheKey.projectId),
                        idCardType:data.idCardType,
                        idCard:data.idCard,
                        codeType:'0'
                    }
                }).then(res =>{
                    this.$set(this.config,'value',res.data.barcode)
                },res =>{
                      this.$widget.toast(res.data.message)
                })
            },
            clickrefresh(){
                console.log(">>>>>>>>>")
                this.refresh()
            },
            begininterval(){
                this.interval = setInterval(()=>{
                    this.refresh()
                },this.time)
            },
            removecard(){
                let data = JSON.parse(this.$cache.get(this.$cacheKey.cardNumber))
                this.$post({
                    url:this.$apis.removecard,
                    param:{
                        userId:this.$cache.get(this.$cacheKey.userId),
                        openId:this.$cache.get(this.$cacheKey.openId),
                        hospitalId:this.$cache.get(this.$cacheKey.hospitalId),
                        projectId:this.$cache.get(this.$cacheKey.projectId),
                        id:data.id
                    }
                }).then(res =>{
                    this.$widget.alert(res.data.message,'').then(res =>{
                        this.$router.push({path:'/cardList'})
                    }).catch(res =>{

                    })
                })
            },
            confirmremove(){
                this.$widget.confirm('确定解绑健康卡','提示').then(res =>{
                    this.removecard()
                }).catch(res =>{

                })
            }
        },
        mounted(){
            let data = JSON.parse(this.$cache.get(this.$cacheKey.cardNumber))
            this.userinfo = data;
            let phone = this.userinfo.phone.replace(/(\d{3})(.*)(\d{4})/,function(str,$s1,$s2,$s3){
                return $s1 + '****' + $s3
            })
            this.$set(this.userinfo,'phone',phone)
            let idCard = this.userinfo.idCard.replace(/(\d{4})(.*)(\d{4})/,function(str,$s1,$s2,$s3){
                return $s1 + '********' + $s3
            })
            this.$set(this.userinfo,'idCard',idCard)
            this.refresh()
            this.begininterval()
        },
        created(){

        },
        destroyed(){
            clearInterval(this.interval)
        }
    }
</script>