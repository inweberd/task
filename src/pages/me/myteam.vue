<template>
  <div class="investClass">
    <div class="user_box">
      <div class="top-content">
        <div style="height: 65px"></div>
        <div class="userA">
          <div class="nav_active">
            <img :src="userInfo.avatar || defaultAvatar" />
          </div>
          <div class="nav_title">
            <div class="nav_title_img">
              <span>
                <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
                <template v-else>
                  {{
                    userInfo.phone
                      ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                      : ''
                  }}
                </template>
              </span>
              <img
                draggable="false"
                src="https://lx.aosenn.com//uploads/20230313/19d24c7d60f97599983aa79a7364aa4d.png"
              />
            </div>
            <div class="nav_title_tel">
              我的ID： {{ userInfo?.id }}
              <span style="margin-left: 7px">邀请码:{{ userInfo?.invite?.code }}</span>
            </div>
            <div class="nav_title_tel">
              商人等级：
              {{ myStaffList.length ? myStaffList[myStaffList.length - 1].vip.name : '暂无等级' }}
              <span style="margin-left: 7px"
                >上墙等级:
                {{
                  jubaopenList.length
                    ? jubaopenList[jubaopenList.length - 1].climbLadderId + '层'
                    : '暂无等级'
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="content">
          <p
            class="text2"
            style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin-left: 50px"
          >
            <!--              升级服务商 收益上涨100%-->
          </p>
          <p class="text3" @click="$router.push('/invest')">立即升级</p>
        </div>
      </div>

      <!--      <div class="content-wrapper" style="margin-top: 35px">-->
      <!--        <div class="function-area renwu">-->
      <!--          <div class="list">-->
      <!--            <div class="items">-->
      <!--              <p>-->
      <!--                {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}-->
      <!--              </p>-->
      <!--              <p>通用点券</p>-->
      <!--            </div>-->
      <!--            <div class="items">-->
      <!--              <p>{{ (userIncomeInfo.today || 0).toFixed(2) }}</p>-->
      <!--              <p>今日收益</p>-->
      <!--            </div>-->
      <!--            <div class="items">-->
      <!--              <p>{{ (userIncomeInfo.total || 0).toFixed(4) }}</p>-->
      <!--              <p>历史收益</p>-->
      <!--            </div>-->
      <!--            <div class="items">-->
      <!--              <p>{{ walletInfo?.amount || 0 }}</p>-->
      <!--              <p>绑钻数量</p>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="false" class="content-wrapper">
        <div class="function-area shouyi">
          <div class="list">
            <div class="items">
              <p>累计任务收益</p>
              <p>￥0.00</p>
            </div>
            <div class="items">
              <p>可提现</p>
              <p>￥0.00</p>
            </div>
            <div class="btns"><div class="btn2">立即提现</div></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <van-cell style="margin-bottom: 10px">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-icon color="#000" name="gem-o" />
            <span style="padding-left: 6px">开启转赠权限</span>
          </template>
          <template #right-icon>
            <van-switch v-model="walletInfo.wallet.transfer" size="20px" @change="shoukuanChange" />
          </template>
        </van-cell>

        <div v-if="false" class="function-area">
          <div class="title flex">
            <div class="left">我的任务</div>
            <div class="right">
              所有任务
              <div class="img-box">
                <img
                  draggable="false"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAYAAAASYli2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNGRjIzNTMwRDRDMzExRUI4ODQ5OEE5MzI2NjcyNEI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNGRjIzNTMxRDRDMzExRUI4ODQ5OEE5MzI2NjcyNEI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0ZGMjM1MkVENEMzMTFFQjg4NDk4QTkzMjY2NzI0QjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0ZGMjM1MkZENEMzMTFFQjg4NDk4QTkzMjY2NzI0QjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rSA6XAAAB5klEQVR42qSWTUhUURiGrzlSuagWttJcRcjQIiRatPAnjH4IS2whGGEtBkEMspaKitssyoXNLKxFgoIhijAQ6VBoCwkJighp5c+qNikYkWbPB69wFRdzv/vCA/Myw3O5nPOdMwXpdPpYEATTcAia4HMQIalUalc/AGVQCUmYhfNBjJjwCzxUPwJv4XIcoaUf7sI/OAyTen230PICbsJfKIJhaI0jtIzrddf13SB0xhFaZqAOfqr3wWMo8Aot81ANq+r3YQgKvULLV22h7+ot8BoOeoWWJUk/qV+HrLaXS2j5ATXwXr1Wk3XcK7T8giswpX5WDyjzCi0b0ACv1CvgQyaTOeUVWjbhNgyon4A5pJVeoWUb7kGPegnkkFZ7hTvplXjnUMkiLY8jDOKs8n7phmf6vGa7gMN2KeEQ2Uw/hXZ1m/lLyBasRBUmdMzdUl+2gwTZYvgH+aYYRuGa+je4iGxl7xPzyVGd4lXqH+GqxjKIKrSZfQNn1HNwQwsReZXLbbxCsgnN9Jpn2yQlO6n+Ehrhj2cfnoN3UKr+RLfilmdjX9DdXKLeBR2a4bz2VTgN2hpFuqPb4Ll39O7AmGR2NzdHlYWFD3SrWf8N9TDiGXB75dPwKDzkWt3AK7TRWfD+ndub/wIMAARDZ7lFLF6hAAAAAElFTkSuQmCC"
                />
              </div>
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="img-wrapper"><p style="font-size: 17px; font-weight: bold">0</p></div>
              <div>待提交</div>
            </div>
            <div class="item">
              <div class="img-wrapper"><p style="font-size: 17px; font-weight: bold">0</p></div>
              <div>待审核</div>
            </div>
            <div class="item">
              <div class="img-wrapper"><p style="font-size: 17px; font-weight: bold">0</p></div>
              <div>已成功</div>
            </div>
            <div class="item">
              <div class="img-wrapper"><p style="font-size: 17px; font-weight: bold">0</p></div>
              <div>已失败</div>
            </div>
          </div>
          <div class="title flex">
            <div class="left">我发布的任务</div>
            <div class="right">
              发布/管理任务
              <div class="img-box">
                <img
                  draggable="false"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAYAAAASYli2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNGRjIzNTMwRDRDMzExRUI4ODQ5OEE5MzI2NjcyNEI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNGRjIzNTMxRDRDMzExRUI4ODQ5OEE5MzI2NjcyNEI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0ZGMjM1MkVENEMzMTFFQjg4NDk4QTkzMjY2NzI0QjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0ZGMjM1MkZENEMzMTFFQjg4NDk4QTkzMjY2NzI0QjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rSA6XAAAB5klEQVR42qSWTUhUURiGrzlSuagWttJcRcjQIiRatPAnjH4IS2whGGEtBkEMspaKitssyoXNLKxFgoIhijAQ6VBoCwkJighp5c+qNikYkWbPB69wFRdzv/vCA/Myw3O5nPOdMwXpdPpYEATTcAia4HMQIalUalc/AGVQCUmYhfNBjJjwCzxUPwJv4XIcoaUf7sI/OAyTen230PICbsJfKIJhaI0jtIzrddf13SB0xhFaZqAOfqr3wWMo8Aot81ANq+r3YQgKvULLV22h7+ot8BoOeoWWJUk/qV+HrLaXS2j5ATXwXr1Wk3XcK7T8giswpX5WDyjzCi0b0ACv1CvgQyaTOeUVWjbhNgyon4A5pJVeoWUb7kGPegnkkFZ7hTvplXjnUMkiLY8jDOKs8n7phmf6vGa7gMN2KeEQ2Uw/hXZ1m/lLyBasRBUmdMzdUl+2gwTZYvgH+aYYRuGa+je4iGxl7xPzyVGd4lXqH+GqxjKIKrSZfQNn1HNwQwsReZXLbbxCsgnN9Jpn2yQlO6n+Ehrhj2cfnoN3UKr+RLfilmdjX9DdXKLeBR2a4bz2VTgN2hpFuqPb4Ll39O7AmGR2NzdHlYWFD3SrWf8N9TDiGXB75dPwKDzkWt3AK7TRWfD+ndub/wIMAARDZ7lFLF6hAAAAAElFTkSuQmCC"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xuanshang">
        <div class="imgaa">
          <div
            style="
              background-image: url('https://lx.aosenn.com/h5/static/user/img_bga.png');
              background-position: 0% 0%;
              background-size: 100% 100%;
              background-repeat: no-repeat;
            "
          ></div>
        </div>
        <div class="xuanshang_box">
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 14px; color: rgb(255, 255, 255); margin: 14px 0px 0px 19px">
              我的钱包
            </div>
            <div
              style="
                font-size: 12px;
                margin-top: 15px;
                margin-right: 26px;
                color: rgb(255, 255, 255);
              "
              @click="$router.push('/wallet')"
            >
              进入钱包&gt;
            </div>
          </div>
          <div class="money" style="font-size: 13px">
            <div class="walletInfo">
              <div style="font-weight: bold">
                {{ (userIncomeInfo.todayIncome / 10 || 0).toFixed(2) }}
              </div>
              <div style="margin-top: 14px">今日收益</div>
            </div>
            <div class="walletInfo">
              <div style="font-weight: bold">
                {{ (userIncomeInfo.totalIncome / 10 || 0).toFixed(2) }}
              </div>
              <div style="margin-top: 14px">历史收益</div>
            </div>
            <div class="walletInfo">
              <div style="font-weight: bold">
                {{ (walletInfo.wallet?.points / 10 || 0).toFixed(2) }}
              </div>
              <div style="margin-top: 14px">可用点券</div>
            </div>
            <div class="walletInfo">
              <div style="font-weight: bold">
                {{ (walletInfo.wallet?.balance || 0).toFixed(2) }}
              </div>
              <div style="margin-top: 14px">充值余额</div>
            </div>
            <!--            <div class="walletInfo">-->
            <!--              <div style="font-weight: bold">0.00</div>-->
            <!--              <div style="margin-top: 14px">保证金</div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>

      <div style="width: 92%; margin: 10px auto 0px; position: relative">
        <div class="swiper_box">
          <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
            <van-swipe-item>
              <img alt="" src="./images/quanminfenxiang.png" @click="$router.push('/me/my-card')" />
            </van-swipe-item>
            <!--            <van-swipe-item>-->
            <!--              <img-->
            <!--                alt=""-->
            <!--                src="https://lx.aosenn.com//uploads/20240312/b1cf54aec769b3bcd54b8af59ec0c98c.png"-->
            <!--              />-->
            <!--            </van-swipe-item>-->
            <!--            <van-swipe-item>-->
            <!--              <img-->
            <!--                alt=""-->
            <!--                src="https://lx.aosenn.com//uploads/20240312/e52e49ac7f835ef671aff4fec3561cb1.png"-->
            <!--            /></van-swipe-item>-->
          </van-swipe>
        </div>
        <div class="serveList" style="padding-bottom: 30px">
          <div
            style="
              font-size: 14px;
              color: rgb(51, 51, 51);
              margin: 10px 7px 0px 16px;
              font-weight: 600;
            "
          >
            实用服务
          </div>
          <div class="serve">
            <!--            <div-->
            <!--              class="serveItem"-->
            <!--              style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--              @click="$router.push('/jubaopen')"-->
            <!--            >-->
            <!--              <div style="width: 30px; height: 30px">-->
            <!--&lt;!&ndash;                <img draggable="false" src="./images/33.png" />&ndash;&gt;-->
            <!--                <img draggable="false" src="@/pages/home/home-image/canyujieti.jpg" />-->
            <!--              </div>-->
            <!--              <div style="font-size: 13px">参与阶梯</div>-->
            <!--              &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;-->
            <!--            </div>-->
            <!--              <div-->
            <!--                  class="serveItem"-->
            <!--                  style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--                  @click="$router.push('/conversion')"-->
            <!--              >-->
            <!--                  <div style="width: 30px; height: 30px">-->
            <!--&lt;!&ndash;                     <img draggable="false" src="./images/22.png" />&ndash;&gt;-->
            <!--                      <img draggable="false" src="@/pages/home/home-image/zhuanzeng.png" />-->

            <!--                  </div>-->
            <!--                  <div style="font-size: 13px">转赠</div>-->
            <!--              </div>-->
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="$router.push('/invest')"
            >
              <div style="width: 30px; height: 30px">
                <img draggable="false" src="https://lx.aosenn.com/h5/static/user/ww6.png" />
                <!--                <img draggable="false" src="@/pages/home/home-image/dingshangquanyi.png" />-->
              </div>
              <div style="font-size: 13px">顶商特权</div>
            </div>
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="$router.push('/dianziqianbao')"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="https://lx.aosenn.com/h5/static/user/ww10.png" />
              </div>
              <div style="font-size: 13px">电子实名认证</div>
              <!----><!---->
            </div>
            <!--              <div-->
            <!--                  class="serveItem"-->
            <!--                  style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--                  @click="$router.push('/invest')"-->
            <!--              >-->
            <!--                  <div style="width: 30px; height: 30px">-->
            <!--                      <img draggable="false" src="@/pages/home/home-image/dataoshayouxi.jpg" />-->

            <!--                  </div>-->
            <!--                  <div style="font-size: 13px">大逃杀</div>-->
            <!--              </div>-->
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="loadShangXian"
            >
              <div style="width: 30px; height: 30px">
                <!--                <img draggable="false" src="@/pages/home/home-image/fabuguanggao.jpg" />-->
                <img draggable="false" src="./images/huiyuantequan.png" />
              </div>
              <div style="font-size: 13px">发布广告</div>
            </div>
            <div
              @click="goQQ"
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="./images/jiaoliu.png" />
              </div>
              <div style="font-size: 13px">转赠交易QQ群</div>
              <!----><!---->
            </div>
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="$router.push('/wallet')"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="./images/77.png" />
              </div>
              <div style="font-size: 13px">收入详情</div>
              <!----><!---->
            </div>
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="$router.push('/teamStat')"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="./images/66.png" />
              </div>
              <div style="font-size: 13px">我的团队</div>
              <!----><!---->
            </div>
            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="$router.push('/me/my-card')"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="https://lx.aosenn.com/h5/static/user/w36.png" />
              </div>
              <div style="font-size: 13px">分享好友</div>
              <!----><!---->
            </div>

            <div
              class="serveItem"
              style="width: 25%; text-align: center; margin-top: 20px; position: relative"
              @click="goDownload"
            >
              <div style="width: 30px; height: 30px">
                <!----><img draggable="false" src="./images/99.png" />
              </div>
              <div style="font-size: 13px">下载APP</div>
              <!----><!---->
            </div>

            <!--            <div-->
            <!--              class="serveItem"-->
            <!--              style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--            >-->
            <!--              <div style="width: 30px; height: 30px">-->
            <!--                &lt;!&ndash;&ndash;&gt;<img draggable="false" src="https://lx.aosenn.com/h5/static/user/w1.png" />-->
            <!--              </div>-->
            <!--              <div style="font-size: 13px">悬赏管理</div>-->
            <!--              &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;-->
            <!--            </div>-->

            <!--            <div-->
            <!--              class="serveItem"-->
            <!--              style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--            >-->
            <!--              <div style="width: 30px; height: 30px">-->
            <!--                &lt;!&ndash;&ndash;&gt;<img draggable="false" src="https://lx.aosenn.com/h5/static/user/ww5.png" />-->
            <!--              </div>-->
            <!--              <div style="font-size: 13px">意见反馈</div>-->
            <!--              &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;-->
            <!--            </div>-->

            <!--            <div-->
            <!--              class="serveItem"-->
            <!--              style="width: 25%; text-align: center; margin-top: 20px; position: relative"-->
            <!--            >-->
            <!--              <div style="width: 30px; height: 30px">-->
            <!--                &lt;!&ndash;&ndash;&gt;<img draggable="false" src="https://lx.aosenn.com/h5/static/user/ww9.png" />-->
            <!--              </div>-->
            <!--              <div style="font-size: 13px">消息列表</div>-->
            <!--              &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <!----><!---->
    </div>
    <div v-if="false" class="info">
      <div class="info-r" style="position: relative">
        <div class="b">
          <p>代理等级 : {{ userInfo?.result?.staff?.name || '暂无等级' }}</p>
        </div>
        <div class="b">
          <p>
            天梯等级 :
            {{
              userInfo?.result?.treasure?.bind_id
                ? userInfo?.result?.treasure?.bind_id + '级'
                : '暂无'
            }}
          </p>
        </div>
      </div>
    </div>
    <div
      style="
        padding: 0 10px;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        left: 0;
        top: 1120px;
        z-index: 2;
      "
    ></div>

    <!--    <div class="container">-->
    <el-button
      class="w-100"
      color="#00f7c4"
      size="large"
      style="
        width: 100%;
        border-radius: 15px;
        margin-top: 10px !important;
        color: #fff;
        background-color: rgb(244, 200, 41);
        border: 1px solid transparent !important;
      "
      type="primary"
      @click="logout"
    >
      退出登录
    </el-button>
    <!--    </div>-->
    <BaseFooter :is-white="false" v-bind:init-tab="6" />
    <!--    <div class="contact" @click="jumpToQQ">-->
    <!--      <div>-->
    <!--        <div>联系</div>-->
    <!--        <div>客服</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <TipDialog
      v-model="showGonggaoOverlay"
      confirm-text="点击下载海鸥"
      @confirm="handleGonggaoConfirm"
    >
      <div style="padding: 20px">
        <img alt="" src="@/assets/img/weimaiquan.jpg" style="width: 100%" />
        <p style="color: red; width: 100%; text-align: center">
          如遇到无法下载海鸥，<span style="text-decoration: underline" @click="copy"
            >点我复制下载链接</span
          >
        </p>
      </div>
    </TipDialog>
    <TipDialog
      v-model="updateOverlay"
      :show-close="false"
      confirm-text="进入官方群"
      @confirm="handleUpdateOverlayConfirm"
    >
      <!--      <p-->
      <!--        style="-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #fff;-->
      <!--          font-weight: bolder;-->
      <!--          margin-top: 10px;-->
      <!--        "-->
      <!--      >-->
      <!--        已为您自动更新以下内容-->
      <!--      </p>-->
      <!--      <div style="color: #ddd; padding: 18px">-->
      <!--        <p>1、优化解决0撸用户看普通视频间歇性无收益问题。</p>-->
      <!--        <p>2、优化会员等级界面显示ui</p>-->
      <!--        <p style="font-weight: bolder; color: #fff">3、广告旺季来临，提高会员日收入</p>-->
      <!--        <p>4、陆续增加游戏板块</p>-->
      <!--        <p>5、代理推广提升，推广8代奖励，星级无限代奖励</p>-->
      <!--      </div>-->
      <p
        style="
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
          margin-top: 10px;
        "
      >
        重要公告
      </p>
      <div style="color: #ddd; padding: 18px">
        <p>
          官方群大量团队长，老板24小时不间断收元宝，进入官方群，元宝互转交易<span
            style="font-weight: bolder; color: #fff"
            >为您免去每日兑换的手续费！
          </span>
        </p>
      </div>
    </TipDialog>

    <TipDialog
      v-model="goJiangshangjiangOverlay"
      :show-close="false"
      confirm-text="已阅"
      @confirm="
        () => {
          goJiangshangjiangOverlay = false
          go('/yongjinjiajiang')
        }
      "
    >
      <p
        style="
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
          margin-top: 10px;
        "
      >
        重要公告
      </p>
      <div style="color: #ddd; padding: 18px">
        <p>
          官方群大量团队长，老板24小时不间断收元宝，进入官方群，元宝互转交易<span
            style="font-weight: bolder; color: #fff"
            >为您免去每日兑换的手续费！
          </span>
        </p>
      </div>
    </TipDialog>
    <TipDialog
      v-model="goDepOverlay"
      :show-close="false"
      confirm-text="已阅"
      @confirm="
        () => {
          goDepOverlay = false
          go('/dep')
        }
      "
    >
      <p
        style="
          text-align: center;
          font-size: 18px;
          color: #fff;
          font-weight: bolder;
          margin-top: 10px;
        "
      >
        重要公告
      </p>
      <div style="color: #ddd; padding: 18px">
        <p>
          官方群大量团队长，老板24小时不间断收元宝，进入官方群，元宝互转交易<span
            style="font-weight: bolder; color: #fff"
            >为您免去每日兑换的手续费！
          </span>
        </p>
      </div>
    </TipDialog>
  </div>
</template>

<script lang="ts" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { computed, onActivated, onDeactivated, onMounted, ref } from 'vue'
import defaultAvatar from '@/assets/img/logo.png'
import {
  getAlreadyBuyTreasureBasin,
  logout as fnlogout,
  reqAdvertisingCount,
  reqAdvertisingSinglePrice,
  reqMyStaff,
  reqNgTransfer,
  reqQuickReceive,
  reqUpdateWalletAuth,
  reqUserCount,
  reqUserIncome,
  reqUserInfo,
  reqWalletInfo
} from '@/api/myApi'
import { loadInteraction, wxLogin } from '@/utils/ad'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import weimaiquan from '@/assets/img/weimaiquan.jpg'
import { closeToast, showDialog, showToast } from 'vant'
import { getSerialName } from '../../utils/getSerialName'
import { Toast } from 'tdesign-mobile-vue'
import bus from '@/utils/bus'
import { getIsInApp } from '@/utils/getTopPadding'
import { copyToClipboard } from '@/utils/copyToClipboard'

const router = useRouter()
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent)
const showRenzheng = computed(() => {
  if (window.android && window.android.getVersionCode && !userInfo.value.avatar) {
    return true
  } else {
    return false
  }
})
const renzheng = (avatar) => {
  // if (avatar) {
  //   return
  // }
  wxLogin()
}
const goQQ = () => {
  window.location.href = 'https://qm.qq.com/q/JXgJRgIn8O'
}
const showGonggaoOverlay = ref(false)

const shoukuanChange = () => {
  reqUpdateWalletAuth({
    transfer: walletInfo.value.wallet.transfer
  })
}

const updateOverlay = ref(false)
const goJiangshangjiangOverlay = ref(false)
const goDepOverlay = ref(false)
const handleGonggaoConfirm = () => {
  showGonggaoOverlay.value = false
  window.location.href = 'https://www.haiouchat.com'
}
const copy = () => {
  copyToClipboard('https://www.haiouchat.com', '复制成功，请在浏览器打开此链接！')
  showGonggaoOverlay.value = false
}
const loadShangXian = () => {
  // if (!window?.android?.initQie) {
  //   return showToast('请下载最新版本APP体验！')
  // }
  showToast('等待上线！')
}
const userIncomeInfo = ref({})
const walletInfo = ref({ wallet: { transfer: null } })
const star = ref(0)
const userCount = ref(0)
const myStaffList = ref([])
const jubaopenList = ref([])
const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const showWeimaiquan = () => {
  showImagePreview({
    images: [weimaiquan]
  })
}
const goDep = () => {
  const firstClickDep = sessionStorage.getItem('firstClickDep')
  if (!firstClickDep) {
    sessionStorage.setItem('firstClickDep', '1')
    goDepOverlay.value = true
  } else {
    go('/dep')
  }
}

const goJiangshangjiang = () => {
  const firstClickJiang = sessionStorage.getItem('firstClickJiang')
  if (!firstClickJiang) {
    sessionStorage.setItem('firstClickJiang', '1')
    goJiangshangjiangOverlay.value = true
  } else {
    go('/yongjinjiajiang')
  }
}

const getMyStaff = () => {
  myStaffList.value = []
  jubaopenList.value = []

  reqMyStaff().then((res) => {
    if ((res.data?.data || []).length) {
      myStaffList.value = res.data.data
      console.log('reqMyStaff', res.data.data)
    }
  })

  getAlreadyBuyTreasureBasin().then((res) => {
    if ((res.data?.data || []).length) {
      jubaopenList.value = res.data.data.sort((a, b) => {
        return a.level - b.level
      })
    }
  })
}

const getShouyi = () => {
  if (!userInfo.value?.result?.staff?.id) {
    Toast.clear()

    showDialog({
      message: '开通会员即可一键获取佣金！'
    }).then(() => {
      router.push('/invest')
    })
    return
  }
  reqQuickReceive().then((res) => {
    Toast.clear()

    if (res.code !== 200) {
      return _notice(res.msg)
    }
    if (!res.data.price) {
      showDialog({
        message: '今日已领取过，明日再来吧！'
      })
      return
    }
    if (res.data.price) {
      showDialog({
        message: '今日权益卡生效：获得' + res.data.price + '元, 视频任务已自动进入机器人队列!'
      })
      return
    }
  })
}
const getUserIncome = (cb?) => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
    cb && cb()
  })
}

