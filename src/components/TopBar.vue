<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :span="6">
      <!-- typescript路径需要用require函数 -->
      <el-image
        :src="require('../assets/covid-19.png')"
        :fit="'contain'"
        style="height: 80px;">
      </el-image>
    </el-col>
    <el-col :span="6">
      <el-row
        type="flex"
        justify="end"
        align="bottom">
        <el-col :span="12">
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
  font-size: 18px;
  font-weight: bold;
}
</style>
