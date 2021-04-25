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
        <div class="summary-title">{{item.title}}
          <a :href="item.url" class="summary-origin">[查看原文]</a>
        </div>
<!--        <div class="summary-content">{{parseContent(item.title,item.summary.replace(/[\s]/g,"\n"))}}</div>-->
        <div class="summary-content-container">
          <div class="summary-content">
            <div class="summary-img-container" v-if="item.images!==''">
              <img :src="'http://39.105.43.226:8081/images'+item.images" v-image-preview/>
            </div>
            {{item.summary.replace(/[\s]/g,"\n")}}
          </div>
        </div>
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
    .summary-origin{
      text-decoration: none;
      font-size: 13px;
      color: darkgray;
    }
  }
  .summary-content-container{
    .summary-content{
      float: left;
      text-align: left;
      font-size: 16px;
    }
    .summary-img-container{
      @media screen and (min-aspect-ratio: 1/1) {
        width:30%;
      }
      @media screen and (max-aspect-ratio: 1/1) {
        width:100%;
      }
      padding: 0 0 10px 10px;
      float: right;
      img{
        width: 100%;
        object-fit: contain;
        cursor: pointer;
      }
      .summary-img-error{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
