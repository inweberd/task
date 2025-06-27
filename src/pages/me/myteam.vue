<template>
  <div class="investClass">
    <!--    <van-nav-bar title="我的" safe-area-inset-top fixed placeholder />-->
    <div class="info">
      <div class="avatar" @click="renzheng(userInfo.avatar)">
        <img :src="userInfo.avatar || defaultAvatar" />
        <!--        <div v-if="!userInfo.avatar" style="color: #999">点击更改头像</div>-->
      </div>
      <!--      <p-->
      <!--        v-if="showRenzheng"-->
      <!--        style="color: red; width: 100%; text-align: center; transform: translateY(-8px)"-->
      <!--      >-->
      <!--        点击头像可更换微信微信头像-->
      <!--      </p>-->
      <div class="info-r" style="position: relative">
        <!--        <div class="edit" style="position: absolute; right: -30px; top: 0px; color: #fff">-->
        <!--          <van-button-->
        <!--            color="linear-gradient(to right, #fb5b4b, #9c38e5)"-->
        <!--            @click="go('/editInfo')"-->
        <!--            style="height: 25px"-->
        <!--          >-->
        <!--            修改昵称-->
        <!--          </van-button>-->
        <!--        </div>-->
        <div class="t">
          <template v-if="userInfo.nickname"> {{ userInfo.nickname }}</template>
          <template v-else>
            {{
              userInfo.phone
                ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                : ''
            }}
          </template>
        </div>
        <div class="c">
          <!--          <p>上级会员ID : {{ userInfo?.invite_id }}</p>-->
          <p>我的ID : {{ userInfo?.id }}</p>
        </div>
        <div class="b">
          <p>我的邀请码 : {{ userInfo?.result?.invite?.code }}</p>
        </div>
        <!--        <div class="b">-->
        <!--          <p>我的团队等级 : {{ walletInfo?.star || 0 }}星</p>-->
        <!--        </div>-->
        <div class="b">
          <p>代理等级 : {{ userInfo?.result?.staff?.name || '暂无会员' }}</p>
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
        top: 120px;
        z-index: 2;
      "
    >
      <van-notice-bar
        background="transparent"
        color="#fff"
        left-icon="volume-o"
        style="border-radius: 10px; height: 30px; border: 1px solid #fff; margin: 0px 4px 8px"
        text="钻石乐园拉新活动持续火热进行中！ 下级只要天梯达到7级， 就视为有效，3代奖励分别0.8 0.5 0.3钻石，达标自动发放！"
      >
      </van-notice-bar>
      <div class="money-box">
        <div class="total">
          <div class="l">
            <div class="txt1">通用钻石:</div>
            <div class="txt2">
              {{ userIncomeInfo?.wallet?.money ? userIncomeInfo?.wallet?.money.toFixed(2) : 0 }}
            </div>
          </div>
          <div class="r">
            <!--            <van-button-->
            <!--              class="btn"-->
            <!--              color="#fff"-->
            <!--              style="-->
            <!--                color: #1d9ae8;-->
            <!--                border: 1px solid #1d9ae8;-->
            <!--                width: 80px;-->
            <!--                border-radius: 30px;-->
            <!--                height: 30px;-->
            <!--              "-->
            <!--              @click="goDep"-->
            <!--            >-->
            <!--              兑换-->
            <!--            </van-button>-->
            <!--            <img-->
            <!--              src="./images/zhuanzeng.png"-->
            <!--              style="height: 30px"-->
            <!--              alt=""-->
            <!--              @click="$router.push('/conversion')"-->
            <!--            />-->
            <!--            <img-->
            <!--              src="./images/duihuan.png"-->
            <!--              style="height: 30px"-->
            <!--              alt=""-->
            <!--              @click="$router.push('/dep')"-->
            <!--            />-->
          </div>
        </div>
        <div class="total">
          <div class="l">
            <div class="txt1">今日已获得钻石:</div>
            <div class="txt2">
              {{ (userIncomeInfo.today || 0).toFixed(2) }}
            </div>
          </div>
          <!--          <div class="r">-->
          <!--            <img src="./images/zhuanzeng.png" style="height: 30px" alt="" />-->
          <!--          </div>-->
        </div>
        <div class="total">
          <div class="l">
            <div class="txt1">历史累计获得钻石:</div>
            <div class="txt2">
              {{ (userIncomeInfo.total || 0).toFixed(4) }}
            </div>
          </div>
        </div>
        <div class="total">
          <div class="l">
            <div class="txt1">绑钻数量:</div>
            <div class="txt2">
              {{ walletInfo?.amount || 0 }}
            </div>
          </div>
          <div class="r">
            <el-button
              @click="$router.push('/recharge')"
              style="border-radius: 15px; color: #fff; font-weight: bolder"
              type="primary"
            >
              购买绑钻
            </el-button>
            <el-button
              @click="$router.push('/invest')"
              style="border-radius: 15px; color: #fff; font-weight: bolder"
              type="primary"
              >兑换会员
            </el-button>
          </div>
        </div>
        <div class="border" v-if="false"></div>
        <div class="border2" v-if="false"></div>
        <div class="money-info" v-if="false">
          <p>
            <span class="title">今日已获得钻石</span>
            <span class="num">{{ (userIncomeInfo.today || 0).toFixed(4) }}</span>
          </p>
          <p>
            <span class="title">历史累计获得钻石</span>
            <span class="num">{{ (userIncomeInfo.total || 0).toFixed(4) }}</span>
          </p>
          <p>
            <span class="title">绑钻数量</span>
            <span class="num">{{ walletInfo?.amount || 0 }}</span>
          </p>
          <!--          <p>-->
          <!--            <span>{{ walletInfo?.amount || 0 }}</span>-->
          <!--            <span>充值余额</span>-->
          <!--          </p>-->
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>

    <div class="container">
      <img
        src="./images/fenxiangzhuanqian.png"
        alt=""
        style="width: 100%"
        @click="$router.push('/me/my-card')"
      />
      <!--      <div style="position: relative; margin-top: 10px" @click="yijianlingqu">-->
      <!--        <span-->
      <!--          style="-->
      <!--            position: absolute;-->
      <!--            top: 50%;-->
      <!--            left: 40px;-->
      <!--            transform: translateY(-50%);-->
      <!--            font-weight: bolder;-->
      <!--          "-->
      <!--        >-->
      <!--          今日预估钻石收入:{{ keLingQuYue }}-->
      <!--        </span>-->
      <!--        <img src="./images/yijianlingqu.png" alt="" style="width: 100%" />-->
      <!--      </div>-->
      <!--      <div class="huiyuanquanyi">-->
      <!--        <div class="title">钻石会员</div>-->
      <!--        <div class="list">-->
      <!--          &lt;!&ndash;          <div class="item">&ndash;&gt;-->
      <!--          &lt;!&ndash;            <img src="./images/zhekoushangcheng.png" alt="" />&ndash;&gt;-->
      <!--          &lt;!&ndash;            <span>折扣商城</span>&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <div class="item">&ndash;&gt;-->
      <!--          &lt;!&ndash;            <img src="./images/jifenduihuan.png" alt="" />&ndash;&gt;-->
      <!--          &lt;!&ndash;            <span>积分兑换</span>&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          <div class="item">-->
      <!--            <img src="./images/zhanghubaozhang.png" alt="" />-->
      <!--            <span>账户保障</span>-->
      <!--          </div>-->
      <!--          <div class="item" @click="$router.push('/invest')">-->
      <!--            <img src="./images/huiyuantequan.png" alt="" />-->
      <!--            <span>会员特权</span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="shionggongju">
        <div class="title">实用工具</div>
        <div class="list">
          <!--          <div class="item">-->
          <!--            <img src="./images/11.png" alt="" @click="$router.push('/caozuoshuoming')" />-->
          <!--            <span>玩法介绍</span>-->
          <!--          </div>-->

          <!--          <div class="item">-->
          <!--            <img src="./images/33.png" alt="" @click="$router.push('/demo')" />-->
          <!--            <span>账户保障</span>-->
          <!--          </div>-->

          <div class="item" @click="$router.push('/jubaopen')">
            <img src="./images/33.png" alt="" />
            <span>钻石天梯</span>
          </div>
          <div class="item" @click="$router.push('/invest')">
            <img src="./images/huiyuantequan.png" alt="" />
            <span>会员特权</span>
          </div>
          <div class="item">
            <img src="./images/66.png" alt="" @click="$router.push('/teamStat')" />
            <span>我的团队</span>
          </div>
          <div class="item">
            <img src="./images/77.png" alt="" @click="$router.push('/wallet')" />
            <span>收入明细</span>
          </div>
          <div class="item" @click="$router.push('/conversion')">
            <img src="./images/22.png" alt="" />
            <span>转赠</span>
          </div>
          <!--          <div class="item">-->
          <!--            <img src="./images/44.png" alt="" @click="$router.push('/dep')" />-->
          <!--            <span>兑换</span>-->
          <!--          </div>-->
          <div class="item">
            <img src="./images/99.png" alt="" @click="goDownload" />
            <span>下载APP</span>
          </div>

          <div class="item" @click="showGonggaoOverlay = true">
            <img src="./images/jiaoliu.png" alt="" />
            <span>官方海鸥群</span>
          </div>
          <div class="item">
            <img src="./images/55.png" alt="" @click="goQQ" />
            <span>钻石qq黑市交易</span>
          </div>

          <div class="item" style="flex: 0 0 35%">
            <img
              style="width: 100%; height: 90%; margin-left: 10px"
              @click="$router.push('/me/my-card')"
              src="./images/fenxianganniu.png"
              alt=""
            />
            <!--            <span>QQ黑市交易群</span>-->
          </div>
          <!--          <div class="item">-->
          <!--            <img src="./images/88.png" alt="" />-->
          <!--            <span>会员特权</span>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="chongzhiandtixian">
        <!--        <div class="chongzhiyue">-->
        <!--          充值余额(元)&nbsp;&nbsp;-->
        <!--          <div class="num">{{ walletInfo?.amount || 0 }}</div>-->
        <!--        </div>-->
        <!--        <div class="btn-box">-->
        <!--          &lt;!&ndash;          <div style="margin-right: 10px">&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;            <van-button&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;              class="btn"&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;              style="color: #1d9ae8; border: 1px solid #1d9ae8; flex: 1; width: 100%"&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;            >&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;              今日新增佣金嘉奖:{{ bonus }}元 &nbsp;&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            &lt;!&ndash;            </van-button>&ndash;&gt;&ndash;&gt;-->
        <!--          &lt;!&ndash;            <span style="color: #fff; font-size: 16px; font-weight: bolder">&ndash;&gt;-->
        <!--          &lt;!&ndash;              &ndash;&gt;-->
        <!--          &lt;!&ndash;            </span>&ndash;&gt;-->
        <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
        <!--          <van-button-->
        <!--            style="flex: 1"-->
        <!--            class="btn"-->
        <!--            color="linear-gradient(to right, #fb5b4b, #9c38e5)"-->
        <!--            @click="goJiangshangjiang"-->
        <!--          >-->
        <!--            推广奖上奖 :{{ bonus }}元宝 点击领取-->
        <!--          </van-button>-->
        <!--        </div>-->
      </div>
      <!--      <div style="flex: 1; margin-top: 10px">-->
      <!--        <van-button-->
      <!--          class="btn"-->
      <!--          style="color: #1d9ae8; border: 1px solid #1d9ae8; flex: 1; width: 100%; font-size: 18px"-->
      <!--          @click="go('/invest')"-->
      <!--        >-->
      <!--          <div style="display: flex; align-items: center; justify-content: center">-->
      <!--            <img src="./images/icon-rz.png" style="width: 20px; margin-right: 9px" alt="" />-->
      <!--            免费兑换会员特权，越赚越多-->
      <!--          </div>-->
      <!--        </van-button>-->
      <!--      </div>-->
      <!--      <div style="flex: 1; margin-top: 10px">-->
      <!--        <van-button-->
      <!--          class="btn"-->
      <!--          style="color: #1d9ae8; border: 1px solid #1d9ae8; flex: 1; width: 100%; font-size: 18px"-->
      <!--          @click="go('/invest')"-->
      <!--        >-->
      <!--          <div style="display: flex; align-items: center; justify-content: center">-->
      <!--            <img src="./images/icon-rz.png" style="width: 20px; margin-right: 9px" alt="" />-->
      <!--            购买会员特权，越赚越多-->
      <!--          </div>-->
      <!--        </van-button>-->
      <!--      </div>-->
      <!--      <div class="chongzhiandtixian">-->
      <!--        &lt;!&ndash;        <div class="chongzhiyue">&ndash;&gt;-->
      <!--        &lt;!&ndash;          充值余额(元)&nbsp;&nbsp;&ndash;&gt;-->
      <!--        &lt;!&ndash;          <div class="num">{{ walletInfo?.amount || 0 }}</div>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
      <!--        <div></div>-->
      <!--        <div class="btn-box">-->
      <!--          <van-button-->
      <!--            class="btn"-->
      <!--            color="linear-gradient(to right, #fb5b4b, #9c38e5)"-->
      <!--            @click="go('recharge')"-->
      <!--            style="flex: 1"-->
      <!--          >-->
      <!--            充值-->
      <!--          </van-button>-->
      <!--          <van-button-->
      <!--            class="btn"-->
      <!--            color="#fff"-->
      <!--            style="margin-left: 10px; color: #1d9ae8; border: 1px solid #1d9ae8; flex: 1"-->
      <!--            @click="goDep"-->
      <!--          >-->
      <!--            兑换-->
      <!--          </van-button>-->
      <!--          &lt;!&ndash;          <van-button&ndash;&gt;-->
      <!--          &lt;!&ndash;            @click="go('/invest')"&ndash;&gt;-->
      <!--          &lt;!&ndash;            class="btn"&ndash;&gt;-->
      <!--          &lt;!&ndash;            color="linear-gradient(to right, #F6CEEC, #D939CD)"&ndash;&gt;-->
      <!--          &lt;!&ndash;            style="margin-left: 10px"&ndash;&gt;-->
      <!--          &lt;!&ndash;          >&ndash;&gt;-->
      <!--          &lt;!&ndash;            购买会员&ndash;&gt;-->
      <!--          &lt;!&ndash;          </van-button>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <van-button&ndash;&gt;-->
      <!--          &lt;!&ndash;            @click="go('/invest')"&ndash;&gt;-->
      <!--          &lt;!&ndash;            class="btn"&ndash;&gt;-->
      <!--          &lt;!&ndash;            color="linear-gradient(to right,#FFA8A8, #2376DD)"&ndash;&gt;-->
      <!--          &lt;!&ndash;            style="margin-left: 10px"&ndash;&gt;-->
      <!--          &lt;!&ndash;          >&ndash;&gt;-->
      <!--          &lt;!&ndash;            免费兑 <br />换会员&ndash;&gt;-->
      <!--          &lt;!&ndash;          </van-button>&ndash;&gt;-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="vipcount" style="color: red; margin-top: 10px; font-size: 16px">-->
      <!--        &lt;!&ndash;          会员等级: {{ getSerialName(userInfo?.result?.staff?.serial)&ndash;&gt;-->
      <!--        &lt;!&ndash;          }}{{ myStaffList?.length ? myStaffList?.length + '份' : '' }}&ndash;&gt;-->
      <!--        <p style="text-align: center">-->
      <!--          我的会员等级:-->
      <!--          <span>{{ getSerialName(myStaffList?.length || 0) }}</span>-->
      <!--          <span style="padding-left: 20px" v-if="myStaffList?.length"-->
      <!--            >今日未领取收入: {{ shengyukelinqqu }}</span-->
      <!--          >-->
      <!--        </p>-->
      <!--        &lt;!&ndash;          <p v-if="myStaffList?.length">当日可领取佣金: {{ myStaffList.length * 2.5 }}</p>&ndash;&gt;-->
      <!--      </div>-->
      <!--      <div class="total-box" >-->
      <!--        <div class="top" @click="$router.push('/teamStat')">-->
      <!--          <div class="left">-->
      <!--            <img class="qianbao" src="./images/qianbao.png" alt="" />-->
      <!--            <span> 可兑换余额 </span>-->
      <!--            <img-->
      <!--              class="eye"-->
      <!--              @click.stop="showTotal = false"-->
      <!--              v-if="showTotal"-->
      <!--              src="@/assets/img/eye-show.png"-->
      <!--            />-->
      <!--            <img-->
      <!--              class="eye"-->
      <!--              @click.stop="handleEyeClick"-->
      <!--              v-else-->
      <!--              src="@/assets/img/eye-hidden.png"-->
      <!--            />-->
      <!--          </div>-->
      <!--          <div class="right">-->
      <!--            <span>-->
      <!--              <template v-if="showTotal">-->
      <!--                {{ userIncomeInfo?.wallet?.money || 0 }}-->
      <!--              </template>-->
      <!--              <template v-else> ****** </template>-->
      <!--            </span>-->
      <!--            <van-icon name="arrow" />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="info">-->
      <!--          v-if="showRenzheng"-->
      <!--      <div-->
      <!--        @click="renzheng"-->
      <!--        style="-->
      <!--          position: absolute;-->
      <!--          top: 25px;-->
      <!--          right: 0px;-->
      <!--          width: fit-content;-->
      <!--          padding: 8px 18px;-->
      <!--          background-color: #689cfc;-->
      <!--          color: #666;-->
      <!--          border-radius: 20px;-->
      <!--          font-size: 12px;-->
      <!--          white-space: nowrap;-->
      <!--          z-index: 99999999999;-->
      <!--        "-->
      <!--      >-->
      <!--        获取微信头像-->
      <!--      </div>-->
      <!--      </div>-->
      <div class="list">
        <van-cell
          v-for="(item, index) of list"
          :icon="item.icon"
          :title="item.label"
          class="list-item"
          is-link
          style="color: #c3b6ba"
          @click="item.fn"
        >
          <template #icon>
            <i v-if="index === 0" class="menu-icon">
              <svg
                fill="none"
                height="62"
                viewBox="0 0 62 62"
                width="62"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <circle cx="31" cy="31" fill="#FFFFFF" r="31"></circle>
                <path
                  d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62ZM31 4C45.9117 4 58 16.0883 58 31C58 45.9117 45.9117 58 31 58C16.0883 58 4 45.9117 4 31C4 16.0883 16.0883 4 31 4Z"
                  fill="rgba(77, 77, 77, 1)"
                  fill-rule="evenodd"
                ></path>
                <rect
                  fill="url(#linear_fill_67c9f63c-aa6b-4270-b0e2-399feebc8b3e_0)"
                  height="18"
                  rx="3"
                  width="6"
                  x="28"
                  y="15"
                ></rect>
                <rect
                  fill="url(#linear_fill_732ad231-072e-40e4-9d8c-b52061495ff0_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 50.5 28)"
                  width="6"
                  x="50.5"
                  y="28"
                ></rect>
                <defs>
                  <linearGradient
                    id="linear_fill_67c9f63c-aa6b-4270-b0e2-399feebc8b3e_0"
                    gradientUnits="userSpaceOnUse"
                    x1="31"
                    x2="31"
                    y1="15"
                    y2="33"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_732ad231-072e-40e4-9d8c-b52061495ff0_0"
                    gradientUnits="userSpaceOnUse"
                    x1="53.5"
                    x2="53.5"
                    y1="28"
                    y2="50"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
            <i v-if="index === 1 || index === 2" class="menu-icon">
              <svg
                fill="none"
                height="62"
                viewBox="0 0 62 62"
                width="62"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <circle cx="31" cy="31" fill="#FFFFFF" r="31"></circle>
                <path
                  d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62ZM31 4C45.9117 4 58 16.0883 58 31C58 45.9117 45.9117 58 31 58C16.0883 58 4 45.9117 4 31C4 16.0883 16.0883 4 31 4Z"
                  fill="rgba(77, 77, 77, 1)"
                  fill-rule="evenodd"
                ></path>
                <rect
                  fill="url(#linear_fill_1c29ec81-354b-4c12-88e6-78fd1fb1825a_0)"
                  height="14"
                  rx="3"
                  transform="rotate(25.000001154466787 35.60713195800781 16)"
                  width="6"
                  x="35.60713195800781"
                  y="16"
                ></rect>
                <rect
                  fill="url(#linear_fill_c419624e-dfaf-4d52-9877-fa2d34d749f4_0)"
                  height="14"
                  rx="3"
                  transform="rotate(-24.999999711185435 21 18.535888671875)"
                  width="6"
                  x="21"
                  y="18.535888671875"
                ></rect>
                <rect
                  fill="url(#linear_fill_27dec8d0-d16d-4ade-ae83-827f27105849_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 42 25.4248046875)"
                  width="6"
                  x="42"
                  y="25.4248046875"
                ></rect>
                <rect
                  fill="url(#linear_fill_7710e0c9-565b-48ca-a3c1-1a2443f9fd37_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 42 34.4248046875)"
                  width="6"
                  x="42"
                  y="34.4248046875"
                ></rect>
                <rect
                  fill="url(#linear_fill_4572dbfb-b1e3-4a8d-9b2b-42e885ea2f6d_0)"
                  height="22"
                  rx="3"
                  width="6"
                  x="28"
                  y="23.4248046875"
                ></rect>
                <defs>
                  <linearGradient
                    id="linear_fill_1c29ec81-354b-4c12-88e6-78fd1fb1825a_0"
                    gradientUnits="userSpaceOnUse"
                    x1="38.60713195800781"
                    x2="38.60713195800781"
                    y1="16"
                    y2="30"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_c419624e-dfaf-4d52-9877-fa2d34d749f4_0"
                    gradientUnits="userSpaceOnUse"
                    x1="24"
                    x2="24"
                    y1="18.535888671875"
                    y2="32.535888671875"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_27dec8d0-d16d-4ade-ae83-827f27105849_0"
                    gradientUnits="userSpaceOnUse"
                    x1="45"
                    x2="45"
                    y1="25.4248046875"
                    y2="47.4248046875"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_7710e0c9-565b-48ca-a3c1-1a2443f9fd37_0"
                    gradientUnits="userSpaceOnUse"
                    x1="45"
                    x2="45"
                    y1="34.4248046875"
                    y2="56.4248046875"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_4572dbfb-b1e3-4a8d-9b2b-42e885ea2f6d_0"
                    gradientUnits="userSpaceOnUse"
                    x1="31"
                    x2="31"
                    y1="23.4248046875"
                    y2="45.4248046875"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
            <i v-if="index === 3" class="menu-icon">
              <svg
                fill="none"
                height="58"
                viewBox="0 0 58 58"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M4 0L54 0C56.2091 0 58 1.79086 58 4L58 54C58 56.2091 56.2091 58 54 58L4 58C1.79086 58 0 56.2091 0 54L0 4C0 1.79086 1.79086 0 4 0Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M54 0L4 0C1.79086 0 0 1.79086 0 4L0 54C0 56.2091 1.79086 58 4 58L54 58C56.2091 58 58 56.2091 58 54L58 4C58 1.79086 56.2091 0 54 0ZM4 54L4 4L54 4L54 54L4 54Z"
                  fill="rgba(77, 77, 77, 1)"
                  fill-rule="evenodd"
                ></path>
                <rect
                  fill="url(#linear_fill_38fc83cb-c0f7-4110-bc0e-bf2cd0b0ed9f_0)"
                  height="18"
                  rx="3"
                  transform="rotate(-29.000000420085833 20.90550994873047 24.62744140625)"
                  width="6"
                  x="20.90550994873047"
                  y="24.62744140625"
                ></rect>
                <rect
                  fill="url(#linear_fill_0c3a036b-5535-4322-9a64-5ce2343f2a9d_0)"
                  height="20"
                  rx="3"
                  transform="rotate(35.99999933864986 23.755714416503906 22)"
                  width="6"
                  x="23.755714416503906"
                  y="22"
                ></rect>
                <rect
                  fill="url(#linear_fill_3d9e2c82-ae20-4040-8a02-cad32171a911_0)"
                  height="24"
                  rx="3"
                  transform="rotate(35.99999933864986 41.755714416503906 17)"
                  width="6"
                  x="41.755714416503906"
                  y="17"
                ></rect>
                <defs>
                  <linearGradient
                    id="linear_fill_38fc83cb-c0f7-4110-bc0e-bf2cd0b0ed9f_0"
                    gradientUnits="userSpaceOnUse"
                    x1="23.90550994873047"
                    x2="23.90550994873047"
                    y1="24.62744140625"
                    y2="42.62744140625"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_0c3a036b-5535-4322-9a64-5ce2343f2a9d_0"
                    gradientUnits="userSpaceOnUse"
                    x1="26.755714416503906"
                    x2="26.755714416503906"
                    y1="22"
                    y2="42"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_3d9e2c82-ae20-4040-8a02-cad32171a911_0"
                    gradientUnits="userSpaceOnUse"
                    x1="44.755714416503906"
                    x2="44.755714416503906"
                    y1="17"
                    y2="41"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
            <i v-if="index === 4" class="menu-icon">
              <svg
                fill="none"
                height="58"
                viewBox="0 0 56 58"
                width="56"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M3.86207 0L52.1379 0C54.2709 0 56 1.79086 56 4L56 54C56 56.2091 54.2709 58 52.1379 58L3.86207 58C1.72911 58 0 56.2091 0 54L0 4C0 1.79086 1.72911 0 3.86207 0Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M52.1379 0L3.86207 0C1.72911 0 0 1.79086 0 4L0 54C0 56.2091 1.72911 58 3.86207 58L52.1379 58C54.2709 58 56 56.2091 56 54L56 4C56 1.79086 54.2709 0 52.1379 0ZM4 4L4 54L52 54L52 4L4 4Z"
                  fill="rgba(77, 77, 77, 1)"
                  fill-rule="evenodd"
                ></path>
                <rect
                  fill="url(#linear_fill_7172fef4-e314-4c61-a76e-67f3937926f2_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 39 19)"
                  width="6"
                  x="39"
                  y="19"
                ></rect>
                <rect
                  fill="url(#linear_fill_ca0e69d5-be16-4d0a-9859-ea211359c8d5_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 39 33)"
                  width="6"
                  x="39"
                  y="33"
                ></rect>
                <defs>
                  <linearGradient
                    id="linear_fill_7172fef4-e314-4c61-a76e-67f3937926f2_0"
                    gradientUnits="userSpaceOnUse"
                    x1="42"
                    x2="42"
                    y1="19"
                    y2="41"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_ca0e69d5-be16-4d0a-9859-ea211359c8d5_0"
                    gradientUnits="userSpaceOnUse"
                    x1="42"
                    x2="42"
                    y1="33"
                    y2="55"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
            <i v-if="index === 5" class="menu-icon">
              <svg
                fill="none"
                height="58"
                viewBox="0 0 56 58"
                width="56"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.58621 2L50.4138 2C52.3944 2 54 3.48209 54 5.31035L54 46.6897C54 48.5179 52.3944 50 50.4138 50L43.2661 50L37.3098 56L31.665 50L5.58621 50C3.6056 50 2 48.5179 2 46.6897L2 5.31035C2 3.48209 3.6056 2 5.58621 2Z"
                  fill="#FFFFFF"
                  stroke="rgba(77, 77, 77, 1)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                ></path>
                <rect
                  fill="url(#linear_fill_661f1488-e5a1-445a-8c9f-88d47d2eb006_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 39 16)"
                  width="6"
                  x="39"
                  y="16"
                ></rect>
                <rect
                  fill="url(#linear_fill_d4746e94-e4a7-4537-9fd4-4edd8dab2a8e_0)"
                  height="22"
                  rx="3"
                  transform="rotate(90 39 30)"
                  width="6"
                  x="39"
                  y="30"
                ></rect>
                <defs>
                  <linearGradient
                    id="linear_fill_661f1488-e5a1-445a-8c9f-88d47d2eb006_0"
                    gradientUnits="userSpaceOnUse"
                    x1="42"
                    x2="42"
                    y1="16"
                    y2="38"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                  <linearGradient
                    id="linear_fill_d4746e94-e4a7-4537-9fd4-4edd8dab2a8e_0"
                    gradientUnits="userSpaceOnUse"
                    x1="42"
                    x2="42"
                    y1="30"
                    y2="52"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
            <i v-if="index === 6 || index === 7" class="menu-icon">
              <svg
                fill="none"
                height="62"
                viewBox="0 0 62 62"
                width="62"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <circle cx="31" cy="31" fill="#FFFFFF" r="31"></circle>
                <path
                  d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62ZM31 4C45.9117 4 58 16.0883 58 31C58 45.9117 45.9117 58 31 58C16.0883 58 4 45.9117 4 31C4 16.0883 16.0883 4 31 4Z"
                  fill="rgba(77, 77, 77, 1)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M31.2574 51.7158C26.21 51.7158 21.5428 49.4139 18.4384 45.4014C17.7203 44.4721 17.9104 43.1417 18.8185 42.4447C19.7477 41.7267 21.0782 41.9168 21.7751 42.8249C24.077 45.7815 27.5405 47.4921 31.2574 47.4921C34.9742 47.4921 38.4377 45.7815 40.7185 42.8249C41.4366 41.8957 42.7459 41.7267 43.6751 42.4447C44.6043 43.1628 44.7733 44.4721 44.0553 45.4014C40.9931 49.4139 36.3258 51.7158 31.2574 51.7158Z"
                  fill="url(#linear_fill_e8726982-e32b-4e13-93ae-d98f2d10a465)"
                ></path>
                <defs>
                  <linearGradient
                    id="linear_fill_e8726982-e32b-4e13-93ae-d98f2d10a465"
                    gradientUnits="userSpaceOnUse"
                    x1="21.171817779541016"
                    x2="41.48236083984375"
                    y1="42"
                    y2="46.85791015625"
                  >
                    <stop offset="0" stop-color="#A0DBFF" />
                    <stop offset="1" stop-color="#0A91E5" />
                  </linearGradient>
                </defs>
              </svg>
            </i>
          </template>
        </van-cell>
      </div>

      <ul v-if="false" class="login_nav">
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="jumpToQQ">-->
        <!--          &lt;!&ndash;          <img&ndash;&gt;-->
        <!--          &lt;!&ndash;            src="data:image/png;base64,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"&ndash;&gt;-->
        <!--          &lt;!&ndash;            alt=""&ndash;&gt;-->
        <!--          &lt;!&ndash;          />&ndash;&gt;-->
        <!--          <img src="./images/qq.png" alt="" />-->
        <!--          <p>官方qq交流群</p></a-->
        <!--        >-->
        <!--      </li>-->
        <li>
          <a href="javascript:void(0)" @click="goDownload"
            ><img src="./images/3.png" />
            <p>APP下载</p></a
          >
        </li>
        <li>
          <a href="javascript:void(0)" @click="jumpToQQ">
            <!--          <img-->
            <!--            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaEAAAGhCAYAAADIqAvCAAAACXBIWXMAAC4jAAAuIwF4pT92AAAWlElEQVR4nO3dT04cybYH4PRTz+1BqabmrQC/FZi7AnMnNTVeQdMraHoFF6+gi2lNHl7BhRVc2AFMSyU9swKesh0ll2nARf2LExHfJ6FWS60mKsmMX56Ik1mv7u/vOwDI4b8cdQByEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQzS8OfTumo8G7ruvetH4cqM7X4WR25c9aplf39/etH4MqTEeDva7r+p950Bykz9X/++vWjw/NuOu6bh5IF31ApX+/GU5mN06DeIRQgVLgvEs/B4IGljIPqKsUUFeCKT8hVIDpaNBXNocpcPqft60fE9iQ2xRI/c/5cDL76sDulhAKKlU7ffAcdV233/rxgB257rpu3IeSfabdEEKBCB4I5TYF0tiy3fYIoQCmo8FRCp73rR8LCOoyBZIluw0TQpmkquc4hY+mAijDXQqjU9XRZgihHUvP6vTh87GpDw71OUtLdRf+tqsTQjsyHQ36rrYTS25QnX6p7kQYrUYIbVmqfE6FD1RPGK1ACG1J2vM5sewGzTlLYWTPaAlCaAumo8FJ2vfRcADt+iM1MOime4YQ2qC07zP2RgMg6Z81OrJE9zQhtAHptTp9+Hwo/sMA2/AlhZGq6AHfJ7Sm6WjQv+HgRgABz+jnh5s0X7BAJbSiVP30ez+/FvkBgFz6xoVjVdE3QmgFqe167P1uwIr6vaJDL0m1HPdi6T1vFwIIWEPfvPSfNJ80TSX0AtPRYOy5H2DDzoaTWbNhJISWkPZ/VD/AtvTfY3TQ4j6R5bifSPs/VwII2KJ+frlK801TVELPSCfEhTcfADtylyqiZhoWVEJPWGhAEEDArrxurWFBJfSIdAL8GW5gQEs+DSezce2fVyX0gAACgvizhYpICC0QQEAw1QeREEoEEBBU1UFkT+j7VzD8O8BQAJ7yz+Fkdl7b0Wk+hLRhA4Wosn276RBKX8F9JYCAQlQXRM3uCaVX8ZwLIKAg/Xw1TvNXFVpuTPBVDECJ9tMNdBWaDKHpaHDim1CBgr2fjganNfwBm9sT0gkHVKT4jrmmQiito97YBwIq0TcqvBtOZjelfpzWluM0IgA1eV36/lAzIZT2gd4HGArAJu2n+a1ITSzHpQdS/xNgKADb8j8lPj/USiVU/evQgeYVOc9VH0KpTPU8EFC7Ipflql6O81oeoEH/XVK3XO2V0FgAAY0palmu2hBKD6XqhgNa079N4bCUz1xzJaQZAWhVMa/0qTKE0rcQvg0wFIAc3pbSpFBdY4JX8wD8pX+lz95wMvsa+XDUWAkdCyCAv+bB4+iHoapKSBUE8IPw1VBtlZAqCOC78NVQbZXQVyEE8IPQ1VA1lVDqiBNAAD/q58WjqMekpuW4Yl9lDrBlYZfkqgih9HYEzwUBPO5t1Lco1FIJhS01AYIIOU8W35iQ2rL/L8BQAKIL94btGiohVRDAcsLNl0IIoB1CaJOmo8E735oKsLS3ad4Mo/RKSBUE8DKh5s3SQ6iYL24CCCLUvFlsCE1Hgz3PBgG8WKgluZIrIVUQwGrCzJ8lh9BBgDEAlEgIbcCHgscOkNN+etA/uyJDKL0rDoDVhZhHS62EhBDAeoTQGoQQwHpCdMiVGkKhnvgFKND7CEMuLoRSf7tvUAVYU4T99RIrIVUQwGZkn09LDKG9AGMAqEH2+bTEENKUALAZKqEVqIQANkMIrcBLSwE2I3uTV1EhFO3LmABKl7tDrrRKKMS7jgDYjNJCyH4QwGaphF5ACAFUpPSv9wZgPVm3OVRCAG3L2vAlhADIxnIcANkIIQCyEUIAZCOEANqW9cvtfmn96Dforuu6q/SxLx58/PlDa7448OWuu6772nXdTfqZ20s/fRvsfkGfJ4rLNI6rdHznnKuVEEL1u+267jwFzsVwMvu6zCeejgZ76QI/TBe8F8f+6Es6plfDyexhmD8pvf/wIP18yDj+iO4enKs3y4xxOhq8WTimB8K+LK/u7++LGfB0NLiI8r3owfUX87j/GU5mV5sYanrJ4VHXdR9rPnA/0Vc7p/1EuWyYPydNnn3IHzc+cZ6lY3q+if9ZuoE6TuerKmkJw8nsVa7fLYTqcpcmydNNTJKPSRPncfpp5QLvl4ROXlLxvFQK+ZPGzu8/0o3SUhXPSy2E/IlK/nlCaElC6Fl/bDN8HkoX+GnllVG/lHm0zfB5KIXRuPJJs1/KPN5W+Dy0cOP0+y5+X4mE0JKE0KOu00S5kWW3l6p40vycqp+dhPpD09HgpMJJ8y6dqxtZdnuptEx3bs/o74TQkoTQ33weTmbHuQeR7jTHlWy09xPl4S6rn6ekgD+vZNnzMh3XLKG+aDoa9BX8r7nHEUnOEPKcULk+RQig7tsJ/HU4mR2mDeaS9VXluwgB1H07rhepQ/E6wHDWcTaczA4iBFD37bj2182nAENpXieEitUH0Dja4IeT2VHBF3c/0R/sap9iWWk8BwUH0ed0XoSSrp9/pMqXjIRQeUIG0FwaW2lBNA+gEHfqD6VxlRhEIZaLn5IqzazfKooQKk3oAJpLYyxlae4ucgDNLQTRbYwR/dRZ5ACaSw09luYyEkLl+FxCAM2lJZjL5f7rrMIH0Fwa52EBS0jXEZfgnpKuqz9ijq5+QqgM1yXcVT4i+oT5W67W9lWl8UY+F+7S370ow8nspJCbpuoIoTIUd1F33+/co94RXw4ns9MA43ixdOf+JejwjqI1d7zAkUaF3RNC8f1R8EXdpQcTI06YxSwXPeE44IR5metB1E1I11mRNyYlE0Kx3VZyUURbPio62Lu4E2bpwT5fliul+aMKQii2bK+N2aQ0YUbplrur6G73NFA1dFZ6sC84CTOSBgihuO5K6oZbQpQLe1xDsHff99yiBGo1y1jpulMN7YgQiquqtel0lxxhb6i2Nf8INyqXpXUZLqGmG8DQhFBcNV4EuTetLytaMvpLkHCv8VwVQjsihGK6rm2yTHKHUK0TS+7jWmxH3FPS9Vf6i2OLIIRiqu6i7r7vYeS8aw/xduwtyHm+XNayx/YI1dAOCKGYap0su4yf7bbS6nIe7rnu2ms+V2vb5wpJCAUU5ftstiTXhV3zMe0c182r/DoMQwjFU/U6dMYLu8oqaEGuEKq9WrAvtGVCKJ5a19cX5XjAUiW0BRXvB821cD1mJYTiaWEd2lp7HVqoEizJbZkQised13ZUfVwzLXM6V1mbEKIJFT7RD1UQQgBkI4RownQ0eFfz55yOBm8CDANeTAjFYzLZjtqPa46Qda6yNiEUT9V37Mn7DL/ThLl5+7V9oEcchBtRZYRQPHs1f7iMy0a1h3uWyXI6GlR9vrp52T4hFM/bytf3c4VB7SGUKwxqD6EWqr2shFBMNU+YuZY3ag+hXJ+v2uWq6WhgKW4HhFBMhxV/tlwX9ttal47S58p1x+5cZS1CKKYqT/60zJijKWGu1gkz5/myX/Hycc0BG4YQimm/0udacl/UR5l//7bk/lzVTdaZq8umCKG4apwwc3+m/dqW5NLnyVld9o4z//5tqPWGJRwhFNdRTcscQSbL3kmAMWxShADYr3ATv8ZgDUkIxfW6sgshyuT/sZZwT58jyh17NeE+HQ2O0vXHDgih2I5rmDDT/tbHAEOZO40xjLUdB5os39dQDaXrrbZqOTQhFFst1VC0Sf9j6Y0faXnz9wBDWVTD5N1fb28DjKMZQii+30ueMNPSRoS9oIdKr4bGAcbwUF8NFXvTlK6zaMFePSFUhnGJy3Lpbj3qZN9PmEXeuaeJPmKw904K7kCMGOzVE0Jl2C/0zv08+Abv76XtY6S79X8FGMpT+r/3eWk3TdPRYOy5oDyEUDk+lrTUUdBFfV7Kcmea2C8CDOVnirppSkvGkRpnmiKEyvKvdMGElgKolIv6dQnLnQsBVErr8Md0HoSWrqc/o4+zZkKoPH9GDqLCAmiuv3O/iBpECwFU2nJR6CASQDEIoTL9GXFprtAAmusn+JtoS3NpPFcF71f8FUTRAl4AxSGEyvWvKBd3P4bpaHBVwbr661QRhag0p6PBYaqASn9u5WM6rtm75tK5OhZAcQihsvUX91XODq80Ud5U1Fn0OlWa2QI+TZT9xv7/VvT6mP10rmYL+FRVXmhCiOXV/f19MYOdjgYXgZ+PyO2sf9p7OJl93cU40l3tuPK/x106pjvb10iT9EnlT+1f9u+8G05mN7v4ZQuv4vl1F7+vRMPJ7FWuYQuhutyl1tjTbYVRCp+Txu4mb/vPvM0wShVl5IdQt+EsHdethFEKn+Ng79gLSQgtSQi9SH+Bj4eT2UaeK0mTZH+X/mF3HyGc2xTy55uYOFOgH3pf2V+V0XhTIZ+W3Y7TsRU+SxBCSxJCK7lLby7oj93VcDK7WuZ/ki7kg4UfF/OPrh8c159WnunOfH5cDz2h/6gvC8d0qRuoFOaL56oXkL6QEFqSENqYfgKdT5r9Hf1i19Kei3gld6mVeu7hcX0nyFdym45lt3DOvln4pyDfgJwh9EuuX0xWixeuUN+M1w+OpeO6GW/dFG3dXc5frkUboG1LLdFvixACIBshBEA2QgiAbEoLoZ08YQ3AbgghgLZpTAAgm528b/IpKiEAshFCAG3byPslVyWEAMimqHfHdd/eH1fWgAECy/neuK7QxoTbAGMAqEHW98Z1hYaQJTmAzcjant0VGkJZN9EAKiKEVpD9oAFUQgitQAgBbEb2+bS47rjuW4fcV99SCbCe3J1xXcGv7VENAaznMsLxKzWENCcArCfEzbwQAmhTiHm0yBAaTmZCCGA9QmhNXwoeO0BOl8PJLOtXOMyVHEKqIYDVnEc5biWHUJiDCFCYMDfxxYbQcDLr3yF3HWAoACW5HU5mYR5zKf3rvccBxgBQklCrSKWHkCU5gJcJdfNedAhZkgN4kVBLcV0FlVDvNMAYAEoQbr6sIYQsyQEsJ9x8WXwIpQeuzgIMBSCyL2kLI5QaKqFOlxzAT4Xcuijy+4QeMx0N+s22/XgjA8iub0jYi/hnqKUS6jQoADzpJOqhqSaEhpNZvyR3G2AoAJHcRW7gqqkS6iKnPUAmp1HemP2Y2kLoPKU+AN/mw9BbFVWFUEp71RDAN6GroK6m7rhF09Gg74V/G2dEADvXV0F70UOotuW4OdUQ0LqT6AHU1VoJdZ4bAtoW9rmgh2qthHrHAcYAkMNRKUe92hAaTmb919d+CTAUgF26TPNfEWquhLp0N6BlG2jFXUlVUFd7CGnZBhpzGvFN2c+ptjFh0XQ06EvT93FGBLBx18PJ7F1ph7X25bg5y3JA7YpahptrIoRSeWpZDqjVb8PJ7KrEz9bEctzcdDTo3y33IcZoADai74Y7KPVQtrIcN3fk6x6AivTbDIclf5ymQih1yxX9BwNYcFjCq3me01ol1KV1098CDAVgHX+U9FDqU5raE1o0HQ36b2L9GGdEAEs7G05mRXbDPdRcJTSX/oDXMUYDsLTrmt6N2WwIJQcaFYCC9I0IB6XvAy1qOoQWGhU8yApEV10Ada2HUPe9UeFAEAGBzQOoyAdSn9N8CHU/BhFARMc1BlAnhL5Lf+BPUcYDkHwaTmbjWg+GEFqQ/tCCCIii6gDqhNDfpT/4P+0RAZlVH0Bdyw+r/sx0NOi/l6N/Gvl17JEClam2CeExKqEn6JoDMmgqgDoh9Lx0Iux5swKwA/08866lAOqE0M+lB8P6iuhL9LECxbpMFdBNa39Ce0IvMB0N+m9n/b2YAQMl+DyczKp5F9xLCaEXmo4G/Wt+xhoWgDX1+z9Hw8nsvOUDKYRWMB0N+n2i/sTZL27wQATXKYCa2v95jBBag+U5YAVNL789JITWNB0NDtLy3NuiPwiwbbep+in+21A3SXfcmtIJ1T/Y+rnoDwJs0+fUfi2AHlAJbVB6y8LYXhGQXKc3YAufJwihLZiOBv1674kOOmhW3/l2MpzMTp0Cz7MctwXpxNuzRAdN6q/7PQG0HJXQlqV27r4q+lj1BwXOUvXT3FsP1iGEdkQYQbWEzxqE0I4thNGhPSMomvDZACGUyXQ0eNN3zfTPDXjGCIpxmzpgT9PLjVmTEAogvY+uD6MPrR8LCKp/i/649fe8bYMQCiRVR4epQvKsEeR1naqesapne4RQUGnv6CCFkgoJduNL+lr/c3s9uyGECpGW7A7SjyoJNuM6hc6FpbY8hFCh0otTD9J7695pboCf6psKrtJPHzxXltnyE0IVScH0JoXSXvrpvW/92NCMvrLpg+Vm8ce72+ISQo1Je017G/rU/279eAZwnRpZWvXVF8OVTQixsulo4OTJ62w4mR21fAAonxeYQpk+CyBq8Iu/IhTn03AyG/uzUQMhBOW4S18PrZWYagghKEMfQAc24amNPSGIr++AeyeAqJFKCGK7ThWQhyqpkhCCuLRgUz3LcRCTFmyaoBKCeLRg0wwhBHFowaY5Qghi0IJNk+wJQX5asGmWSgjy0oJN04QQ5KMFm+ZZjoM8tGDTvE4lBFlowYZECMHuaMGGB4QQ7IYWbHiEPSHYPi3Y8ASVEGyXFmx4hkoItudMAMHzVEKwHZ4BgiWohGDzPgkgWI4Qgs258wwQvIzlONgMLdiwApUQrO9aAMFqVEKwHi3YsAaVEKxOCzasSSUEq9GCDRugEoKX04INGyKEYHlasGHDLMfBcrRgwxaohODntGDDlqiE4HlasGGLVELwNC3YsGUqIXicFmzYAZUQ/J0WbNgRIQTfacGGHbMcB99owYYMVEKgBRuyUQnROi3YkJFKiJZpwYbMVEK0Sgs2BKASokVasCEIIURLtGBDMJbjaIUWbAhIJUQLtGBDUCohaqcFGwJTCVEzLdgQnEqIWmnBhgKohKiRFmwohBCiJlqwoTCW46iFFmwokEqIGmjBhkKphCidFmwomEqIkmnBhsKphCiVFmyogEqIEmnBhkoIIUqiBRsqYzmOUmjBhgqphCiBFmyolEqI6LRgQ8VUQkSmBRsqpxIiKi3Y0ACVEBFpwYZGCCEi0YINjbEcRxRasKFBKiEi0IINjVIJkZsWbGiYSoictGBD41RC5KIFG1AJkYUWbOAvQohd0oIN/MByHLuiBRv4G5UQu6AFG3iUSoht04INPEklxDZpwQaepRJiW7RgAz+lEmIbtGADSxFCbJIWbOBFLMexKVqwgRdTCbEJWrCBlaiEWJcWbGBlKiHW8VkAAet4dX9/7wACkIVKCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQB5d1/0/wo82TzgGtWoAAAAASUVORK5CYII="-->
            <!--            alt=""-->
            <!--          />-->
            <img alt="" src="./images/1.png" />
            <p>人工代充群</p></a
          >
        </li>
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" onclick="window.location.href=`/index/ctrl/set`" class=""-->
        <!--          ><img-->
        <!--            src="data:image/png;base64,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"-->
        <!--            alt=""-->
        <!--          />-->
        <!--          <p>个人信息</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="go('/conversion', true)"-->
        <!--          ><img-->
        <!--            src="data:image/png;base64,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"-->
        <!--            alt=""-->
        <!--          />-->
        <!--          <p>余额互转</p></a-->
        <!--        >-->
        <!--      </li>-->
        <li>
          <a href="javascript:void(0)" @click="$router.push('/me/my-card')"
            ><img alt="" src="./images/2.png" />
            <p>我的邀请码</p></a
          >
        </li>
        <li>
          <a href="javascript:void(0)" @click="go('/demo', true)"
            ><img alt="" src="./images/7.png" />
            <p>推广佣金制度</p></a
          >
        </li>
        <li>
          <a href="javascript:void(0)" @click="go('/wallet')"
            ><img alt="" src="./images/4.png" />
            <p>收入明细</p></a
          >
        </li>

        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/fenhong')"-->
        <!--          ><img src="./images/fhjc.png" alt="" />-->
        <!--          <p>分红奖池</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/pingtaijianjie')"-->
        <!--          ><img src="./images/pingtaijianjie.png" />-->
        <!--          <p>平台简介</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/caozuoshuoming')"-->
        <!--          ><img src="./images/caozuoshuoming.png" />-->
        <!--          <p>操作说明</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/hezuodanwei')"-->
        <!--          ><img src="./images/hezuodanwei.png" />-->
        <!--          <p>合作单位</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/conversion')"-->
        <!--          ><img src="./images/6.png" />-->
        <!--          <p>元宝互转</p></a-->
        <!--        >-->
        <!--      </li>-->
        <li>
          <a href="javascript:void(0)" @click="$router.push('/rank')"
            ><img src="./images/rank.png" />
            <p>排行榜</p></a
          >
        </li>
        <li>
          <a href="javascript:void(0)" @click="$router.push('/fenhong')"
            ><img src="./images/fenhong.png" />
            <p>每周分红奖池</p></a
          >
        </li>

        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/CreditScoreDetail')" class=""-->
        <!--          ><img-->
        <!--            src="data:image/png;base64,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"-->
        <!--            alt=""-->
        <!--          />-->
        <!--          <p>信用分</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li style="opacity: 0; pointer-events: none">-->
        <!--        <a href="javascript:void(0)" @click="jumpToQQ">-->
        <!--          <img src="./images/qq.png" alt="" />-->
        <!--          <p>客户1群（禁言）</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/choujiangDetail')" class=""-->
        <!--          ><img src="./images/choujiang.png" alt="" />-->
        <!--          <p>抽奖盲盒</p></a-->
        <!--        >-->
        <!--      </li>-->
        <!--      <li>-->
        <!--        <a href="javascript:void(0)" @click="$router.push('/CreditScoreInfo')" class=""-->
        <!--          ><img src="./images/xinyongfenshuoming.png" alt="" />-->
        <!--          <p>信用分详细说明</p></a-->
        <!--        >-->
        <!--      </li>-->
      </ul>
      <!--      <el-button-->
      <!--        class="w-100"-->
      <!--        color="#00f7c4"-->
      <!--        size="large"-->
      <!--        style="-->
      <!--          width: 100%;-->
      <!--          border-radius: 15px;-->
      <!--          margin-top: 10px !important;-->
      <!--          color: #fff;-->
      <!--          background-image: linear-gradient(to right, #fb5b4b, #9c38e5);-->

      <!--          border: 1px solid transparent !important;-->
      <!--        "-->
      <!--        type="primary"-->
      <!--        @click="logout"-->
      <!--      >-->
      <!--        退出登录-->
      <!--      </el-button>-->
    </div>
    <!--    <p style="text-align: center; color: #888; width: 100%">京ICP备12025439号</p>-->
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
      <!--      <p-->
      <!--        style="-->
      <!--          transform: translateY(10px);-->
      <!--          text-align: center;-->
      <!--          font-size: 18px;-->
      <!--          color: #000;-->
      <!--          font-weight: bolder;-->
      <!--        "-->
      <!--      >-->
      <!--        请使用68APP扫码进官方群-->
      <!--      </p>-->
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
      confirm-text="进入官方群"
      @confirm="handleUpdateOverlayConfirm"
      :show-close="false"
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
      confirm-text="已阅"
      @confirm="
        () => {
          goJiangshangjiangOverlay = false
          go('/yongjinjiajiang')
        }
      "
      :show-close="false"
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
      confirm-text="已阅"
      @confirm="
        () => {
          goDepOverlay = false
          go('/dep')
        }
      "
      :show-close="false"
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
  logout as fnlogout,
  reqAdvertisingCount,
  reqAdvertisingSinglePrice,
  reqBonusInvite,
  reqGetStaffSettle,
  reqMyStaff,
  reqNgTransfer,
  reqPullNew,
  reqPullNewLite,
  reqQuickReceive,
  reqStaffSettle,
  reqUserCount,
  reqUserIncome,
  reqUserInfo,
  reqUserMemberInfo,
  reqUserStaff,
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
  window.location.href = 'https://qm.qq.com/q/oeeMCZOkrC'
}
const showGonggaoOverlay = ref(false)

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
const list = [
  // {
  //   label: 'APP下载',
  //   icon: 'link-o',
  //   fn() {
  //     goDownload()
  //   }
  // }
  // {
  //   label: '每周奖池大奖',
  //   icon: 'like-o',
  //   fn() {
  //     router.push('/fenhong')
  //   }
  // },
  // {
  //   label: '企业资质证照',
  //   icon: 'user-o',
  //   fn() {
  //     router.push('/zizhizhengzhao')
  //   }
  // }
  // {
  //   label: '收入排行榜',
  //   icon: 'notes-o',
  //   fn() {
  //     router.push('/rank')
  //   }
  // },
  // {
  //   label: '每周奖池大奖',
  //   icon: 'cash-o',
  //   fn() {
  //     router.push('/fenhong')
  //   }
  // },
  // {
  //   label: '余额互转',
  //   icon: 'exchange',
  //   fn() {
  //     router.push('/conversion')
  //   }
  // }
]

