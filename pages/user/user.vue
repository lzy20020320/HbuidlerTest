<template>
  <view class="my-container">
    <my-login v-if="denglu.length !=0"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['denglu'])
    },
  }
</script>

<style lang="scss">
  page,
  .my-container {
    height: 100%;
  }
</style>
