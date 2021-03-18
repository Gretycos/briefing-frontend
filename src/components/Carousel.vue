<template>
  <el-carousel
    ref="carousel"
    height="300px"
    :interval="5000"
    arrow="never"
    :autoplay="true"
    v-loading="loading">
    <el-carousel-item v-for="(item,index) in todayNewsInfoList" :key="index">
      <div class="carousel-content" @click="moveToArticle">
        <div class="carousel-hot">—— HOT ISSUE {{ index+1 }} ——</div>
        <div class="carousel-title">{{ item.title }}</div>
        <div class="carousel-date">{{ dateChild }}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getTitleList, getSummaryList } from '@/api/api'

@Component
export default class Carousel extends Vue {
  @Prop() dateFather!: string // prop用于接收父组件传递的参数，不需要初始化，接收到了不能直接使用
  todayNewsInfoList: [] = [] // data要初始化，data是响应式的
  loading = false;
  // 计算属性会遇到依赖变化时进行变化
  get dateChild () {
    return this.dateFather
  }

  @Watch('dateFather')
  onDateChanged (newValue: string, oldValue: string) {
    const param = {
      time: newValue.toString()
    }
    // console.log(param)
    this.loading = true
    setTimeout(() => {
      getTitleList(param).then(res => {
        this.todayNewsInfoList = res
        this.loading = false
        const el: any = this.$refs.carousel
        el.setActiveItem(0)
        // console.log(res)
      })
    }, 300)
  }

  moveToArticle () {
    // console.log(this.dateChild)
    // this.$router.push({ name: 'Article', params: { date: this.dateChild } })
    this.$router.push({ path: `/article/${this.dateChild}` })
  }
}
</script>

<style lang="scss">
.el-carousel{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .el-carousel__indicators{
    .el-carousel__indicator{
      .el-carousel__button{
        height: 4px;
      }
    }
  }
}

.el-carousel__item{
  background-color: antiquewhite;
}
.carousel-content:hover{
  cursor: pointer
}
.carousel-content{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.carousel-hot{
  height: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: red;
  @media screen and (min-aspect-ratio: 1/1) {
    font-size: 24px;
  }
  @media screen and (max-aspect-ratio: 1/1) {
    font-size: 15px;
  }
  font-weight: bold;
  text-shadow: 0 0 1px #393838;
}
.carousel-title{
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-aspect-ratio: 1/1) {
    font-size: 32px;
  }
  @media screen and (max-aspect-ratio: 1/1) {
    font-size: 20px;
  }
  font-weight: bolder;
}
.carousel-date{
  height: 30%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: gray;
  @media screen and (min-aspect-ratio: 1/1) {
    font-size: 16px;
  }
  @media screen and (max-aspect-ratio: 1/1) {
    font-size: 10px;
  }
  font-weight: bold;
}
</style>
