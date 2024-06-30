<template>
	<div class="MusicRankList" @scroll="scroll">
		<dy-back mode="light" img="back" @click="router.back()" class="fixed-back" direction="left" />

		<div class="fixed-header" :style="fixedStyle">
			<span class="f16">二级页面模拟</span>
		</div>
		<div style="margin-top: 60px;">
			<div v-for="item in 199">
				{{ item }}
			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>
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

<style lang='less' scoped>
@import '../../assets/less/index';

.MusicRankList {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	overflow: auto;
	color: white;
	font-size: 14rem;
	padding-bottom: 80px;
	height: calc(100% - 80px);

	.fixed-back {
		position: fixed;
		left: 10rem;
		top: 20rem;
		z-index: 3;
	}

	.fixed-header {
		background: white;
		width: 100%;
		color: black;
		position: fixed;
		z-index: 2;
		height: 60rem;
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
			bottom: 20rem;
			border-radius: 1rem;
			padding: 2rem 30rem;
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
				padding: 20rem 15rem;
				padding-bottom: 0;
				display: flex;
				flex-direction: column;

				.top {
					display: flex;
					align-items: center;

					.rank-wrapper {
						.rank {
							width: 18rem;
							height: 18rem;
							line-height: 18rem;
							text-align: center;
							margin-right: 15rem;
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
								margin-right: 10rem;
								position: relative;
								display: flex;
								align-items: center;
								justify-content: center;

								.play {
									width: 30rem;
									height: 30rem;
									position: absolute;
								}

								.cover {
									border-radius: 2rem;
									@width: 60rem;
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
									font-size: 12rem;
									color: var(--second-text-color);
								}

								.desc-bottom {
									display: flex;

									.duration {
										margin-right: 14rem;
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
								width: 20rem;
								height: 20rem;
								margin-left: 20rem;
							}
						}
					}
				}

				.bottom {
					background: var(--second-btn-color-tran);
					padding: 10rem 15rem;
					margin-left: 33rem;
					margin-top: 15rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;

					.arrow {
						width: 0;
						height: 0;
						border: 8rem solid transparent;
						border-bottom: 8rem solid var(--second-btn-color-tran);
						position: absolute;
						left: 20rem;
						top: -15rem;
					}

					.left {
						display: flex;

						.avatar {
							width: 35rem;
							height: 35rem;
							margin-right: 10rem;
							border-radius: 50%;
						}
					}

					.button {
						width: 60rem;
						height: 25rem;
					}
				}
			}
		}
	}
}
</style>