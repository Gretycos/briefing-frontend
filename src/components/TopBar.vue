<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :span="16">
      <!-- typescript路径需要用require函数 -->
      <el-row
        type="flex"
        justify="start">
        <el-col :span="24">
          <div class="covid" @click="backToHome">
            <div class="covid-19">COVID-19</div>
            <div class="covid-text">
              <div class="covid-daily">DAILY</div>
              <div class="covid-issues-report">ISSUES REPORT</div>
            </div>
          </div>
        </el-col>
<!--        <el-image-->
<!--          :src="require('../assets/covid-19.png')"-->
<!--          :fit="'contain'"-->
<!--          style="width:400px; height: 80px;" @click="backToHome">-->
<!--        </el-image>-->
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row
        type="flex"
        justify="end"
        align="bottom">
        <el-col :span="24">
          <div class="date-week">
            <div class="date">
              {{ date }}
            </div>
            <div class="week">
              {{ week }}
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
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
.date-week{
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;
  .date{
    margin-right: 10px;
  }
  .week{
    margin-right: 10px;
    color: red;
  }
  font-size: 16px;
  font-weight: bold;
}
.covid:hover{
  cursor: pointer
}
.covid{
  height: 80px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-shadow: 0.5px 0.5px 1px #393838;
  .covid-19{
    font-weight: bolder;
    font-size: 32px;
    color: red;
  }
  .covid-text{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-weight: normal;
    font-size: 18px;
  }
}
</style>
