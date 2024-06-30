<script setup>
import { reactive, ref, watch } from 'vue'
import { _checkImgUrl, _duration, _formatNumber, _stopPropagation } from '@/utils'
import { recommendedLongVideo } from '@/api/videos'
import ScrollList from '@/components/ScrollList.vue'
import { useNav } from '@/utils/hooks/useNav'
import SlideItem from '@/components/slide/SlideItem.vue'
const activeTab = ref(3);


const tab = ref(
	[{name:'关注',id:1},
	{name:'推荐',id:2},
	{name:'视频',id:3},
	{name:'短剧',id:4},
	{name:'图文',id:5},
	{name:'平顶山',id:6},]

	)








const nav = useNav()
</script>

<template>

	<SlideItem>
	
	<div  class="navs">
	<!-- <div v-for="(item,index) in tab" :key='index'>
		<div  class='navItem' :class="{activeIndex:activeTab==item.id}" @click='activeTab=item.id'>{{item.name}}</div>
	</div> -->
	</div>
		<div class="long-video">
			<ScrollList class="Scroll" :api="recommendedLongVideo">
				<template v-slot="{ list }">
					<div class="list" style='padding-top:30px'>
						<div class="item" :key="i" v-for="(item, i) in list" @click="nav('/video-detail', {}, { list, index: i })" >
						
							<!-- <div class="video-wrapper" v-if="i % 9 === 0">
								<video muted preload loop x5-video-player-type="h5-page" :x5-video-player-fullscreen="false"
									:webkit-playsinline="true" :x5-playsinline="true" :playsinline="true" :fullscreen="false"
									v-is-can-play :poster="_checkImgUrl(item.video.cover.url_list[0])"
									:src="item.video.play_addr.url_list[0]"></video>
								<div class="options">
									<div class="left"></div>
									<div class="right">
										<div class="option" @click.stop="state.danmu = !state.danmu">
											<img v-if="state.danmu" src="@/assets/img/icon/danmu-open.svg" />
											<img v-else src="@/assets/img/icon/danmu-close.svg" />
										</div>
										<div class="option" @click.stop="state.muted = !state.muted">
											<Icon v-if="state.muted" icon="charm:sound-mute" />
											<Icon v-else icon="akar-icons:sound-on" />
										</div>
										<div class="option">
											<img src="@/assets/img/icon/rotate.svg" />
										</div>
									</div>
								</div>
							</div> -->
							<img  v-lazy="_checkImgUrl(item.video.cover.url_list[0])" alt="" class="poster" />
							<div class="duration">{{ _duration(item.duration / 1000) }}</div>
							<div class="title">
								{{ item.desc }}
							</div>
							<div class="bottom">
								<div class="l">
									<img v-lazy="_checkImgUrl(item.author.avatar_168x168.url_list[0])" alt="" class="avatar" />
									<div class="name">{{ item.author.nickname }}</div>
								</div>
								<div class="r">
									<Icon icon="icon-park-outline:like" />
									<div class="num">
										{{ _formatNumber(item.statistics.digg_count) }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</ScrollList>
		</div>
		<BaseFooter v-bind:init-tab="4" />

	</SlideItem>

</template>

<style scoped lang="less">
.long-video {
	font-size: 14rem;
	color: white;
	background: rgb(21, 23, 36);

	.Scroll {
		height: calc(var(--vh, 1vh) * 100 - var(--footer-height)) !important;
	}
}

.list {
	width:96%;
	display: flex;
	justify-content: space-between;
	flex-wrap:wrap;
	margin-left:2%;
	.item {
		position: relative;
		width:32%;
		margin-bottom:20px;
		.poster {
			border-radius: 12rem;
			width: 100%;
			height: 160rem;
			object-fit: cover;
		}

		.video-wrapper {
			height: 220rem;
			position: relative;

			video {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.options {
				width: 100%;
				box-sizing: border-box;
				padding: 0 12rem;
				display: flex;
				position: absolute;
				bottom: 8rem;
				justify-content: space-between;
				align-items: center;
				color: white;

				.right {
					display: flex;
					align-items: center;
					gap: 10rem;
				}

				img {
					width: 20rem;
				}

				svg {
					font-size: 20rem;
				}
			}
		}

		.title {
			height: 36rem;
			color: white;
			font-size: 14rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box; //作为弹性伸缩盒子模型显示。
			-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
			-webkit-line-clamp: 2; //显示的行
		}

		.f {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
		}

		.duration {
			color: white;
			position: absolute;
			bottom: 75rem;
			left: 5rem;
			font-size: 13rem;
		}

		.bottom {
			color: gray;
			.f;
			font-size: 13rem;
			margin-top:10px;
			.l {
				.f;
				justify-content: flex-start;

				.name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //作为弹性伸缩盒子模型显示。
					-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
					-webkit-line-clamp: 1; //显示的行
				}

				.avatar {
					@w: 20rem;
					width: @w;
					height: @w;
					object-fit: cover;
					border-radius: 50%;
				}
			}

			.r {
				word-break: keep-all;
				.f;

				svg {
					font-size: 16rem;
				}
			}
		}

		&.big {
			grid-column-start: 1;
			grid-column-end: 3;
			margin: 0;

			&.pause {
				.duration {
					display: block;
				}

				.options {
					display: none;
				}
			}

			.duration {
				display: none;
				bottom: 67rem;
			}

			.title {
				height: unset;
				-webkit-line-clamp: 1;
			}

			.title,
			.bottom {
				padding: 0 10rem;
			}
		}

		&.l {
			margin-right: 5rem;
		}

		&.r {
			margin-left: 5rem;
		}
	}
}

.navs{
	width:90%;
	margin-left:5%;
display: flex; /* 设定为Flex容器 */
  justify-content: space-between; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-size:16px;
  margin-top:10px;
  margin-bottom:10px
}
.navItem{
	display:flex;
	color:#fff
}
.activeIndex{
	font-size:18px;
	font-weight:bold;
	color:rgb(11,87,208)
}
</style>
