<template>
  <div style="height: 100%; overflow: auto; background-color: #05112f">
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
    <div class="statistics_content_wrapper">
      <div class="statistics_content_body" v-for="item in dataList" :key="item.title">
        <!-- 统计标题 -->
        <div class="statistics_title">{{ item.title }}</div>
        <!-- 统计内容 -->
        <div class="statistics_content">
          <!-- 统计数量 -->
          <span class="statistics_content_num"
            >{{ item.count }}<span v-if="item.id === '3'">%</span>
          </span>
          &nbsp;
          <!-- 统计单位 -->
          <!--          <span class="statistics_content_unit">{{ item.unit }}</span>-->
        </div>
      </div>
    </div>
    <!--    <div ref="chart1Ref" class="chart1"></div>-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="110" />
      <el-table-column prop="name" label="广告名称" width="120" />
      <el-table-column prop="num" label="展现数" width="100" />
      <el-table-column prop="price" label="收益（钻石）" width="110" />
    </el-table>
    <div
      style="
        margin: 10px;
        background-color: rgba(70, 89, 101, 0.7);
        border-radius: 10px;
        padding: 6px;
        color: #fff;
        text-indent: 2em;
        line-height: 1.6;
      "
    >
      <p style="text-indent: 2em">
        此表格为公司盈利模式和每天公司盈利数据，方便代理对照参考，我司会在用户量增加到一定程度，陆续对接更多高质量，高价格广告厂商，来提供更多盈利分红给用户。陆续增加游戏板块，电商带货板块，正在开发中.....
      </p>
      <p style="text-indent: 2em">
        平台每日将拿出90%的自身广告收入，分红给持有股份的用户。公司只赚取有限的10%广告利润，实现良性可循环！
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getIsInApp } from '@/utils/getTopPadding'
import { axiosInstance as axios } from '@/utils/myrequest'

import * as echarts from 'echarts'
import { computed, onMounted } from 'vue'
import { Toast } from 'tdesign-mobile-vue'

const dataList = [
  {
    id: '1',
    title: '总展示数',
    count: computed(() => {
      return data.value.totalPreview || 0
    }),
    unit: '件'
  },
  {
    id: '2',
    title: '总点击数',
    count: computed(() => {
      return data.value.totalClick || 0
    }),
    unit: '件'
  },
  {
    id: '3',
    title: '总点击率',
    count: computed(() => {
      return data.value.totalClickPercent || '0.00'
    }),
    unit: '件'
  },
  {
    id: '4',
    title: '总收益',
    count: computed(() => {
      return data.value.total || 0
    }),
    unit: '钻石'
  }
]
const chart1Ref = ref()
const data = ref([])
const tableData = computed(() => {
  const date = data.value.date

  return (data.value.list || []).map((item) => {
    item.date = date
    return item
  })

  // return (data.value.list || []).reduce((prev, next) => {
  //   let arr = next.list.map((item) => {
  //     item.date = next.date
  //     return item
  //   })
  //   return prev.concat(arr)
  // }, [])
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
  Toast({
    theme: 'loading',
    message: '加载中...',
    duration: 0
  })
  axios.get('/dev/info/chart').then((res) => {
    Toast.clear()

    data.value = res.data
    // data.value = res.data
    // initChart()
  })
})
</script>
<style scoped lang="less">
.chart1 {
  width: 100%;
  height: 300px;
}
.statistics_content_wrapper {
  width: calc(100% - 10px);
  height: 80px;
  margin: 20px 0;
  //margin: 20px auto 20px;

  // TODO 外边距合并问题
  border: 1px solid transparent;

  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  .statistics_content_body {
    width: 25%;
    height: 74px;
    //margin: auto;
    background: url('./images/statistics_bg.png') no-repeat center center/ 100% 100%;
    padding-left: 8px;
    .statistics_title {
      margin-top: 5px;
      font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
    }

    .statistics_content {
      height: 100%;
      // 宽度自适应
      width: fit-content;
      margin: -15px auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('./images/content_bg.png') no-repeat center;
      background-size: 72px 50px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -10px;
        background: url('./images/content_left.png') no-repeat center center / 100% 100%;
        height: 33px;
        width: 10px;
      }

      &::after {
        content: '';
        position: absolute;
        right: -10px;
        background: url('./images/content_right.png') no-repeat center center / 100% 100%;
        height: 33px;
        width: 10px;
      }

      .statistics_content_num {
        background-color: transparent;
        font-family:
          Arial Negreta,
          serif;
        font-size: 18px;
        font-weight: 700;
        line-height: normal;
        text-align: center;
        color: #0adaea;
      }

      .statistics_content_unit {
        background-color: transparent;
        font-family: PingFangSC-Regular, serif;
        font-size: 20px;
        font-weight: 400;
        line-height: normal;
        text-align: center;
        color: #ffffff;
        position: relative;
      }
    }
  }
}
</style>
