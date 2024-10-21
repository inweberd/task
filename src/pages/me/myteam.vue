<template>
  <div class="investClass">
    <div
      style="
        background-color: #fff;
        margin: 20px;
        border-radius: 15px;
        padding: 10px 10px;
        box-sizing: border-box;
      "
    >
      <div class="info">
        <img src="@/assets/img/2.8184534.png" class="headerImg" />
        <div class="name">
          <strong class="txt1">
            {{
              userInfo.phone
                ? userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(7)
                : ''
            }}</strong
          >
          <em class="txt2">
            <template v-if="userInfo?.result?.staff?.id == '1'">体验卡</template>
            <template v-else>LV{{ userInfo?.result?.staff?.serial }}</template>
          </em>
          <small class="txt3">邀请码:{{ userInfo?.result?.invite?.code }} </small>
          <small class="txt4">会员ID：{{ userInfo?.id }} </small>
          <small class="txt4">当前星级：{{ star }}星级 </small>
        </div>
      </div>
      <!--    <div class="user-count" style="font-size: 14px">-->
      <!--      新用户首次注册，默认赠送体验<span style="color: #3F86FF; font-size: 18px"-->
      <!--        >1星级<br />享受团队下级无限代收益</span-->
      <!--      >-->
      <!--    </div>-->
      <!--    <div class="user-count" style="font-size: 14px">-->
      <!--      首次注册，默认赠送体验1星级，享受团队<span style="color: #3F86FF; font-size: 16px"-->
      <!--        >无限代收益</span-->
      <!--      >-->
      <!--    </div>-->
      <!--    <div class="user-count">平台总注册数：{{ userCount || 0 }}人</div>-->
      <div
        class="flex-row items-center section_5"
        style="padding: 10px 25px"
        @click="$router.push('/CreditScoreDetail')"
      >
        <div
          class="flex-col justify-start items-start flex-1 image-wrapper"
          style="border: 1px solid #ccc; border-radius: 10px; overflow: hidden"
        >
          <!--          :style="{ width: Math.min(walletInfo.credit, 100) + '%' }"-->
          <img
            class="image_4"
            style="height: 9px"
            :style="{ width: 60 + '%' }"
            src="./images/e62b209b1fc33d5b3ca0c4a35e43028e.png"
          />
        </div>
        <span class="text_5 ml-20" style="color: #323233">
          <!--        当前信用分：{{ walletInfo.credit || '&#45;&#45;' }}分</span-->
          当前信用分：<span style="color: #3f86ff; font-size: 20px">{{
            walletInfo.credit || 0
          }}</span>
          分</span
        >
        <!--      <div class="text" @click="go('/CreditScoreDetail', true)">详情</div>-->
      </div>
    </div>
    <div class="balance">
      <div class="price-box">
        <div class="price-1">
          <div class="price-1-title" style="color: #3f86ff; font-size: 18px; font-weight: bolder">
            历史收益
          </div>
          <div class="price-1-content flexS">
            <div class="p-1-c-1" style="color: #323233">{{ userIncomeInfo.total || 0 }}</div>
            <div class="p-1-c-3 flexS">
              <div class="p-1-c-3-btn" @click="go('/dep')" style="background: #3f86ff">提现</div>
              <div class="p-1-c-3-btn" @click="go('recharge')" style="background: #3f86ff">
                充值
              </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
        <div @click="$router.push('/teamStat')" class="price-2 flexS">
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ userIncomeInfo.today || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">今日收益</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ userIncomeInfo.total || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">累计收益(元)</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ walletInfo?.amount || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">充值余额(元)</div>
          </div>
        </div>
        <div @click="$router.push('/teamStat')" class="price-2 flexS">
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ memberInfo.first?.total || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">直推总人数</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ memberInfo.first?.vip || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">直推会员人数</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ memberInfo.team?.deposit || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">团队业绩</div>
          </div>
        </div>
        <div @click="$router.push('/teamStat')" class="price-2 flexS">
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ memberInfo.team?.total || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">团队总人数</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">{{ memberInfo.team?.vip || 0 }}</div>
            <div class="price-1-title" style="color: #323233">团队会员人数</div>
          </div>
          <div class="price-2-item">
            <div class="price-2-item-1" style="color: #3f86ff">
              {{ memberInfo.team?.withdraw || 0 }}
            </div>
            <div class="price-1-title" style="color: #323233">团队总提现</div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="black-tip">-->
    <!--      <div>-->
    <!--        <div>-->
    <!--          拉新奖：拉新 <span class="active">2人</span> 并且他们<span class="active"-->
    <!--            >开通任意会员</span-->
    <!--          >-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          奖励你永久使用<span class="active">69元体验卡</span>！<van-tag-->
    <!--            @click="getPullNew"-->
    <!--            type="success"-->
    <!--            style="padding: 6px 18px; font-size: 20px"-->
    <!--            >领取</van-tag-->
    <!--          >-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="black-tip" style="height: 70px; margin-bottom: 15px" @click="getShouyi">-->
    <!--      <van-button type="warning" color="#3F86FF" block style="height: 25px; margin-top: 2px"-->
    <!--        >尊贵的VIP用户，一键领取视频收入！</van-button-->
    <!--      >-->
    <!--    </div>-->
    <!--    <div class="black-tip">-->
    <!--      <div>-->
    <!--        <div>-->
    <!--          拉新奖：拉新 <span class="active">4人</span> 并且他们<span class="active"-->
    <!--            >开通LV:1级会员</span-->
    <!--          >-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          奖励你永久使用<span class="active">200元会员</span>！<van-tag-->
    <!--            @click="getPullNew2"-->
    <!--            type="success"-->
    <!--            style="padding: 6px 18px; font-size: 20px"-->
    <!--            >领取</van-tag-->
    <!--          >-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <ul class="login_nav">
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
        <a href="javascript:void(0)" @click="showWeimaiquan">
          <!--          <img-->
          <!--            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaEAAAGhCAYAAADIqAvCAAAACXBIWXMAAC4jAAAuIwF4pT92AAAWlElEQVR4nO3dT04cybYH4PRTz+1BqabmrQC/FZi7AnMnNTVeQdMraHoFF6+gi2lNHl7BhRVc2AFMSyU9swKesh0ll2nARf2LExHfJ6FWS60mKsmMX56Ik1mv7u/vOwDI4b8cdQByEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQjRACIBshBEA2QgiAbIQQANkIIQCyEUIAZCOEAMhGCAGQzS8OfTumo8G7ruvetH4cqM7X4WR25c9aplf39/etH4MqTEeDva7r+p950Bykz9X/++vWjw/NuOu6bh5IF31ApX+/GU5mN06DeIRQgVLgvEs/B4IGljIPqKsUUFeCKT8hVIDpaNBXNocpcPqft60fE9iQ2xRI/c/5cDL76sDulhAKKlU7ffAcdV233/rxgB257rpu3IeSfabdEEKBCB4I5TYF0tiy3fYIoQCmo8FRCp73rR8LCOoyBZIluw0TQpmkquc4hY+mAijDXQqjU9XRZgihHUvP6vTh87GpDw71OUtLdRf+tqsTQjsyHQ36rrYTS25QnX6p7kQYrUYIbVmqfE6FD1RPGK1ACG1J2vM5sewGzTlLYWTPaAlCaAumo8FJ2vfRcADt+iM1MOime4YQ2qC07zP2RgMg6Z81OrJE9zQhtAHptTp9+Hwo/sMA2/AlhZGq6AHfJ7Sm6WjQv+HgRgABz+jnh5s0X7BAJbSiVP30ez+/FvkBgFz6xoVjVdE3QmgFqe167P1uwIr6vaJDL0m1HPdi6T1vFwIIWEPfvPSfNJ80TSX0AtPRYOy5H2DDzoaTWbNhJISWkPZ/VD/AtvTfY3TQ4j6R5bifSPs/VwII2KJ+frlK801TVELPSCfEhTcfADtylyqiZhoWVEJPWGhAEEDArrxurWFBJfSIdAL8GW5gQEs+DSezce2fVyX0gAACgvizhYpICC0QQEAw1QeREEoEEBBU1UFkT+j7VzD8O8BQAJ7yz+Fkdl7b0Wk+hLRhA4Wosn276RBKX8F9JYCAQlQXRM3uCaVX8ZwLIKAg/Xw1TvNXFVpuTPBVDECJ9tMNdBWaDKHpaHDim1CBgr2fjganNfwBm9sT0gkHVKT4jrmmQiito97YBwIq0TcqvBtOZjelfpzWluM0IgA1eV36/lAzIZT2gd4HGArAJu2n+a1ITSzHpQdS/xNgKADb8j8lPj/USiVU/evQgeYVOc9VH0KpTPU8EFC7Ipflql6O81oeoEH/XVK3XO2V0FgAAY0palmu2hBKD6XqhgNa079N4bCUz1xzJaQZAWhVMa/0qTKE0rcQvg0wFIAc3pbSpFBdY4JX8wD8pX+lz95wMvsa+XDUWAkdCyCAv+bB4+iHoapKSBUE8IPw1VBtlZAqCOC78NVQbZXQVyEE8IPQ1VA1lVDqiBNAAD/q58WjqMekpuW4Yl9lDrBlYZfkqgih9HYEzwUBPO5t1Lco1FIJhS01AYIIOU8W35iQ2rL/L8BQAKIL94btGiohVRDAcsLNl0IIoB1CaJOmo8E735oKsLS3ad4Mo/RKSBUE8DKh5s3SQ6iYL24CCCLUvFlsCE1Hgz3PBgG8WKgluZIrIVUQwGrCzJ8lh9BBgDEAlEgIbcCHgscOkNN+etA/uyJDKL0rDoDVhZhHS62EhBDAeoTQGoQQwHpCdMiVGkKhnvgFKND7CEMuLoRSf7tvUAVYU4T99RIrIVUQwGZkn09LDKG9AGMAqEH2+bTEENKUALAZKqEVqIQANkMIrcBLSwE2I3uTV1EhFO3LmABKl7tDrrRKKMS7jgDYjNJCyH4QwGaphF5ACAFUpPSv9wZgPVm3OVRCAG3L2vAlhADIxnIcANkIIQCyEUIAZCOEANqW9cvtfmn96Dforuu6q/SxLx58/PlDa7448OWuu6772nXdTfqZ20s/fRvsfkGfJ4rLNI6rdHznnKuVEEL1u+267jwFzsVwMvu6zCeejgZ76QI/TBe8F8f+6Es6plfDyexhmD8pvf/wIP18yDj+iO4enKs3y4xxOhq8WTimB8K+LK/u7++LGfB0NLiI8r3owfUX87j/GU5mV5sYanrJ4VHXdR9rPnA/0Vc7p/1EuWyYPydNnn3IHzc+cZ6lY3q+if9ZuoE6TuerKmkJw8nsVa7fLYTqcpcmydNNTJKPSRPncfpp5QLvl4ROXlLxvFQK+ZPGzu8/0o3SUhXPSy2E/IlK/nlCaElC6Fl/bDN8HkoX+GnllVG/lHm0zfB5KIXRuPJJs1/KPN5W+Dy0cOP0+y5+X4mE0JKE0KOu00S5kWW3l6p40vycqp+dhPpD09HgpMJJ8y6dqxtZdnuptEx3bs/o74TQkoTQ33weTmbHuQeR7jTHlWy09xPl4S6rn6ekgD+vZNnzMh3XLKG+aDoa9BX8r7nHEUnOEPKcULk+RQig7tsJ/HU4mR2mDeaS9VXluwgB1H07rhepQ/E6wHDWcTaczA4iBFD37bj2182nAENpXieEitUH0Dja4IeT2VHBF3c/0R/sap9iWWk8BwUH0ed0XoSSrp9/pMqXjIRQeUIG0FwaW2lBNA+gEHfqD6VxlRhEIZaLn5IqzazfKooQKk3oAJpLYyxlae4ucgDNLQTRbYwR/dRZ5ACaSw09luYyEkLl+FxCAM2lJZjL5f7rrMIH0Fwa52EBS0jXEZfgnpKuqz9ijq5+QqgM1yXcVT4i+oT5W67W9lWl8UY+F+7S370ow8nspJCbpuoIoTIUd1F33+/co94RXw4ns9MA43ixdOf+JejwjqI1d7zAkUaF3RNC8f1R8EXdpQcTI06YxSwXPeE44IR5metB1E1I11mRNyYlE0Kx3VZyUURbPio62Lu4E2bpwT5fliul+aMKQii2bK+N2aQ0YUbplrur6G73NFA1dFZ6sC84CTOSBgihuO5K6oZbQpQLe1xDsHff99yiBGo1y1jpulMN7YgQiquqtel0lxxhb6i2Nf8INyqXpXUZLqGmG8DQhFBcNV4EuTetLytaMvpLkHCv8VwVQjsihGK6rm2yTHKHUK0TS+7jWmxH3FPS9Vf6i2OLIIRiqu6i7r7vYeS8aw/xduwtyHm+XNayx/YI1dAOCKGYap0su4yf7bbS6nIe7rnu2ms+V2vb5wpJCAUU5ftstiTXhV3zMe0c182r/DoMQwjFU/U6dMYLu8oqaEGuEKq9WrAvtGVCKJ5a19cX5XjAUiW0BRXvB821cD1mJYTiaWEd2lp7HVqoEizJbZkQised13ZUfVwzLXM6V1mbEKIJFT7RD1UQQgBkI4RownQ0eFfz55yOBm8CDANeTAjFYzLZjtqPa46Qda6yNiEUT9V37Mn7DL/ThLl5+7V9oEcchBtRZYRQPHs1f7iMy0a1h3uWyXI6GlR9vrp52T4hFM/bytf3c4VB7SGUKwxqD6EWqr2shFBMNU+YuZY3ag+hXJ+v2uWq6WhgKW4HhFBMhxV/tlwX9ttal47S58p1x+5cZS1CKKYqT/60zJijKWGu1gkz5/myX/Hycc0BG4YQimm/0udacl/UR5l//7bk/lzVTdaZq8umCKG4apwwc3+m/dqW5NLnyVld9o4z//5tqPWGJRwhFNdRTcscQSbL3kmAMWxShADYr3ATv8ZgDUkIxfW6sgshyuT/sZZwT58jyh17NeE+HQ2O0vXHDgih2I5rmDDT/tbHAEOZO40xjLUdB5os39dQDaXrrbZqOTQhFFst1VC0Sf9j6Y0faXnz9wBDWVTD5N1fb28DjKMZQii+30ueMNPSRoS9oIdKr4bGAcbwUF8NFXvTlK6zaMFePSFUhnGJy3Lpbj3qZN9PmEXeuaeJPmKw904K7kCMGOzVE0Jl2C/0zv08+Abv76XtY6S79X8FGMpT+r/3eWk3TdPRYOy5oDyEUDk+lrTUUdBFfV7Kcmea2C8CDOVnirppSkvGkRpnmiKEyvKvdMGElgKolIv6dQnLnQsBVErr8Md0HoSWrqc/o4+zZkKoPH9GDqLCAmiuv3O/iBpECwFU2nJR6CASQDEIoTL9GXFprtAAmusn+JtoS3NpPFcF71f8FUTRAl4AxSGEyvWvKBd3P4bpaHBVwbr661QRhag0p6PBYaqASn9u5WM6rtm75tK5OhZAcQihsvUX91XODq80Ud5U1Fn0OlWa2QI+TZT9xv7/VvT6mP10rmYL+FRVXmhCiOXV/f19MYOdjgYXgZ+PyO2sf9p7OJl93cU40l3tuPK/x106pjvb10iT9EnlT+1f9u+8G05mN7v4ZQuv4vl1F7+vRMPJ7FWuYQuhutyl1tjTbYVRCp+Txu4mb/vPvM0wShVl5IdQt+EsHdethFEKn+Ng79gLSQgtSQi9SH+Bj4eT2UaeK0mTZH+X/mF3HyGc2xTy55uYOFOgH3pf2V+V0XhTIZ+W3Y7TsRU+SxBCSxJCK7lLby7oj93VcDK7WuZ/ki7kg4UfF/OPrh8c159WnunOfH5cDz2h/6gvC8d0qRuoFOaL56oXkL6QEFqSENqYfgKdT5r9Hf1i19Kei3gld6mVeu7hcX0nyFdym45lt3DOvln4pyDfgJwh9EuuX0xWixeuUN+M1w+OpeO6GW/dFG3dXc5frkUboG1LLdFvixACIBshBEA2QgiAbEoLoZ08YQ3AbgghgLZpTAAgm528b/IpKiEAshFCAG3byPslVyWEAMimqHfHdd/eH1fWgAECy/neuK7QxoTbAGMAqEHW98Z1hYaQJTmAzcjant0VGkJZN9EAKiKEVpD9oAFUQgitQAgBbEb2+bS47rjuW4fcV99SCbCe3J1xXcGv7VENAaznMsLxKzWENCcArCfEzbwQAmhTiHm0yBAaTmZCCGA9QmhNXwoeO0BOl8PJLOtXOMyVHEKqIYDVnEc5biWHUJiDCFCYMDfxxYbQcDLr3yF3HWAoACW5HU5mYR5zKf3rvccBxgBQklCrSKWHkCU5gJcJdfNedAhZkgN4kVBLcV0FlVDvNMAYAEoQbr6sIYQsyQEsJ9x8WXwIpQeuzgIMBSCyL2kLI5QaKqFOlxzAT4Xcuijy+4QeMx0N+s22/XgjA8iub0jYi/hnqKUS6jQoADzpJOqhqSaEhpNZvyR3G2AoAJHcRW7gqqkS6iKnPUAmp1HemP2Y2kLoPKU+AN/mw9BbFVWFUEp71RDAN6GroK6m7rhF09Gg74V/G2dEADvXV0F70UOotuW4OdUQ0LqT6AHU1VoJdZ4bAtoW9rmgh2qthHrHAcYAkMNRKUe92hAaTmb919d+CTAUgF26TPNfEWquhLp0N6BlG2jFXUlVUFd7CGnZBhpzGvFN2c+ptjFh0XQ06EvT93FGBLBx18PJ7F1ph7X25bg5y3JA7YpahptrIoRSeWpZDqjVb8PJ7KrEz9bEctzcdDTo3y33IcZoADai74Y7KPVQtrIcN3fk6x6AivTbDIclf5ymQih1yxX9BwNYcFjCq3me01ol1KV1098CDAVgHX+U9FDqU5raE1o0HQ36b2L9GGdEAEs7G05mRXbDPdRcJTSX/oDXMUYDsLTrmt6N2WwIJQcaFYCC9I0IB6XvAy1qOoQWGhU8yApEV10Ada2HUPe9UeFAEAGBzQOoyAdSn9N8CHU/BhFARMc1BlAnhL5Lf+BPUcYDkHwaTmbjWg+GEFqQ/tCCCIii6gDqhNDfpT/4P+0RAZlVH0Bdyw+r/sx0NOi/l6N/Gvl17JEClam2CeExKqEn6JoDMmgqgDoh9Lx0Iux5swKwA/08866lAOqE0M+lB8P6iuhL9LECxbpMFdBNa39Ce0IvMB0N+m9n/b2YAQMl+DyczKp5F9xLCaEXmo4G/Wt+xhoWgDX1+z9Hw8nsvOUDKYRWMB0N+n2i/sTZL27wQATXKYCa2v95jBBag+U5YAVNL789JITWNB0NDtLy3NuiPwiwbbep+in+21A3SXfcmtIJ1T/Y+rnoDwJs0+fUfi2AHlAJbVB6y8LYXhGQXKc3YAufJwihLZiOBv1674kOOmhW3/l2MpzMTp0Cz7MctwXpxNuzRAdN6q/7PQG0HJXQlqV27r4q+lj1BwXOUvXT3FsP1iGEdkQYQbWEzxqE0I4thNGhPSMomvDZACGUyXQ0eNN3zfTPDXjGCIpxmzpgT9PLjVmTEAogvY+uD6MPrR8LCKp/i/649fe8bYMQCiRVR4epQvKsEeR1naqesapne4RQUGnv6CCFkgoJduNL+lr/c3s9uyGECpGW7A7SjyoJNuM6hc6FpbY8hFCh0otTD9J7695pboCf6psKrtJPHzxXltnyE0IVScH0JoXSXvrpvW/92NCMvrLpg+Vm8ce72+ISQo1Je017G/rU/279eAZwnRpZWvXVF8OVTQixsulo4OTJ62w4mR21fAAonxeYQpk+CyBq8Iu/IhTn03AyG/uzUQMhBOW4S18PrZWYagghKEMfQAc24amNPSGIr++AeyeAqJFKCGK7ThWQhyqpkhCCuLRgUz3LcRCTFmyaoBKCeLRg0wwhBHFowaY5Qghi0IJNk+wJQX5asGmWSgjy0oJN04QQ5KMFm+ZZjoM8tGDTvE4lBFlowYZECMHuaMGGB4QQ7IYWbHiEPSHYPi3Y8ASVEGyXFmx4hkoItudMAMHzVEKwHZ4BgiWohGDzPgkgWI4Qgs258wwQvIzlONgMLdiwApUQrO9aAMFqVEKwHi3YsAaVEKxOCzasSSUEq9GCDRugEoKX04INGyKEYHlasGHDLMfBcrRgwxaohODntGDDlqiE4HlasGGLVELwNC3YsGUqIXicFmzYAZUQ/J0WbNgRIQTfacGGHbMcB99owYYMVEKgBRuyUQnROi3YkJFKiJZpwYbMVEK0Sgs2BKASokVasCEIIURLtGBDMJbjaIUWbAhIJUQLtGBDUCohaqcFGwJTCVEzLdgQnEqIWmnBhgKohKiRFmwohBCiJlqwoTCW46iFFmwokEqIGmjBhkKphCidFmwomEqIkmnBhsKphCiVFmyogEqIEmnBhkoIIUqiBRsqYzmOUmjBhgqphCiBFmyolEqI6LRgQ8VUQkSmBRsqpxIiKi3Y0ACVEBFpwYZGCCEi0YINjbEcRxRasKFBKiEi0IINjVIJkZsWbGiYSoictGBD41RC5KIFG1AJkYUWbOAvQohd0oIN/MByHLuiBRv4G5UQu6AFG3iUSoht04INPEklxDZpwQaepRJiW7RgAz+lEmIbtGADSxFCbJIWbOBFLMexKVqwgRdTCbEJWrCBlaiEWJcWbGBlKiHW8VkAAet4dX9/7wACkIVKCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQDZCCIBshBAA2QghALIRQgBkI4QAyEYIAZCNEAIgGyEEQB5d1/0/wo82TzgGtWoAAAAASUVORK5CYII="-->
          <!--            alt=""-->
          <!--          />-->
          <img src="./images/jiaoliu.png" alt="" />
          <p>官方交流群</p></a
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
          ><img src="./images/yaoqing.png" alt="" />
          <p>邀请好友</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="go('/demo', true)"
          ><img src="./images/tuiguang.png" alt="" />
          <p>推广返利海报</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="go('/wallet')"
          ><img src="./images/shouru.png" alt="" />
          <p>收入明细</p></a
        >
      </li>

      <li>
        <a href="javascript:void(0)" @click="$router.push('/teamStat')"
          ><img src="./images/team.png" alt="" />
          <p>团队报表</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="$router.push('/pingtaijianjie')"
          ><img src="./images/pingtaijianjie.png" />
          <p>平台简介</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="$router.push('/caozuoshuoming')"
          ><img src="./images/caozuoshuoming.png" />
          <p>操作说明</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="$router.push('/hezuodanwei')"
          ><img src="./images/hezuodanwei.png" />
          <p>合作单位</p></a
        >
      </li>
      <li>
        <a href="javascript:void(0)" @click="goDownload"
          ><img src="./images/download.png" />
          <p>APP下载</p></a
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
      <!--        <a href="javascript:void(0)" @click="jumpToQQ2">-->
      <!--          &lt;!&ndash;          <img&ndash;&gt;-->
      <!--          &lt;!&ndash;            src="data:image/png;base64,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"&ndash;&gt;-->
      <!--          &lt;!&ndash;            alt=""&ndash;&gt;-->
      <!--          &lt;!&ndash;          />&ndash;&gt;-->
      <!--          <img src="./images/qq.png" alt="" />-->
      <!--          <p>官方2群(不禁言)</p></a-->
      <!--        >-->
      <!--      </li>-->
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
    <div class="LoginOut">
      <button class="tabs_btn1" @click="logout">退出登陆</button>
    </div>
    <BaseFooter v-bind:init-tab="6" :is-white="false" />
  </div>
