<template>
    <div class="flex-column">
        <div class="flex-center" style="margin-top:60px;"><img :src="failurl" alt="" style="width:90px;height:90px;"></div>
        <div class="bold font-size6 color-333 text-align-center margin-top56">授权失败</div>
        <div class="text-align-center color-666 margin-top20">请使用您的健康卡业务</div>
        <div class="width100 fixed bottom0 flex-align-spacearound padding16X bgcolor-white">
            <van-button type="default" class="width50 margin-left30" @click="$router.go(-1)" >返回</van-button>
            <van-button type="custom" class="width50 margin-left30 margin-right30"  @click="scanCode" >重新扫描</van-button>
        </div> 
    </div>
</template>
<style lang='scss' scoped>

</style>
<script>
    import failurl from '@/assets/image/error.png'
    import { getjsSign , scanCode, wxConfig} from '@/utils/scanCode.js'
    export default {
        data(){
           return {
               failurl
           }
        },
        components:{

        },
        methods:{
            scanCode
        },
        mounted(){
            getjsSign()
        },
        created(){

        }
    }
</script>