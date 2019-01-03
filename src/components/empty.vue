<template>
  <div class="text-align-center">
    <img :src="nodata" :style="{marginTop: top + 'rpx'}" style="width:228px"></img>
    <div style="margin: 56rpx auto 0; text-aligin: center: width:440rpx;color:#6C7D8F;">{{title}}</div>
  </div>
</template>

<script>
import nodata from '@/assets/image/default_no_data.png'
export default {
  props: {
    title: {
      default: ''
    },
    top: {
      default: 300
    },
    type:{
        default:'nodata'
    }
  },
  data () {
    return {
      nodata
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
  image {
    width: 320rpx;
    height: 320rpx;
  }
</style>