</template>

<script lang="ts" setup>
import BaseFooter from '@/components/BaseFooter.vue'
import { onActivated, onMounted, ref } from 'vue'
import {
  logout as fnlogout,
  reqPullNew,
  reqPullNewLite,
  reqQuickReceive,
  reqUserCount,
  reqUserIncome,
  reqUserInfo,
  reqUserMemberInfo,
  reqUserStaff,
  reqWalletInfo
} from '@/api/myApi'
import { loadInteraction } from '@/utils/ad'
import { _notice } from '@/utils'
import { useRouter } from 'vue-router'
import weimaiquan from '@/assets/img/weimaiquan.jpg'
import { closeToast, showDialog, showLoadingToast } from 'vant'

const router = useRouter()
const userInfo = ref(JSON.parse(window.localStorage.getItem('userInfo')))
const memberInfo = ref({})
const userIncomeInfo = ref({})
const walletInfo = ref({ credit: 0 })
const star = ref(0)
const userCount = ref(0)
const format = (price = 0) => {
  let result = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result === '0' ? '0.00' : result
}
const showWeimaiquan = () => {
  showImagePreview({
    images: [weimaiquan]
  })
}
const getPullNew = () => {
  // showDialog({
  //   message: '完成任务后，进入官方qq群找客服领取奖励！'
  // })
  showLoadingToast({
    duration: 0,
    message: '加载中'
  })
  reqPullNewLite().then((res) => {
    closeToast()
    showDialog({
      message: res.msg
    })
  })
}
const getPullNew2 = () => {
  showLoadingToast({
    duration: 0,
    message: '加载中'
  })
  reqPullNew().then((res) => {
    closeToast()
    showDialog({
      message: res.msg
    })
  })
}
const getShouyi = () => {
  showLoadingToast({
    duration: 0,
    message: '加载中'
  })
  if (!userInfo.value?.result?.staff?.id) {
    closeToast()
    showDialog({
      message: '开通会员即可一键获取收益！'
    }).then(() => {
      router.push('/invest')
    })
    return
  }
  reqQuickReceive().then((res) => {
    closeToast()

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
    memberInfo.value = res.data
  })
}
const getUserIncome = () => {
  // loading.value = true
  reqUserIncome().then((res) => {
    // loading.value = false
    userIncomeInfo.value = res.data
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
  window.location.href = decodeURIComponent('https://qm.qq.com/q/PKi43AkbEy')
}
function jumpToQQ2() {
  window.location.href = decodeURIComponent('https://qm.qq.com/q/YAXWXyOXGU')
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
    window.location.href = `https://pk.yuyuwa.cn/download`
  } catch (e) {
    _notice('下载失败')
    // state.loading.app = false
    // proxy.$refs['notify'].error('下载失败，请稍后再试！')
  }
}
const goFenHong = () => {
  router.push('/fenhong')
}
const getNewUserInfo = () => {
  reqUserInfo({ id: userInfo.value.id }).then((res) => {
    if (res.code !== 200) {
      return _notice(res.msg)
    }
    userInfo.value = res.data
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))

    // 如果是会员 查询股东星级
    if (userInfo.value?.result?.staff?.serial) {
    }
    reqUserStaff().then((res) => {
      // if (res.code !== 200) {
      //   return _notice(res.msg)
      // }
      star.value = res.data.star || 0
    })
  })

  reqWalletInfo().then((res) => {
    if (res.code !== 200) return
    walletInfo.value = res.data
  })
}

