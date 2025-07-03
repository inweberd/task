<template>
  <div class="publish">
    <van-nav-bar fixed left-arrow placeholder safe-area-inset-top title="广告发布">
      <template #right>
        <!--        <van-icon name="friends-o" size="18" @click="service = true" />-->
      </template>
    </van-nav-bar>
    <div class="content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            src="https://lx.aosenn.com/uploads/20240312/1e8aa821d90c892ca000c98ee4d81273.jpg"
            alt=""
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://lx.aosenn.com/uploads/20240312/06149f3d015ab35855e6e6482d17cba6.jpg"
            alt=""
        /></van-swipe-item>
      </van-swipe>

      <div class="list" style="min-height: 50vh">
        <div class="coupleta">
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px; overflow: hidden">
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20240312/e64fece94f5a8f6a71298b50bfce0086.gif"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>数据仅供测试</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div class="tuijian">
                <div style="position: absolute; top: 0px; left: 0px; z-index: 99">
                  <div style="width: 30px; height: 30px; border-radius: 5px">
                    <img src="https://lx.aosenn.com/h5/static/tuijian.png" draggable="false" />
                  </div>
                </div>
              </div>
              <div class="bom_word">
                <div class="bom_word0">
                  5.00
                  <span>元</span>
                </div>
                <div class="bom_word2">演示发布</div>
                <div class="bom_word3"><div class="bom_worda">剩486单</div></div>
              </div>
            </div>
          </div>
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px">
                  <div
                    style="
                      background-image: url('https://lx.aosenn.com/uploads/20240312/ff70392a2cfb34335b4ed4d8a887d9c3.png');
                      background-position: center center;
                      background-size: cover;
                      background-repeat: no-repeat;
                    "
                  ></div>
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20240312/ff70392a2cfb34335b4ed4d8a887d9c3.png"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>数据仅供测试</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div class="tuijian">
                <div style="position: absolute; top: 0px; left: 0px; z-index: 99">
                  <div style="width: 30px; height: 30px; border-radius: 5px">
                    <div
                      style="
                        background-image: url('https://lx.aosenn.com/h5/static/tuijian.png');
                        background-position: 0% 0%;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                      "
                    ></div>
                    <!----><img
                      src="https://lx.aosenn.com/h5/static/tuijian.png"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
              <div class="bom_word">
                <div class="bom_word0">
                  10.00
                  <span>元</span>
                </div>
                <div class="bom_word2">后台添加</div>
                <div class="bom_word3"><div class="bom_worda">剩595单</div></div>
              </div>
            </div>
          </div>
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px">
                  <div
                    style="
                      background-image: url('https://lx.aosenn.com/uploads/20231221/b24877a0168e080a1c4f4c7f8234fc68.png');
                      background-position: center center;
                      background-size: cover;
                      background-repeat: no-repeat;
                    "
                  ></div>
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20231221/b24877a0168e080a1c4f4c7f8234fc68.png"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>奥森演示发布</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div class="tuijian">
                <div style="position: absolute; top: 0px; left: 0px; z-index: 99">
                  <div style="width: 30px; height: 30px; border-radius: 5px">
                    <div
                      style="
                        background-image: url('https://lx.aosenn.com/h5/static/tuijian.png');
                        background-position: 0% 0%;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                      "
                    ></div>
                    <!----><img
                      src="https://lx.aosenn.com/h5/static/tuijian.png"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
              <div class="bom_word">
                <div class="bom_word0">
                  5.00
                  <span>元</span>
                </div>
                <div class="bom_word2">奥森演示</div>
                <div class="bom_word3"><div class="bom_worda">剩795单</div></div>
              </div>
            </div>
          </div>
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px">
                  <div
                    style="
                      background-image: url('https://lx.aosenn.com/uploads/20221225/c046992a3c3af37de31812957f573243.gif');
                      background-position: center center;
                      background-size: cover;
                      background-repeat: no-repeat;
                    "
                  ></div>
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20221225/c046992a3c3af37de31812957f573243.gif"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>项目名称悬赏标题</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div><div style="position: absolute; top: 0px; left: 0px; z-index: 99"></div></div>
              <div class="bom_word">
                <div class="bom_word0">
                  5.00
                  <span>元</span>
                </div>
                <div class="bom_word2">奥森网络</div>
                <div class="bom_word3"><div class="bom_worda">剩497单</div></div>
              </div>
            </div>
          </div>
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px">
                  <div
                    style="
                      background-image: url('https://lx.aosenn.com/uploads/20240312/5a134878c8a9632a34c6d380f1d70dd4.jpg');
                      background-position: center center;
                      background-size: cover;
                      background-repeat: no-repeat;
                    "
                  ></div>
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20240312/5a134878c8a9632a34c6d380f1d70dd4.jpg"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>这里是任务的标题</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div><div style="position: absolute; top: 0px; left: 0px; z-index: 99"></div></div>
              <div class="bom_word">
                <div class="bom_word0">
                  6.00
                  <span>元</span>
                </div>
                <div class="bom_word2">项目名称</div>
                <div class="bom_word3"><div class="bom_worda">剩798单</div></div>
              </div>
            </div>
          </div>
          <div class="task">
            <div class="left">
              <div class="top">
                <div style="width: 50px; height: 50px; border-radius: 5px">
                  <div
                    style="
                      background-image: url('https://lx.aosenn.com/uploads/20240312/5eed09a854f831049dbb8d1e012eaa0b.jpg');
                      background-position: center center;
                      background-size: cover;
                      background-repeat: no-repeat;
                    "
                  ></div>
                  <!----><img
                    src="https://lx.aosenn.com/uploads/20240312/5eed09a854f831049dbb8d1e012eaa0b.jpg"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="cen" style="margin-top: 5px">
                <div class="cen_word"><span>奥森网络拉新</span></div>
                <div class="cen_btn">马上赚</div>
              </div>
              <div><div style="position: absolute; top: 0px; left: 0px; z-index: 99"></div></div>
              <div class="bom_word">
                <div class="bom_word0">
                  9.00
                  <span>元</span>
                </div>
                <div class="bom_word2">演示数据</div>
                <div class="bom_word3"><div class="bom_worda">剩565单</div></div>
              </div>
            </div>
          </div>
        </div>
        <!---->
      </div>
    </div>
    <BaseFooter :is-white="true" v-bind:init-tab="2" />
  </div>
