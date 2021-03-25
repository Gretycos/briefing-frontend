<template>
  <div class="article">
    <div class="article-date">{{date}}</div>
    <div class="summary">
      <div class="summary-item" v-for="(item,index) in summaryList" :key="index">
        <div class="summary-index">
          <div class="summary-index-bar">-</div>
          <div class="summary-index-issue">ISSUE</div>
          <div class="summary-index-num">#0{{index+1}}</div>
        </div>
        <div class="summary-title">{{item.title}}</div>
<!--        <div class="summary-content">{{parseContent(item.title,item.summary.replace(/[\s]/g,"\n"))}}</div>-->
        <div class="summary-content">{{item.summary}}</div>
        <el-divider v-if="index!==summaryList.length-1"></el-divider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getSummaryList } from '@/api/api'

Component.registerHooks([
  'beforeRouteEnter'
])

@Component
export default class Article extends Vue {
  date = ''
  summaryList = []

  beforeRouteEnter (to: any, from: any, next: any) {
    const param = {
      time: to.params.date
    }
    getSummaryList(param).then(res => {
      // console.log(res)
      next((vm: any) => vm.setData(param.time, res))
      // this.setData(param.time, res)
      // next()
    })
  }

  setData (date: string, res: []) {
    this.date = date
    this.summaryList = res
  }

  // parseContent (title: string, content: string) {
  //   const start = content.indexOf(title)
  //   if (start !== -1) {
  //     return content.substring(start + title.length)
  //   } else {
  //     return content
  //   }
  // }
}
</script>

<style lang="scss">
.article{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .article-date{
    font-weight: bold;
    font-size: 24px;
    margin: 20px 0 20px 0;
  }
}

.summary{
  margin-top: 20px;
}

.summary-item{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .summary-index{
    display: flex;
    justify-content: center;
    align-items: center;
    .summary-index-bar{
      font-size: 20px;
      font-weight: 1000;
      color: red;
    }
    .summary-index-issue{
      margin-left: 10px;
      font-size: 16px;
      font-weight: 800;
    }
    .summary-index-num{
      margin-left: 10px;
      font-size: 16px;
      font-weight: 800;
      color: red;
    }
  }
  .summary-title{
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 20px 0;
  }
  .summary-content{
    text-align: left;
    font-size: 16px;
  }
}
</style>
