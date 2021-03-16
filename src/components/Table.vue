<template>
  <div ref="chart" class="line-chart"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { format, subDays } from 'date-fns'
import { newsCountList } from '@/api/api'
import * as echarts from 'echarts/core'
import {
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import {
  CanvasRenderer,
  SVGRenderer
} from 'echarts/renderers'
import {
  TitleComponent,
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption
} from 'echarts/components'

@Component
export default class Table extends Vue {
  todayDate = new Date()
  chart: any = null

  created () {
    const date = format(subDays(this.todayDate, 1), 'yyyy-MM-dd')
    this.$emit('emit-date', date)
  }

  mounted () {
    newsCountList().then(res => {
      // console.log(this.countList)
      this.initEcharts(res)
    })
  }

  initEcharts (dataList: []) {
    type ECOption = echarts.ComposeOption<LineSeriesOption|TooltipComponentOption|TitleComponentOption|GridComponentOption>
    echarts.use([TitleComponent, GridComponent, TooltipComponent, LineChart, SVGRenderer])
    const el: any = this.$refs.chart
    this.chart = echarts.init(el)
    const option: ECOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'cross',
          snap: true
        },
        formatter: (param: any) => {
          const item: any = dataList.find((item: {date: string; kw_date: []; nums: number}) => {
            return item.date === param.name
          })
          const kwList = JSON.parse(item.kw_date)
          const returnList = kwList.map((l: []) => {
            return l.map((kw: string) => {
              return '<div>' + kw + '</div>'
            }).join('')
          })
          returnList.forEach((str: string, index: number, arr: any) => {
            arr[index] = '<div style="color: red;">主题' + (index + 1) + ': </div>' + str
          })
          // console.log(returnList)
          return '<div class="tooltip">' + returnList.map((str: string) => {
            return '<div class="tooltip-row">' + str + '</div>'
          }).join('') + '</div>'
        }
      },
      xAxis: {
        type: 'category',
        data: dataList.map((item: {date: string; kw_date: []; nums: number}) => {
          return item.date
        })
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          snap: true,
          label: {
            precision: '0'
          }
        }
      },
      series: [
        {
          type: 'line',
          data: dataList.map((item: {date: string; kw_date: []; nums: number}) => {
            return item.nums
          }),
          symbolSize: 6
        }
      ]
    }
    this.chart.setOption(option)
    this.chart.on('click', (params: any) => {
      // console.log(params)
      this.$emit('emit-date', params.name)
      const option: ECOption = {
        series: [
          {
            symbol: (value: any, p: any) => {
              if (params.dataIndex === p.dataIndex) {
                return 'circle'
              } else {
                return 'emptyCircle'
              }
            },
            symbolSize: (value: any, p: any) => {
              if (params.dataIndex === p.dataIndex) {
                return 10
              } else {
                return 6
              }
            }
          }
        ]
      }
      this.chart.setOption(option)
    })
  }
}
</script>

<style lang="scss">
.line-chart{
  position: relative;
  height: 400px;
  width: 100%;
}
.tooltip{
  width: 280px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
}
.tooltip-row{
  display: flex;
  justify-content: space-between;
}
</style>
