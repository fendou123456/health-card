<template>
    <div>
        <div class="bold font-size6 color-333 margin-top60 margin-left28 margin-bottom24">请选择你要授权的健康卡</div>
        <mycard v-for="(item,index) in mainList" :key="index" :data="item"></mycard>
    </div>
</template>
<style lang='scss' scoped>

</style>
<script>
import mycard from '@/components/mycard'
    export default {
        components:{
            mycard
        },
        data(){
           return {
               mainList:[
                   {name:'张海枝',idCard:'360281199009115448'}
               ]
           }
        },
        methods:{

        },
        mounted(){

        },
        created(){

        }
    }
</script>