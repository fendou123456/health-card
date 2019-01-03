<template>
    <div class="bgimg margin-top28 " @click="go">
        <div class="color-D6FAFF  text-align-center font-size4 padding-top28 padding-bottom20">山东省电子健康卡</div>
        <div class="flex-spacebetween margin-top64">
            <div class="color-white margin-left40">
                <div><span class="opacity_7 margin-right20 line-limited break-all">姓名</span><span>{{data.name}}</span></div>
                <div class="margin-top24"><span class="opacity_7 margin-right20">身份证号码</span><span>{{idcardchange}}</span></div>
            </div>
            <div class="qrcodeimg itemflex-00auto margin-right60 margin-left102" v-if="ifqrcode" ></div>
        </div>
        <!-- <div class="font-size-4 opacity_6 text-align-center margin-top44" style="color:#A0F4FF" >- 温馨提示：健康卡目前不支持医保 -</div> -->
    </div>
</template>
<style lang='scss' scoped>
.bgimg{
    width:347px;
    height:180px;
    background: url('../assets/image/card_bg.png');
    background-size:100% 100%;
}
.qrcodeimg{
    width:50px;
    height:54px;
    background: url('../assets/image/qrcodeimg.png');
    background-size:100% 100%;
}
</style>
<script>
    export default {
        props:{
            data:{
                type:Object,
                default:{}
            },
            ifqrcode:{
                type:Boolean,
                default:true
            }
        },
        data(){
           return {

           }
        },
        computed:{
            idcardchange(){
                let idcard = this.data.idCard.replace(/(\d{4})(.*)(\d{4})/,function(str,$s1,$s2,$s3){
                    return $s1 + '********' + $s3
                })
                return idcard
            }
        },
        components:{

        },
        methods:{
             go(){
                 this.$cache.set('cardNumber',JSON.stringify(this.data))
                 this.$router.push({path:'/codeAndUnbind'})
             }
        },
        mounted(){

        },
        created(){

        }
    }
</script>