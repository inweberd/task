<template>
  <div class="MusicRankList" @scroll="scroll">
    <dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" />

    <div class="fixed-header" :style="fixedStyle">
      <span class="f16">二级页面模拟</span>
    </div>
    <div style="margin-top: 60px">
      <div v-for="item in 199">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const data = reactive({
  scrollTop: 0
})
const fixedStyle = computed(() => {
  return {
    opacity: data.scrollTop / 120 > 1 ? 1 : data.scrollTop / 120
  }
})

function scroll(e) {
  data.scrollTop = e.target.scrollTop
}
</script>

<style lang="less" scoped>
@import '../../assets/less/index';

.MusicRankList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  font-size: 14px;
  padding-bottom: 80px;
  height: calc(100% - 80px);

  .fixed-back {
    position: fixed;
    left: 10px;
    top: 20px;
    z-index: 3;
  }

  .fixed-header {
    background: white;
    width: 100%;
    color: black;
    position: fixed;
    z-index: 2;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .l-header {
    position: relative;
    display: flex;
    justify-content: center;

    img {
      width: 100vw;
    }

    .update-time {
      position: absolute;
      background: rgba(172, 107, 251, 0.5);
      bottom: 20px;
      border-radius: 1px;
      padding: 2px 30px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .indicator-ctn {
      width: 85%;
    }

    .list {
      .item {
        padding: 20px 15px;
        padding-bottom: 0;
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          align-items: center;

          .rank-wrapper {
            .rank {
              width: 18px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              margin-right: 15px;
            }
          }

          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .music {
              display: flex;

              .cover-wrapper {
                margin-right: 10px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                .play {
                  width: 30px;
                  height: 30px;
                  position: absolute;
                }

                .cover {
                  border-radius: 2px;
                  @width: 60px;
                  width: @width;
                  object-fit: cover;
                  height: @width;
                }
              }

              .desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .name {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  max-width: 40vw;
                }

                .author,
                .desc-bottom {
                  font-size: 12px;
                  color: var(--second-text-color);
                }

                .desc-bottom {
                  display: flex;

                  .duration {
                    margin-right: 14px;
                    position: relative;

                    &:after {
                      content: '';
                      position: absolute;
                      width: 1.5px;
                      height: 1.5px;
                      border-radius: 50%;
                      background: white;
                      right: -7px;
                      top: 7px;
                    }
                  }
                }
              }
            }

            .option {
              img {
                width: 20px;
                height: 20px;
                margin-left: 20px;
              }
            }
          }
        }

        .bottom {
          background: var(--second-btn-color-tran);
          padding: 10px 15px;
          margin-left: 33px;
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .arrow {
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom: 8px solid var(--second-btn-color-tran);
            position: absolute;
            left: 20px;
            top: -15px;
          }

          .left {
            display: flex;

            .avatar {
              width: 35px;
              height: 35px;
              margin-right: 10px;
              border-radius: 50%;
            }
          }

          .button {
            width: 60px;
            height: 25px;
          }
        }
      }
    }
  }
}
</style>
