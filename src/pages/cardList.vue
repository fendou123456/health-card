<template>
    <div style="padding-bottom:60px">
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"   > -->
           <div class="flex-align-justify flex-column">
                <card  v-for="(item,index) in mainList"  :key="index" :data="item"></card>
            </div>
            <empty v-if="nodata" style="margin-top:124px;"></empty>
        <!-- </van-pull-refresh> -->
        <div class="width100 fixed bottom0 flex-align-justify padding16X bgcolor-white"><van-button type="custom" class="width90" @click="go">健康卡申请</van-button></div> 
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