const getUserCount = () => {
  reqUserCount().then((res) => {
    if (res.code === 200) {
      userCount.value = res.data
    }
  })
}
const init = async () => {
  getUserIncome()
  // getUserCount()
}

async function logout() {
  window.localStorage.removeItem('userInfo')
  window.localStorage.removeItem('token')
  await fnlogout()
  // window.location.reload()
  router.push('/common/sign-in')
}

function go(e, interaction = false) {
  // interaction && loadInteraction()
  router.push(e)
}

function jumpToQQ() {
  // router.push('/weimaiquanDetail')
  showGonggaoOverlay.value = true
  // window.location.href = decodeURIComponent('https://qm.qq.com/q/oVkcjwfykS')
}

function go2(val1, val2) {
  // loadInteraction()
  console.log(val1, val2)
  router.push({ path: '/article', query: { id: val2.id } })
  // router.push(e)
}

function goDownload() {
  try {
    // state.loading.app = true

    // const { VITE_APP_URL } = import.meta.env
    // 跳转下载
    window.location.href = `https://qyh.88tong.cn/download`
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}
const handleUpdateOverlayConfirm = () => {
  updateOverlay.value = false
  showGonggaoOverlay.value = true
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.edujia.weimai'
  // window.location.href = 'https://www.haiouchat.com'
}
const goFenHong = () => {
  router.push('/fenhong')
}
const shengyukelinqqu = ref(0)
const getNewUserInfo = () => {
  // reqUserInfo({ id: userInfo.value.id }).then((res) => {
  //   if (res.code !== 200) {
  //     return _notice(res.msg)
  //   }
  //   userInfo.value = res.data
  //   window.localStorage.setItem('userInfo', JSON.stringify(res.data))
  //
  //   // 如果是会员 查询股东星级
  //   if (userInfo.value?.result?.staff?.serial) {
  //     let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice()]
  //     Promise.all(arr).then((res) => {
  //       let todayshengyuCount = 100 - res[0]?.data?.ordinary,
  //         price = res[1]?.data?.price
  //       shengyukelinqqu.value = Math.max(0, (todayshengyuCount * price).toFixed(2))
  //     })
  //   }
  //   // reqUserStaff().then((res) => {
  //   //   // if (res.code !== 200) {
  //   //   //   return _notice(res.msg)
  //   //   // }
  //   //   star.value = res.data.star || 0
  //   // })
  // })

  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
}

const yijianlingqu = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const userId = userInfo?.id
  const serial = userInfo?.result?.staff?.serial
  if (!serial) {
    showDialog({
      message: '成为代理，每天收益不间断!'
    }).then(() => {
      router.push('/invest')
    })
    return
  }
}
const toMySub = () => {
  // loadInteraction()
  router.push('/mysub')
}