const toMySub = () => {
  // loadInteraction()
  router.push('/mysub')
}
onActivated(() => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
  init()
  getNewUserInfo()
})
</script>

<style lang="less" scoped>
.investClass {
  width: 100vw;
  height: calc(100% - 56px);
  padding-top: 40px;

  overflow-y: auto;

  .info {
    margin: 15px auto 16px;
    padding-left: 20px;
    overflow: hidden;
    .headerImg {
      width: 50px;
      height: 50px;
      display: block;
      border-radius: 50%;
      margin-top: 20px;
      float: left;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
    .name {
      float: left;
      margin-left: 12px;
      .txt1 {
        font-size: 18px;
        color: #323233;
        display: block;
        float: left;
      }
      .txt2 {
        display: block;
        float: left;
        margin-left: 6px;
        padding: 0 4px;
        height: 16px;
        background: #3f86ff;
        color: #fff;
        border-radius: 2px;
        font-size: 10px;
        line-height: 16px;
        text-align: center;
        margin-top: 4px;
      }
      .txt3 {
        clear: both;

        font-size: 13px;
        color: #323233;
        margin-top: 10px;
        display: block;
        text-align: left;
      }
      .txt4 {
        clear: both;
        font-size: 13px;
        color: #323233;
        display: block;
        text-align: left;
      }
    }
  }
  .user-count {
    padding-left: 20px;
    font-size: 18px;
    color: #323233;
  }
  .balance {
    //height: 188px;
    //background: url(@/assets/img/mymp.png);
    //background-size: 100% 100%;
    background-color: #fff;
    margin: 20px;
    position: relative;
    border-radius: 15px;

    padding: 25px 23px 20px;
    box-sizing: border-box;
    .price-box {
      width: 100%;
      background-size: 100% 100%;

      .price-1 {
        .price-1-title {
          font-weight: 400;
          color: #323233;
          height: 16.5px;
          line-height: 16.5px;
          font-size: 12px;
        }
        .price-1-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .p-1-c-1 {
            font-size: 27px;
            font-weight: 600;
            line-height: 40px;
            color: #3f86ff;
          }
          .p-1-c-3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .p-1-c-3-btn {
              width: 50px;
              height: 27px;
              background: #3f86ff;
              border-radius: 14px;
              font-size: 13px;
              font-weight: 600;
              color: #fff;
              text-align: center;
              line-height: 26px;
              margin-left: 16px;
            }
          }
        }
      }
      .hr {
        width: 325px;
        height: 1px;
        background: #434343;
        opacity: 0.05;
        top: 90px;
        position: absolute;
      }
      .price-2 {
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin-top: 20px;
        .price-2-item {
          position: relative;
          flex: 1;
          text-align: center;
          .price-2-item-1 {
            color: #3f86ff;
            font-size: 16px;
            font-weight: 700;
          }
          .price-2-item-2 {
            color: #323233;
            opacity: 0.7;
            font-size: 12px;
          }
        }
      }
    }
  }
  .black-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #302e2e;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    width: 100%;
    height: 120px;
    background: url('@/assets/img/black-tip.png') no-repeat;
    background-size: 100% 100%;
    .active {
      color: red;
    }
    & > div {
      text-align: center;
      line-height: 25px;
    }
  }

  .login_nav {
    border-radius: 15px;
    padding: 10px;

    overflow: hidden;
    margin: 20px;
    background-color: #ffffff;
    li {
      float: left;
      width: 33%;
      box-sizing: border-box;
      text-align: center;
      padding: 21px 0 2px;
      a {
        display: block;
        width: 100%;
        img {
          height: 33px;
        }
        p {
          font-size: 14px;
          color: #323233;
        }
      }
    }
  }
  .LoginOut {
    padding: 0 12.6px 25px;
    .tabs_btn1 {
      margin-left: 5%;
      width: 90%;
      font-size: 15px;
      line-height: 37px;
      color: #fff;
      text-align: center;
      border-radius: 50px;
      background-color: #4b6fff;
      margin-top: 18px;
      border: none;
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
</style>
