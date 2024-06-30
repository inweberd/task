<template>

	<van-dialog v-model:show="props.modelValue" @confirm="hide()" title="赏金联盟官方群">
		<view class="d-flex flex-column font-15" style="display: flex; flex-direction: column; justify-content: center;">
			<view>1、打开QQ聊天软件</view>
			<view>2、搜索群号：952272832</view>
			<view>3、加入会员群</view>
			<view>小技巧：直接保存二维码扫码加入</view>
			<van-image :src="aa" mode="aspectFit"></van-image>
			<view class="d-flex align-items-center justify-content-center">APP 版本： '1.0.1' </view>
		</view>
	</van-dialog>

</template>

<script setup>
import aa from './qq-group-1.png'
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['update:modelValue'])


// 显示对话框
const show = () => {
	props.modelValue = true
	emit('update:modelValue', true)
}
const hide = () => {
	props.modelValue = false
	emit('update:modelValue', false)
}

// 将子组件方法暴露给父组件
defineExpose({
	show, hide
})
</script>