<template>
	<div>
		<dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
		<!-- <canvas ref="canvas"></canvas> -->
		 <van-image :src="imageSrc" width="100%" height="100%" fit="cover"></van-image>
	</div>
</template>

<script>
import QRCode from 'qrcode';
import imageSrc from '@/assets/img/xuanchuan.png'
export default {
	data () {
		return {
			canvasWidth: window.innerWidth,
			canvasHeight: window.innerHeight,
			imageSrc: imageSrc,
			qrCodeText: JSON.parse(window.localStorage.getItem('userInfo')).result?.invite?.code
		};
	},
	mounted () {
		this.generatePoster();
		window.addEventListener('resize', this.updateCanvasSize);
	},
	beforeUnmount () {
		window.removeEventListener('resize', this.updateCanvasSize);
	},
	methods: {
		updateCanvasSize () {
			this.canvasWidth = window.innerWidth;
			this.canvasHeight = window.innerHeight;
			this.generatePoster();
		},
		async generatePoster () {
			const canvas = this.$refs.canvas;
			canvas.width = this.canvasWidth;
			canvas.height = this.canvasHeight;
			const ctx = canvas.getContext('2d');

			// 绘制背景图片
			const image = new Image();
			image.src = this.imageSrc;
			image.onload = async () => {
				ctx.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);

				const qrCodeSize = 120; // 调整二维码的大小
				const qrCodeMarginBottom = 100; // 调整二维码距离底部的距离
				const qrCodeDataURL = await QRCode.toDataURL(this.qrCodeText, {
					width: qrCodeSize, height: qrCodeSize,

					margin: 1
				});
				const qrCodeImage = new Image();
				qrCodeImage.src = qrCodeDataURL;
				qrCodeImage.onload = () => {
					// 在海报上绘制二维码，位置在正中心下方
					const qrCodeX = (this.canvasWidth - qrCodeSize) / 2;
					const qrCodeY = this.canvasHeight - qrCodeSize - qrCodeMarginBottom;
					ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
				};
			};
		}
	}
};
</script>

<style scoped lang="less">
html,
body,
#app {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.fixed-back {
	position: fixed;
	left: 10rem;
	top: 20rem;
	z-index: 3;
}

/* 你的样式 */
</style>
