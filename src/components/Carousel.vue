<template>
  <el-carousel
    height="300px"
    :interval="20000"
    arrow="never"
    :autoplay="true">
    <el-carousel-item v-for="(item,index) in todayNewsInfoList" :key="index">
      <div class="carousel-content">
        <div class="carousel-hot">—— HOT ISSUE {{ index+1 }} ——</div>
        <div class="carousel-title">{{ item.title }}</div>
        <div class="carousel-date">{{ dateChild }}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getTitleList } from '@/api/api'

@Component({
})
export default class Carousel extends Vue {
  @Prop() dateFather!: string // prop用于接收父组件穿递的参数，不需要初始化，接收到了不能直接使用
  todayNewsInfoList: [] = [] // data要初始化，data是响应式的
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
    getTitleList(param).then(res => {
      this.todayNewsInfoList = res
      // console.log(res)
    })
  }
}
</script>

<style lang="scss">
.el-carousel{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.el-carousel__item{
  background-color: antiquewhite;
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
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 1px #393838;
}
.carousel-title{
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bolder;
}
.carousel-date{
  height: 30%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: gray;
  font-size: 16px;
  font-weight: bold;
}
</style>