const memberInfo = ref({})
const userIncomeInfo = ref({})
const walletInfo = ref({ credit: 0 })
const star = ref(0)
const userCount = ref(0)
const myStaffList = ref([])
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
  reqMyStaff().then((res) => {
    if (res.data.length) {
      myStaffList.value = res.data
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
const getMemberInfo = async () => {
  reqUserMemberInfo({
    uid: userInfo.value.id
  }).then((res) => {
    console.log('memberInfo', memberInfo)
    memberInfo.value = res.data
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
  getMemberInfo()
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
    window.location.href = `https://wmaw.lnyzd.com/download`
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
  reqUserInfo({ id: userInfo.value.id }).then((res) => {
    if (res.code !== 200) {
      return _notice(res.msg)
    }
    userInfo.value = res.data
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))

    // 如果是会员 查询股东星级
    if (userInfo.value?.result?.staff?.serial) {
      let arr = [reqAdvertisingCount(), reqAdvertisingSinglePrice()]
      Promise.all(arr).then((res) => {
        let todayshengyuCount = 100 - res[0]?.data?.ordinary,
          price = res[1]?.data?.price
        shengyukelinqqu.value = Math.max(0, (todayshengyuCount * price).toFixed(2))
      })
    }
    // reqUserStaff().then((res) => {
    //   // if (res.code !== 200) {
    //   //   return _notice(res.msg)
    //   // }
    //   star.value = res.data.star || 0
    // })
  })

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
  reqStaffSettle().then((res) => {
    keLingQuYue.value = 0
    console.log('res')
    if (!res.data.money) {
      showToast('已领取过今日收益！')
    } else {
      showToast(`已领取${res.data.money}钻石`)
    }
  })
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
  reqNgTransfer({ plat: 'ky' }).then((res) => {
    console.log('res', res)
  })
  reqNgTransfer().finally(() => {
    getUserIncome(() => {
      showTotal.value = true
      closeToast()
    })
  })
}

const bonus = ref(0)
const getRed = () => {
  reqBonusInvite('query')
    .then((res) => {
      bonus.value = res.data.bonus || 0
    })
    .finally(() => {
      closeToast()
    })
}
const keLingQuYue = ref(0)
const getKeLingqu = () => {
  reqGetStaffSettle().then((res) => {
    keLingQuYue.value = res.data?.money || 0
  })
}
onActivated(() => {
  showGonggaoOverlay.value = true
  // updateOverlay.value = true
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  init()
  getRed()
  getNewUserInfo()
  getMyStaff()
  getKeLingqu()
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
  color: #666;
  background-color: #f5f5f5;

  overflow-y: auto;

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
  .money-box {
    z-index: 9;
    background-repeat: no-repeat;
    background-image: url('./images/money-bg.png');
    //background-image: linear-gradient(to right, #fb5b4b, #9c38e5);

    background-size: 100% 100%;
    //height: 150px;
    overflow: hidden;
    border-radius: 10px;

    .total {
      color: #fff;
      margin-top: 20px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .l {
        display: flex;
        .txt1 {
          font-size: 16px;
        }

        .txt2 {
          margin-left: 15px;
          font-size: 22px;

          .eye {
            width: 20px;
            margin-left: 4px;
          }
        }
      }
      .r {
      }
    }

    .border {
      height: 35px;
      width: 1px;
      background-color: #eee;
      position: absolute;
      left: 33%;
      transform: translateX(-50%);
      bottom: 30px;
    }

    .border2 {
      height: 35px;
      width: 1px;
      background-color: #eee;
      position: absolute;
      left: 66%;
      transform: translateX(-50%);
      bottom: 30px;
    }

    .money-info {
      margin-top: 20px;
      display: flex;
      color: #fff;
      justify-content: space-around;
      width: 100%;

      & > p {
        width: 52%;
        display: flex;
        flex-direction: column;
        text-align: center;

        .title {
          margin-bottom: 10px;
        }

        .num {
          font-size: 20px;
        }
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

    .chongzhiandtixian {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .chongzhiyue {
        flex: 1;
        font-size: 16px;
        color: #fff;
        display: flex;
        align-items: center;

        .num {
          font-weight: bolder;
        }
      }

      .btn-box {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

        .btn {
          height: 35px;
          border-radius: 8px;
          padding: 2px 15px;
        }
      }
    }

    .huiyuanquanyi {
      width: 100%;
      background-color: #fff;
      padding: 10px 10px;
      border-radius: 10px;
      margin-top: 10px;
      box-sizing: border-box;

      .title {
        font-size: 16px;
        color: #8c8c8c;
        font-weight: bolder;
        line-height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
      .list {
        margin-top: 10px;
        width: 100%;
        display: flex;

        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
          }
          span {
            margin-top: 10px;
            font-size: 12px;
          }
        }
      }
    }

    .shionggongju {
      width: 100%;
      background-color: #fff;
      padding: 10px 10px;
      border-radius: 10px;
      margin-top: 10px;
      box-sizing: border-box;

      .title {
        font-size: 16px;
        color: #8c8c8c;
        font-weight: bolder;
        line-height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
      .list {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .item {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          &:nth-child(n + 5) {
            margin-top: 25px;
          }

          img {
            width: 20px;
            height: 20px;
          }
          span {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
          }
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
    border-bottom: 1px solid #4d536a !important;
    padding-bottom: 5px;

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