</template>
<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
</script>

<style scoped lang="less">
.publish {
  color: #303133;
  font-size: 14px;
  height: calc(100vh - var(--footer-height));
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  :deep(.van-nav-bar) {
    background-color: #fed61f !important;

    .van-icon {
      color: transparent !important;
      font-size: 18px !important;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    background: url('https://lx.aosenn.com/h5/static/shouye/homepage_nav_bg_img@.png') no-repeat;
    background-size: 100% 150px;
    background-position: 0 0;
    padding-top: 20px;
    color: #303133;
    .my-swipe {
      margin: 0px 10px 0;
      border-radius: 10px;
      overflow: hidden;

      .van-swipe-item {
        height: 130px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      margin: 0px 12px 0 12px;
      justify-content: space-between;

      .coupleta {
        width: 98%;
        background-color: #f8f8f8;
        margin: 5px auto;

        .task {
          width: 100%;
          height: 75px;
          background-color: #fff;
          border-radius: 5px;
          margin-bottom: 10px;
          position: relative;

          .left {
            .top {
              display: flex;
              align-items: center;
              justify-content: center;
              //margin-left: 10px;
              width: 20%;
              height: 75px;
              background-color: #fff;
              float: left;
              overflow: hidden;
              position: relative;

              img {
                width: 100%;
                height: 100%;
              }
            }
            .cen {
              width: 80%;
              height: 35px;
              float: left;
              overflow: hidden;
              padding-left: 5px;
              box-sizing: border-box;
              .cen_word {
                margin-top: 7px;
                float: left;
                font-size: 14px;
                font-weight: 700;
              }
              .cen_btn {
                float: right;
                background: #fed61f;
                font-size: 12px;
                font-weight: 700;
                padding: 6px 12px;
                border-radius: 15px;
                margin-right: 10px;
                margin-top: 7px;
              }
            }

            .tuijian {
              img {
                width: 30px;
                height: 30px;
              }
            }
            .bom_word {
              float: left;
              width: 80%;
              height: 25px;
              box-sizing: border-box;
              display: flex;
              align-items: center;

              .bom_word0 {
                white-space: nowrap;
                color: red;
                font-weight: 700;
                padding-left: 5px;
              }
              .bom_word2 {
                float: left;
                font-size: 12px;
                color: #999;
                border: 1px solid #ccc;
                padding: 3px 6px;
                margin-left: 10px;
                border-radius: 5px;
              }
              .bom_word3 {
                float: right;
                box-sizing: border-box;
                margin-top: 1px;
                margin-left: auto;
                margin-right: 20px;
                text-align: center;
                .bom_worda {
                  float: right;
                  font-size: 12px;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
