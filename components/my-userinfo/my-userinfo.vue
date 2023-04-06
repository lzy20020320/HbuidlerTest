<template>
  <view class="my-userinfo-container">
    <!-- 头像和昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>

    <!-- 面板区域 -->
    <view class="panel-list">
      <!-- 第1个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>关注的人</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>关注的课</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的书</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>收藏课单</text>
          </view>
        </view>
      </view>

      <!-- 第2个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>主题切换</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>牛刀小试</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>个人信息</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>

      <!-- 第3个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>问题反馈</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系我们</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)

        if (succ && succ.confirm) {
          this.updateAddress({})
          this.updateUserInfo({})
          this.updateToken('')
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #F4F4F4;

    .top-box {
      height: 400rpx;
      background-color: #2b4b6b;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #FFF;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 16px;
        color: #FFF;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #F4F4F4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          font-size: 13px;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }

  .panel-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
    line-height: 45px;
  }
</style>
