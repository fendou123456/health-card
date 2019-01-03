<template>
    <div class="min-height100 bgimg flex-center">
        <div style="width:335px;height:332px" class="bgcolor-white border-radius10 margin-top100 flex-column flex-align-justify">
            <div class="margin-top20"></div>
            <vue-qr  :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
            <div class="margin-top28">电子健康卡码</div>
            <i class="refresh margin-top32" @click="clickrefresh"></i>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.bgimg{
    width:100%;
    height:100%;
    background: url('../assets/image/qrback.png');
    background-size:100% 100%;
}
.refresh{
    width:18px;
    height:18px;
    background:url('../assets/image/refresh.png');
    background-size:100% 100%;

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
                interval:null

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
                this.refresh()
            },
            begininterval(){
                this.interval = setInterval(()=>{
                    this.refresh()
                },this.time)
            }
        },
        mounted(){
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