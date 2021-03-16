<template>
  <div class="article">
    <div class="article-date">{{date}}</div>
    <div class="summary">
      <div class="summary-item" v-for="(item,index) in summaryList" :key="index">
        <div class="summary-title">{{item.title}}</div>
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
    })
  }

  setData (date: string, res: []) {
    this.date = date
    this.summaryList = res
  }
}
</script>

<style lang="scss">

</style>
