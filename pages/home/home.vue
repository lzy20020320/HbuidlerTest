<template>
  <view>
    <!-- 轮播图的区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/course/course?course_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="grid-list">
      <view class="grid-item">
          <image src="/static/function/喜爱的课程.png" @click="navClickHandler(1)"></image>
          <text>随机推荐</text>
        </view>
        <view class="grid-item">
          <image src="/static/function/热门(1).png"@click="navClickHandler(2)"></image>
          <text>热门课程</text>
        </view>
        <view class="grid-item">
          <image src="/static/function/课程.png"@click="navClickHandler(3)"></image>
          <text>课单</text>
        </view>
        <view class="grid-item">
          <image src="/static/function/生成报告_操作_jurassic.png"@click="navClickHandler(4)"></image>
          <text>一键生成</text>
        </view>
    </view>

    <!-- 楼层区域 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一个楼层的 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 这是轮播图的数据列表
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层的数据
        floorList: []
      };
    },
    onLoad() {
      // 调用方法，获取轮播图的数据
      this.getSwiperList()
      //获取导航图标
      this.getNavList()
      //楼层数据
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/home/swiperdata')
		//'/api/public/v1/home/swiperdata'
        // 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()

        this.swiperList = res.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/home/catitems')	// TODO?
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      navClickHandler(item) {
          //uni.switchTab({
            //url: '/subpkg/course/course?tj_course_id='
            //url: '/pages/comment/comment'
          //})
          uni.navigateTo({
            url: '/subpkg/commentlist/commentlist?cid='+item,
            //url: '/pages/comment/comment'
          })
      },
      // 获取首页楼层数据的方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()

        // 对数据进行处理
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/commentlist/commentlist?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  .grid-list{
    display: flex;
    flex-wrap: wrap;
    border-left: 1rpx solid #efefef;
    border-top: 1rpx solid #efefef;
  }
  
  .grid-item{
    width: 25%;
    height: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1rpx solid #efefef;
    border-bottom: 1rpx solid #efefef;
    box-sizing: border-box;
  }
  
  .grid-item image{
    width: 60rpx;
    height: 60rpx;
  }
</style>
