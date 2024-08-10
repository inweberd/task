<template>
  <div class="edit">
    <Loading v-if="loading"></Loading>
    <BaseHeader>
      <template v-slot:center>
        <div class="title">
          <span class="f16">编辑资料</span>
          <span class="sub f10">已完成85%</span>
        </div>
      </template>
    </BaseHeader>
    <div class="userinfo">
      <van-uploader ref="uploaderRef" class="change-avatar" :after-read="afterRead">
        <!--          <div class="avatar-ctn" @click="showAvatarDialog">-->
        <div class="avatar-ctn" @click="uploaderRef.chooseFile">
          <!--          <img class="avatar" :src="userInfo.avatar" alt="" />-->
          <van-image class="avatar" :src="userInfo?.avatar" style="border: 1px solid #ccc" round />
          <img class="change" src="../../../assets/img/icon/me/camera-light.png" alt="" />
        </div>
        <span>点击更换头像</span>
      </van-uploader>
      <!--      <div class="row" @click="nav('/me/edit-userinfo-item', { type: 1 })">-->
      <!--        <div class="left">名字</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ isEmpty(store.userinfo.nickname) }}</span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="nav('/me/edit-userinfo-item', { type: 2 })">-->
      <!--        <div class="left">抖音号</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ isEmpty(_getUserDouyinId({ author: store.userinfo })) }}</span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="nav('/me/edit-userinfo-item', { type: 3 })">-->
      <!--        <div class="left">简介</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ isEmpty(store.userinfo.signature) }}</span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="showSexDialog">-->
      <!--        <div class="left">性别</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ sex }}</span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="showBirthdayDialog">-->
      <!--        <div class="left">生日</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ isEmpty(store.userinfo.user_age) }}</span>-->
      <!--          <div v-show="false" id="trigger1"></div>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="nav('/me/choose-location')">-->
      <!--        <div class="left">所在地</div>-->
      <!--        <div class="right">-->
      <!--          <span v-if="store.userinfo.province || store.userinfo.city">-->
      <!--            {{ store.userinfo.province }}-->
      <!--            <template v-if="store.userinfo.province && store.userinfo.city"> - </template>-->
      <!--            {{ store.userinfo.city }}-->
      <!--          </span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row" @click="nav('/me/add-school')">-->
      <!--        <div class="left">学校</div>-->
      <!--        <div class="right">-->
      <!--          <span>{{ isEmpty(store.userinfo.school?.name) }}</span>-->
      <!--          <dy-back scale=".8" direction="right"></dy-back>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <transition name="fade">
      <div class="preview-img" v-if="data.previewImg" @click="data.previewImg = ''">
        <img class="resource" :src="data.previewImg" alt="" />
        <img
          class="download"
          src="../../../assets/img/icon/components/video/download.png"
          alt=""
          @click.stop="_no"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import MobileSelect from '../../../components/mobile-select/mobile-select'
import { useBaseStore } from '@/store/pinia'
import {
  _checkImgUrl,
  _getUserDouyinId,
  _hideLoading,
  _no,
  _notice,
  _showLoading,
  _showSelectDialog,
  _sleep
} from '@/utils'
import { computed, onActivated, reactive, ref } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { reqUpdateUserInfo, reqUpload } from '@/api/myApi'
import { userinfo } from '@/api/user'
import Loading from '@/components/Loading.vue'
defineOptions({
  name: 'EditUserInfo'
})
const loading = ref(false)
const store = useBaseStore()
const nav = useNav()
const data = reactive({
  sexList: [
    { id: 1, name: '男' },
    { id: 2, name: '女' },
    { id: 3, name: '不展示' }
  ],
  avatarList: [
    { id: 1, name: '拍一张' },
    { id: 2, name: '从相册选择' },
    { id: 3, name: '查看大图' },
    { id: 4, name: '取消' }
  ],
  previewImg: ''
})
const userInfo = ref({})
const uploaderRef = ref()
const sex = computed(() => {
  switch (Number(store.userinfo.gender)) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return ''
  }
})

function isEmpty(val) {
  if (val && val !== -1) return val
  return '点击设置'
}

function showSexDialog() {
  _showSelectDialog(data.sexList, async (e) => {
    _showLoading()
    await _sleep(500)
    store.setUserinfo({ ...store.userinfo, gender: e.id })
    _hideLoading()
  })
}

function showAvatarDialog() {
  _showSelectDialog(data.avatarList, (e) => {
    switch (e.id) {
      case 1:
      case 2:
        return _no()
      case 3:
        data.previewImg = _checkImgUrl(store.userinfo.cover_url[0].url_list[0])
        break
    }
  })
}

function showBirthdayDialog() {
  new MobileSelect({
    trigger: '#trigger1',
    title: '生日',
    connector: '生日',
    wheels: [
      {
        data: Array.apply(null, { length: 100 }).map((v, i) => new Date().getFullYear() - i)
      },
      {
        data: Array.apply(null, { length: 12 }).map((v, i) => 12 - i)
      },
      {
        data: Array.apply(null, { length: 31 }).map((v, i) => 31 - i)
      }
    ],
    callback: async (indexArr, data) => {
      _showLoading()
      await _sleep(500)
      store.setUserinfo({
        ...store.userinfo,
        birthday: data.join('-')
      })
      _hideLoading()
    }
  }).show()
}

const afterRead = (fileInfo) => {
  loading.value = true
  loading.value = true
  reqUpload(fileInfo.file).then((res: any) => {
    console.log('reqUpload', res)
    if (res.code !== 200) {
      loading.value = false
      return _notice('头像上传失败！')
    }
    const info = JSON.parse(window.localStorage.getItem('userInfo'))
    reqUpdateUserInfo({
      id: info.id,
      avatar: res.data.path
    }).then((sub_res) => {
      loading.value = false
      if (sub_res.code !== 200) return _notice('头像修改失败！')

      userInfo.value.avatar = res.data.path
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    })
  })
}

onActivated(() => {
  userInfo.value = JSON.parse(window.localStorage.getItem('userInfo'))
})
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.edit {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 14px;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  .sub {
    color: var(--second-text-color);
  }
}

.preview-img {
  z-index: 9;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .resource {
    width: 100%;
    max-height: %;
  }

  .download {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 3px;
    background: var(--second-btn-color-tran);
    width: 20px;
  }
}

.userinfo {
  padding-top: 60px;
  color: white;

  .change-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30px 0;
    @avatar-width: 80px;

    .avatar-ctn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      width: @avatar-width;
      height: @avatar-width;

      .avatar {
        opacity: 0.5;
        position: absolute;
        width: @avatar-width;
        height: @avatar-width;
        border-radius: 50%;
      }

      .change {
        width: 28px;
        z-index: 9;
      }
    }
  }
}

.change-dialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background: white;
    width: 80%;
    padding: 5px 0;
    border-radius: 2px;
    box-sizing: border-box;

    .item {
      font-size: 15px;
      padding: 15px 20px;
      transition: all 0.2s;

      &:active {
        background: darkgray;
      }
    }
  }
}
</style>
