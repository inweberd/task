<template>
	<div>
		<dy-back mode="light" img="back" @click="$router.back()" class="fixed-back" direction="left" />
		<!-- <canvas ref="canvas"></canvas> -->
				<van-image :src="imageSrc" width="100%" height="150"   fit="fill" style='position:absolute;top:0'></van-image>
				<!-- <van-image :src="imageSrc2" width="100%" height="85%"   fit="fill" style='position:absolute;margin-top:150px'></van-image> -->
				
				<div style='overflow:scroll;'>
					<div  style='margin-top:160px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>一级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold;font-size:16px'>200元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>6元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>180元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>2160</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold' @click='buy'>点击购买</div>
					</div>
				</div>

				<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>二级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>500元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>15元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>450元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>5400</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>

								<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>三级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>3000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>31元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>930元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>11160</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>

								<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>四级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>3000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>96元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>2880元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>34560</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>

								<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>五级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>5000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>160元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>4800元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>57600</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>

								<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>六级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>10000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>330元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>9900元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>118800</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>

								<div  style='margin-top:10px;text-align:center;color:#fff;display:flex;background:#6344BB;width:92%;margin-left:4%;border-radise:10px;height:85px;border-radius:10px'>
					<div style='width:100%;padding:10px'>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>七级合伙</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>日收益</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>月收益</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>年收益（365天）</div>
						</div>
						<div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>20000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>7000元</div>
							<div style='display:inline-block;width:20%;text-align:center;color:#fff;font-weight:bold'>21000元</div>
							<div style='display:inline-block;width:40%;text-align:center;color:#fff;font-weight:bold'>216000</div>
						</div>

						<div style='margin-top:10px;background:#fff;color:#6344BB;width:65px;margin:10px auto;font-weight:bold'  @click='buy'>点击购买</div>
					</div>
				</div>
				</div>
			
		 		
	</div>
</template>

<script>
import QRCode from 'qrcode';
import imageSrc from '@/assets/img/hehuoren.png'
import imageSrc2 from '@/assets/img/hehuoren2.png'
import imageSrc3 from '@/assets/img/goumai.png'
export default {
	data () {
		return {
			
			imageSrc: imageSrc,
			imageSrc2: imageSrc2,
			imageSrc3: imageSrc3,
			data:[
				{}
			]
		};
	},
	mounted () {
		
	},
	methods:{
		buy(){
			console.log(123)
		}
	}
	

};
</script>

<style scoped lang="less">

.fixed-back {
	position: fixed;
	left: 10rem;
	top: 20rem;
	z-index: 3;
}

.main{
	width:100%;
	display:flex;
	
}
.item{
	display:block;;
	font-size:14px;
	font-weight:bold;
	color:#fff
}
</style>
