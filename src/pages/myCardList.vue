<template>
    <div>
        <div class="bold font-size6 color-333 margin-top60 margin-left28 margin-bottom24">请选择你要授权的健康卡</div>
        <mycard v-for="(item,index) in mainList" :key="index" :data="item"></mycard>
        <empty v-if="nodata" style="margin-top:124px;"></empty>
    </div>
</template>
<style lang='scss' scoped>

</style>
<script>
import mycard from '@/components/mycard'
import empty from '@/components/empty'
    export default {
        components:{
            mycard,
            empty
        },
        data(){
           return {
                mainList:[],
                nodata:null,
           }
        },
        methods:{
            geData(){
                this.$post({
                    url:this.$apis.cardList,
                    isLoading:true,
                    param:{
                        userId:this.$cache.get(this.$cacheKey.userId),
                        openId:this.$cache.get(this.$cacheKey.openId),
                        hospitalId:this.$cache.get(this.$cacheKey.hospitalId),
                        projectId:this.$cache.get(this.$cacheKey.projectId),
                    }
                }).then(res =>{
                    this.mainList = res.data
                    this.nodata = this.$util.switchNodata(this.mainList)
                },res =>{
                     this.$widget.toast(res.data.message)
                })
            }
        },
        mounted(){
            this.geData()
        },
        created(){

        }
    }
</script>