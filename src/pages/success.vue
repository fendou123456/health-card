<template>
    <div class="flex-column">
        <div class="flex-center" style="margin-top:60px;"><img :src="successurl" alt="" style="width:90px;height:90px;"></div>
        <div class="bold font-size6 color-333 text-align-center margin-top56">授权成功</div>
        <div class="text-align-center color-666 margin-top20">请使用您的健康卡业务</div>
    </div>
</template>
<style lang='scss' scoped>

</style>
<script>
    import successurl from '@/assets/image/success.png'
    export default {
        data(){
           return {
               successurl
           }
        },
        components:{

        },
        methods:{

        },
        mounted(){

        },
        created(){

        }
    }
</script>