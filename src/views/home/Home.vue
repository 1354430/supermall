<template>
   <div id="home">
     <!-- 导航栏 -->
     <nav-bar class="nav-item"><div slot="center">购物街</div></nav-bar>
     <!-- 屏幕滚动区域 -->
     <scroll class="content" ref="scroll" 
     :probeType="3"
     @scroll="scroll"
     :pullUpLoad="true"
     @pullingUp="LoadMore">
       <!-- 轮播图 -->
       <home-swiper :banners="banners" @FinshImageLoad="FinshImageLoad"></home-swiper>
      <!-- 推荐模块 -->
       <recommend-view :recommends="recommends"></recommend-view>
       <!-- 热门模块 -->
       <feature></feature>
     </scroll>
   </div>
</template>

<script>
// 引入  Home 子组件
import Feature from './ChildComps/Feature'
import HomeSwiper from './ChildComps/HomeSwiper'
import RecommendView from './ChildComps/RecommendView'

// 引入 Components -> Common 组件
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll'
//网络封装
import {getHomeMultidata} from 'network/home'
//延时器
// import {debounce} from 'common/utili'



export default {
  name: "Home",
  components:{
    NavBar,
    Scroll,
    Feature,
    HomeSwiper,
    RecommendView

  }
  ,
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop:{
            page:0,list:[]
          },
          new:{
            page:0,list:[]
          },
          sell:{
            page:0,list:[]
          },
        },
       CurrentType: 'pop',
       isShowBackTop: false,
       isTabFixed: false,
       TaboffsetTop: 0,
       saveY: 0,
      }
    },
    // mixins:[itemListenerMixin],
    computed: {
      ShowGoods() {
        return this.goods[this.CurrentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // // 2.请求商品数据
      // this.getHomeGoods('pop')
      // this.getHomeGoods('new')
      // this.getHomeGoods('sell')
    },
    mounted() {
     
    },
   destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 离开的时候记录y的值
      this.saveY = this.$refs.scroll.getScrollY()
      //离开home的时候关闭图片监听
      this.$bus.$off('itemImageLoad', this.imgLinstener)
    },
    methods: {
      /**
       * 事件监听
      */
      tabClick(index) {
        switch(index){
          case 0:
            this.CurrentType = "pop"
            break
          case 1:
            this.CurrentType = 'new'
            break
          case 2: 
            this.CurrentType = 'sell'
        }
        this.$refs.TabControl1.CurrentIndex = index;
        this.$refs.TabControl2.CurrentIndex = index;
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      scroll(position){
        // console.log(position);
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定TabControl是否吸顶 以及定位他
        this.isTabFixed = (-position.y) > this.TaboffsetTop
      },
      LoadMore() {
        // console.log('我是加载更多');
        // this.getHomeGoods(this.CurrentType);
      },
      FinshImageLoad(){
        console.log(this.$refs.TabControl1.$el.offsetTop);
        this.TaboffsetTop = this.$refs.TabControl1.$el.offsetTop
      },
      /**
       * 网络相关的请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      // getHomeGoods(type) {
      //   const page = this.goods[type].page+1;
      //   getHomeGoods(type,page).then(res=>{
      //     this.goods[type].list.push(...res.data.data.list)
      //        this.goods[type].page += 1
      //        this.$refs.scroll.finishPullUp()
      //     // console.log(this.goods[type].list );
      //   })
      // }
    }
  }
</script>

<style lang="less" scoped>
#home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

/* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>