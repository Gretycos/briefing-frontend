<template>
  <div class="top-bar">
    <div class="covid" @click="backToHome">
      <div class="covid-19">COVID-19</div>
      <div class="covid-text">
        <div class="covid-daily">DAILY</div>
        <div class="covid-issues-report">ISSUES REPORT</div>
      </div>
    </div>
    <div class="date-week">
      <div class="date">
        {{ date }}
      </div>
      <div class="week">
        {{ week }}
      </div>
    </div>
  </div>
<!--  <el-row type="flex" justify="space-between" align="bottom">-->
<!--    <el-col :span="16">-->
<!--      &lt;!&ndash; typescript路径需要用require函数 &ndash;&gt;-->
<!--      <el-row-->
<!--        type="flex"-->
<!--        justify="start">-->
<!--        <el-col :span="24">-->
<!--          <div class="covid" @click="backToHome">-->
<!--            <div class="covid-19">COVID-19</div>-->
<!--            <div class="covid-text">-->
<!--              <div class="covid-daily">DAILY</div>-->
<!--              <div class="covid-issues-report">ISSUES REPORT</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <el-row-->
<!--        type="flex"-->
<!--        justify="end"-->
<!--        align="bottom">-->
<!--        <el-col :span="24">-->
<!--          <div class="date-week">-->
<!--            <div class="date">-->
<!--              {{ date }}-->
<!--            </div>-->
<!--            <div class="week">-->
<!--              {{ week }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-col>-->
<!--  </el-row>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { format } from 'date-fns'

@Component
export default class TopBar extends Vue {
  todayDate = new Date()

  get date () {
    return format(this.todayDate, 'yyyy-MM-dd')
  }

  week: string = new Date().toDateString().split(' ')[0].toUpperCase()

  backToHome () {
    this.$router.push({ name: 'Home' })
  }
}
</script>
<style scoped lang="scss">
.top-bar{
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.date-week{
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .date{
    margin-right: 10px;
  }
  .week{
    margin-right: 10px;
    color: red;
  }
  @media screen and (min-aspect-ratio: 1/1){
    font-size: 16px;
  }
  @media screen and (max-aspect-ratio: 1/1){
    font-size: 10px;
  }
  font-weight: bold;
}
.covid:hover{
  cursor: pointer
}
.covid{
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .covid-19{
    font-weight: bolder;
    @media screen and (min-aspect-ratio: 1/1) {
      font-size: 32px;
    }
    @media screen and (max-aspect-ratio: 1/1) {
      font-size: 20px;
    }
    color: red;
    text-shadow: 1px 0 1px #393838;
  }
  .covid-text{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-weight: normal;
    @media screen and (min-aspect-ratio: 1/1) {
      font-size: 18px;
    }
    @media screen and (max-aspect-ratio: 1/1) {
      font-size: 12px;
    }
  }
}
</style>
