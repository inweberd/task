<template>
  <div style="height: 100%; overflow: auto">
    <van-nav-bar
      title="收入来源"
      safe-area-inset-top
      fixed
      :class="{ inApp: getIsInApp() }"
      placeholder
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <div ref="chart1Ref" class="chart1"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="110" />
      <el-table-column prop="name" label="广告名称" width="120" />
      <el-table-column prop="num" label="展现数" width="100" />
      <el-table-column prop="price" label="收益（元）" width="110" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'
import { closeToast, showLoadingToast } from 'vant'

import * as echarts from 'echarts'
import { computed, onMounted } from 'vue'

const chart1Ref = ref()
const data = ref([])
const tableData = computed(() => {
  return data.value.reduce((prev, next) => {
    let arr = next.list.map((item) => {
      item.date = next.date
      return item
    })
    return prev.concat(arr)
  }, [])
})

const initChart = () => {
  var myChart = echarts.init(chart1Ref.value)
  let max = 0
  const list = data.value.map((item) => {
    if (item.total > max) {
      max = item.total
    }
    return {
      name: item.date,
      value: item.total
    }
  })
  const option1 = {
    title: {
      text: '总收益',
      textStyle: {
        color: '#000',
        fontSize: 25
      },
      top: '10%',
      left: 'center'
      // 		right: '5%'
    },
    grid: {
      left: '16%',
      top: '25%',
      bottom: '30%',
      right: '10%'
    },
    xAxis: {
      // name: 'X',
      nameTextStyle: {
        color: '#333333',
        padding: [0, 0, 0, 20]
      },
      show: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#7bb4dc',
          shadowColor: 'rgba(91,100,134,1)',
          shadowOffsetX: '20'
        },
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 25]
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisLabel: {
        show: true,
        // rotate: -1,
        textStyle: {
          fontSize: 14,
          // fontFamily: PangMenZhengDao,
          fontWeight: 600,
          color: '#000'
        }
      },
      axisTick: {
        show: false
      },
      // 		data: ['物业纠纷', '其他合同', '道路交通']
      data: list.map((val) => {
        return val.name
      })
    },
    yAxis: [
      {
        nameTextStyle: {
          color: '#333333',
          padding: [0, 0, 0, 20]
        },
        max: parseInt(max / 10000) * 10000 + 10000,
        min: 0,
        splitNumber: (123 % 5).toFixed(0),
        show: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 15],
          lineStyle: {
            // color: 'rgba(255, 129, 109, 0.1)',
            width: 1, //这里是为了突出显示加上的
            color: '#7bb4dc',
            shadowColor: 'rgba(91,100,134,1)'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 12,
            // fontFamily: PangMenZhengDao,
            fontWeight: 600,
            color: '#000'
          }
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(255,255,255,.5)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#cfe9f9',
            width: 1,
            type: 'solid'
          }
        }
      }
    ],
    series: [
      {
        type: 'pictorialBar',
        barCategoryGap: '-20%',
        /*多个并排柱子设置柱子之间的间距*/
        // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 6.5,5 5,5 C3.5,5 4.5,10 0,10 z',
        label: {
          show: true,
          position: 'top',
          distance: 10,
          color: '#000',
          fontWeight: 'bolder',
          fontSize: 12
        },
        itemStyle: {
          // normal: {
          //   color: {
          //     type: 'linear',
          //     x: 0,
          //     y: 0,
          //     x2: 0,
          //     y2: 1,
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: '#3b89f4',
          //       },
          //       {
          //         offset: 1,
          //         color: '#cce7fc',
          //       },
          //     ],
          //     global: false, //  缺省为  false
          //   },
          // },
          // emphasis: {
          //   opacity: 1,
          // },
          normal: {
            color: (params) => {
              const colorList = [
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#297ff2'
                    },
                    {
                      offset: 1,
                      color: '#cce7fc'
                    }
                  ]
                },
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3bfafe'
                    },
                    {
                      offset: 1,
                      color: '#aaf4fe'
                    }
                  ]
                },
                {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#e08440'
                    },
                    {
                      offset: 1,
                      color: '#decabd'
                    }
                  ]
                }
              ]
              return colorList[params.dataIndex]
            },
            opacity: 0.7
          },
          // 鼠标移入柱子上 透明度变为 1
          emphasis: {
            opacity: 1
          }
        },
        data: list.map((v) => {
          return v.value
        })
        // data: [123, 60, 25]
      }
    ]
  }
  myChart.setOption(option1)
}
onMounted(() => {
  showLoadingToast({
    duration: 0,
    message: '加载中'
  })
  axios.get('/dev/info/chart').then((res) => {
    closeToast()
    data.value = res.data
    initChart()
  })
})
</script>
<style scoped>
.chart1 {
  width: 100%;
  height: 300px;
}
</style>
