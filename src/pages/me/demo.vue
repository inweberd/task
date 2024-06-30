<template>
    <div>
        <van-nav-bar title="股东等级" safe-area-inset-top fixed placeholder @click-left="router.back()" left-text="返回" left-arrow></van-nav-bar>
        <van-image :src="shareholder" width="94%" height="100%" style='margin-left:3%;position:absolute'></van-image>
    </div>
</template>

<script lang='ts' setup>
import shareholder from '@/assets/img/shareholder.png'
</script>
<style scoped>
html{
     background:red
}
body{
     background:red
}
#app{
    background:red
}
</style>