const showTotal = ref(false)

const handleEyeClick = () => {
  showLoadingToast({
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // reqNgTransfer({ plat: 'ky' }).then((res) => {
  //   console.log('res', res)
  // })
  // reqNgTransfer().finally(() => {
  //   getUserIncome(() => {
  //     showTotal.value = true
  //     closeToast()
  //   })
  // })
}

onActivated(() => {
  // showGonggaoOverlay.value = true
  // updateOverlay.value = true
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  init()
  getNewUserInfo()
  getMyStaff()
  bus.on('userInfoChange', (data) => {
    userInfo.value = data
  })
})
onMounted(() => {
  updateOverlay.value = false
  // showGonggaoOverlay.value = true
})
onDeactivated(() => {
  showTotal.value = false
})
</script>

<style lang="less" scoped>
.investClass {
  position: relative;
  width: 100vw;
  height: calc(100% - 56px);
  box-sizing: border-box;
  //background-repeat: no-repeat;
  //background-image: url('@/assets/img/bg.png');
  //background-size: 100% auto;
  color: #303133;
  background-color: #f8f8f8;

  overflow-y: auto;

  .user_box {
    position: relative;
    background-color: #f8f8f8;
    .top-content {
      position: relative;
      background-image: url('@/assets/img/dianpuBG.png');
      background-position: 0% 0%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-bottom: 15px;

      .userA {
        position: relative;
        align-items: center;
        box-sizing: border-box;
        padding: 15px;
        padding-top: calc(0px + 15px);
        z-index: 2;
        margin-top: -10px;
        margin-right: 15px;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 30px;
        .nav_active {
          width: 55px;
          height: 55px;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0 0 5px #f2f2f2;
          float: left;
          img {
            width: 55px;
            height: 55px;
          }
        }

        .nav_title {
          width: 75%;
          position: relative;
          padding-left: 10px;
          box-sizing: border-box;
          font-weight: 700;
          float: left;
          .nav_title_img {
            margin-top: 4px;
            display: flex;
            align-items: center;
            color: #222;

            img {
              width: 20px;
              height: 20px;
              margin-left: 10px;
            }
          }

          .nav_title_tel {
            margin-top: 6px;
            font-size: 12px;
            font-weight: 700;
          }
        }
      }
    }
    .center {
      height: 50px;
      width: 92%;
      margin: 10px auto;
      margin-top: -30px;
      opacity: 1;
      border-radius: 5px 5px 0 0;
      //transform: translateY(-40px);
      .img1 {
        width: 100%;
        height: 100%;
        div {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        width: 100%;
        height: 100%;
        //position: absolute;
        //top: 0;
        //bottom: -5px;
        //left: 0;
        display: flex;
        position: relative;
        z-index: 2;
        align-items: center;
        justify-content: space-around;
        background: url('./images/myteam-invest-bg.png') no-repeat;
        background-size: 100% 100%;

        .text3 {
          color: #fff;
          font-size: 11px;
          background: #8252ff;
          border-radius: 11px;
          line-height: 22px;
          margin-left: 220px;
          padding: 0 6px;
          margin-right: 15px;
        }
      }
    }

    .content-wrapper {
      padding: 0 15px;

      .function-area {
        background-color: #fff;
        border-radius: 10px;

        .flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .title {
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 700;
          color: #333;
          height: 44px;
          line-height: 44px;
          padding: 0 15px;

          .left {
          }
          .right {
            color: #555;
            font-size: 13px;
            font-weight: 400;
            display: flex;
            align-items: center;

            .img-box {
              margin-left: 10px;
              width: 8px;
              display: flex;
              align-items: center;
              img {
                height: 12px;
                width: 100%;
              }
            }
          }
        }

        .list {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .item {
            font-size: 11px;
            color: #555;
            width: 20%;
            text-align: center;
            padding: 5px 6px 15px;

            .img-wrapper {
              position: relative;
              margin-bottom: 5px;
              white-space: nowrap;
              font-size: 13px;
            }
          }
        }
      }
      .renwu {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 15px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .list {
          width: 100%;
          .items {
            width: 25%;
            text-align: center;
            p:nth-child(1) {
              font-weight: 700;
              font-size: 15px;
            }
            p:last-child {
              color: #999;
              font-size: 13px;
              margin-top: 5px;
            }
          }
        }
      }

      .shouyi {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px 15px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background: #fed434;
        .list {
          width: 100%;

          .items {
            width: 33%;
            text-align: left;
            p:nth-child(1) {
              color: #666;
              font-size: 12px;
              margin-bottom: 5px;
            }
            p:last-child {
              font-weight: 700;
              font-size: 18px;
            }
          }
          .btns {
            display: flex;
            align-items: center;
            margin-left: auto;
            .btn2 {
              background: #383c45;
              margin-left: 10px;
              color: #fcca04;
              width: 70px;
              height: 30px;
              font-size: 13px;
              text-align: center;
              line-height: 30px;
              border-radius: 30px;
            }
          }
        }
      }
    }

    .xuanshang {
      width: 100%;
      height: 130px;
      margin: 5px auto;
      margin-top: 0;
      position: relative;
      background: #f8f8f8;
      padding-top: 10px;
      text-align: center;
      display: flex;
      justify-content: center;
      .imgaa {
        width: 92%;
        height: 100%;
        border-radius: 10px;
        div {
          width: 100%;
          height: 100%;
        }
      }

      .xuanshang_box {
        position: absolute;
        top: 10px;
        left: 5%;
        width: 90%;
        height: 100%;

        .money {
          width: 100%;
          display: flex;
          justify-content: space-around;
          text-align: center;
          margin-top: 20px;
        }
      }
    }

    .swiper_box {
      height: 80px;
      margin: 10px auto;
      overflow: hidden;
      border-radius: 8px;

      .my-swipe {
        .van-swipe-item {
          height: 80px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .serveList {
      background-color: #fff;
      margin: 10px auto;
      overflow: hidden;
      border-radius: 10px;

      .serve {
        display: flex;
        flex-wrap: wrap;
        .serveItem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .info {
    //background-color: #43465c;
    background: url('@/assets/img/main-bg.jpg') no-repeat;
    background-size: 100% 100%;

    display: flex;
    padding: 20px 20px 130px;

    .avatar {
      img {
        width: 80px;
        border-radius: 50%;
        height: 80px;
      }
    }

    .info-r {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .t {
        color: #fff;
        font-size: 18px;
      }

      .c {
        color: #ccc;
      }

      .b {
        display: flex;
        color: #ccc;
        fonnt-size: 12px;
      }
    }
  }

  .container {
    background-color: #f5f5f5;
    position: relative;
    border: 1px solid transparent;
    padding: 140px 10px 0;

    .total-box {
      margin-top: 10px;
      background-color: #f6f6f6;
      padding: 10px 10px;
      border-radius: 10px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;

          .qianbao {
            width: 40px;
          }

          .eye {
            width: 20px;
            margin-left: 4px;
          }

          span {
            font-weight: bolder;
            margin-left: 6px;
            font-size: 18px;
          }
        }

        .right {
          color: #a7a7a7;
          font-weight: bolder;
          font-size: 18px;
          padding-right: 6px;
        }
      }
    }
  }

  .list {
    margin-top: 10px;

    .list-item {
      color: rgb(50, 50, 51);
      padding-left: 2px;
      padding-right: 2px;
    }
  }

  .login_nav {
    margin-top: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    li {
      box-sizing: border-box;
      text-align: center;
      padding: 8px 0;
      margin: 6px;
      //border-radius: 50%;
      //background-color: rgba(26, 62, 84, 0.7);

      a {
        display: block;
        width: 100%;

        img {
          height: 33px;
        }

        p {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .LoginOut {
    padding: 0 12.6px 25px;

    .tabs_btn1 {
      margin-left: 2%;
      width: 96%;
      font-size: 15px;
      line-height: 37px;
      color: #666;
      text-align: center;
      background-color: rgba(26, 62, 84, 0.7);

      border: none;
    }
  }

  :deep(.van-cell) {
    //border-bottom: 1px solid #4d536a !important;
    padding-bottom: 5px;
    background-color: #fff;

    &::after {
      border: none !important;
    }
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.items-baseline {
  align-items: baseline;
}

.self-end {
  align-self: flex-end;
}

.flex-1 {
  flex: 1 1 0%;
}

.relative {
  position: relative;
}

.mt-12 {
  margin-top: 12px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

.ml-22 {
  margin-left: 22px;
}

.partner-info {
  background-image: url('./images/rect.png');
  margin: 10px 0;
  height: 32px;
  padding: 10px;
  border-radius: 13px;
  display: flex;
  justify-content: space-between;
}

.partner-banner {
  // position: absolute;
  padding: 5px;
  // top: 32px;
  width: 222px;
  height: 38px;
  background-color: #e5e0f6;
  border-radius: 13px;
  display: flex;
  align-items: center;
}

.partner-icon {
  width: 40px;
  height: 25px;
  margin-right: 10px;
}

.partner-text {
  display: flex;
  flex-direction: column;
  color: #6244be;

  img {
    width: 60px;
    height: 12px;
  }

  .subtext {
    padding-top: 5px;
    font-size: 10px;
    color: #9598a5;
  }
}

.contact {
  position: fixed;
  top: 80%;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #666;
  border-radius: 20px 0 0 20px;
  padding: 4px;
  box-shadow:
    0px 0.1px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.3px 5.3px rgba(0, 0, 0, 0.028),
    0px 0.5px 10px rgba(0, 0, 0, 0.035),
    0px 0.9px 17.9px rgba(0, 0, 0, 0.042),
    0px 1.7px 33.4px rgba(0, 0, 0, 0.05),
    0px 4px 80px rgba(0, 0, 0, 0.07);

  img {
    margin-right: 4px;
    width: 30px;
    height: 30px;
  }
}

.menu-icon {
  transform: scale(0.3) translateY(-25px);
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
</style>
