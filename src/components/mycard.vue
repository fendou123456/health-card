<template>
    <div :class="['flex-align-spacebetween', 'margin-top16', 'padding40X', 'paddingX32', touchFlag?'bgcolor-eee':'bgcolor-white', 'border-bottom1']" ref="card" @touchstart="touchstartcolor" @touchend="touchendcolor">
        <div class="flex-align-start width100">
            <img :src="headurl" alt=""  class="itemflex-00auto imgstyle margin-right20">
            <div class="flex-column">
                <span class="font-size4 color-333 bold">{{data.name}}</span>
                <span class="color-999 margin-top8">{{idcardchange}}</span>
            </div>
        </div>
        <i class="icon-enter color-ddd" ></i>
    </div>
</template>
<style lang='scss' scoped>
.imgstyle{
    width:20px;
    height:22px;
}
.bgcolor-eee{
    background: #eee;
}
</style>
<script>
    import headurl from '@/assets/image/default_head.png'
    export default {
        props:{
             data:{
                type:Object,
                default:{}
            },
        },
        data(){
           return {
               headurl,
               touchFlag:false
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
        methods:{
            touchstartcolor(){
               this.touchFlag=true;
            },
            touchendcolor(){
                this.touchFlag=false;
                // this.$router.push({path:'/success'})
                // this.$router.push({path:'/fail'})
                this.$router.push({path:'/codeAndUnbind'})
            }
        },
        mounted(){

        },
        created(){

        }
    }
</script>