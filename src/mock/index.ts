import resource from '../assets/data/resource.js'
import posts6 from '@/assets/data/posts6.json'
import shortPlay from '@/assets/data/shortPlay.json'
import posts7 from '@/assets/data/posts7.json'
import { _fetch, cloneDeep, random } from '@/utils'
import { BASE_URL, FILE_URL } from '@/config'
import { useBaseStore } from '@/store/pinia'
import { axiosInstance } from '@/utils/request'
import MockAdapter from 'axios-mock-adapter'
import { getInitVideo } from '@/utils/getInitVideo'
console.log('posts6', posts6)
const initVideo = getInitVideo()
console.log('initVideo', JSON.parse(JSON.stringify(initVideo)))
posts7.sort((item) => Math.random() - 0.5)
initVideo.sort((item) => Math.random() - 0.5)
console.log('initVideo', initVideo)
const mock = new MockAdapter(axiosInstance)
function getPage2(params: any): { limit: number; offset: number; pageNo: number } {
  const offset = params.pageNo * params.pageSize
  const limit = params.pageNo * params.pageSize + params.pageSize
  return { limit, offset, pageNo: params.pageNo }
}

let allRecommendPosts = []
let userVideos = []
let allRecommendVideos = initVideo.map((v: any) => {
  v = JSON.parse(JSON.stringify(v))
  v.type = 'recommend-video'
  return v
})

let allShorPlayVideos = shortPlay.map((v: any) => {
  v = JSON.parse(JSON.stringify(v))
  v.type = 'shortPlayVideo'
  v.shortPlayList = [
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cndfl1rc77u108sbhai0&line=0&file_id=00af8e6cc6dd4a1ab60208dd6451429e&sign=6be7a4e6a07ee2b744bafd55e1bcfec5&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clks4grc77u3a1kg2fr0&line=0&file_id=743087959f754a93b9174461d04e694a&sign=049f2253919ebf022df3a3fe7f18ae05&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cm0npqbc77ubh43jhrl0&line=0&file_id=dbe6a7e462054f4189550838b69b5398&sign=0001d71c9c87675c123585c8bffbe79f&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cjib86jc77u8gjoga27g&line=0&file_id=23f4b1b06bf44a24baf80e180eb94610&sign=1341e4ff741109ea65caa78a373bd2b0&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ckj9l4rc77ufr9psh3lg&line=0&file_id=9bc0f0cdde2a40aeb547b147cddb3231&sign=b6e8b0d17ca0af35efe2d05927a2c952&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cmb8purc77u1h5sssfsg&line=0&file_id=4ae9d23f215d41628569067c704849c3&sign=ed12e0b6abaa76b88f654e19f377f1da&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fc70000bqalo8l81shrtg3tsjs0&line=0&file_id=be1269860f474351a6bb5fdaac0750a8&sign=11d5f8ef1cf6b3f28708500b3937d3e2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cn2rl83c77u3dicca1d0&line=0&file_id=0ad9f7e1992d4708bb03f4a003cfe896&sign=c2f139681a0a84cbaf2080054f27f63e&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmv1barc77u7b6clifj0&line=0&file_id=4dcc138d7ce54565a339a7741da9f109&sign=21f9d5e8e74052bc2ca962b3be379839&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmdqofrc77ucllosb640&line=0&file_id=8f03c479e6b84fac95a7728f88f05351&sign=b2af64c67791dcd16dabe9a6cf34400c&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cl9obm3c77u58o4gdje0&line=0&file_id=c73af0d92d0d4d9595c29b0fd1a291e3&sign=4e7bcd103d30662d6de1ab3e48cddb71&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c3ap7ej2k89lnnt9lku0&line=0&file_id=e8a2c6615a7b4cd1b8795ac7c10ecfa0&sign=5fd7ff62b4ea0b9916e0ed32e9682bf2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnfv6hjc77u46jigm880&line=0&file_id=39e8731c3fc648b3a660d5df4671e4f9&sign=7628e17c5b9efc7e4fe3ab4ed77563a3&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cncru9rc77u0fsgvss3g&line=0&file_id=bec61c2ee0b54c71b0e5ccd3ab90c040&sign=50a437a5ce2d63d68317ccc1c360c500&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cli7j4jc77u9eie28ck0&line=0&file_id=3476f03210d4492c8c048ebf31fabf2d&sign=96747a7a621dd843cfa860b63864fac2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clumajjc77ubc1k9jit0&line=0&file_id=935e5a3666d148759c6a3a1512670c22&sign=ba0656c35f9a8fef0e5ca4578149857d&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cho8g9bc77u0pnpec1g0&line=0&file_id=647541ad377e4c888407bb0c22042ea8&sign=fab225cd1b4353106d4efd2bec1c5a61&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ckhvanjc77udvafmmp90&line=0&file_id=fc552b49ef064c55a61cb3210c41b770&sign=a36d6fd84c96aabb839e0a8154ac8ff2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm6ngibc77ue8cjemfe0&line=0&file_id=6d944cfe97fe4ad7953d0381750edccb&sign=9c14a387d07af8a5de8459c1372fcece&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200f4a0000bq7u4t7ibktj69454jj0&line=0&file_id=45360ecbd9d2481b851bf23057e240eb&sign=6835ae4267ae70d0a89ca77b36374721&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cn0de93c77u82kgpruh0&line=0&file_id=16bb820990124bd1929f4070d7066ebb&sign=91a95c89160d033fed30aa92c2cd237b&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmuc993c77u58ctid1pg&line=0&file_id=9a53734a26b24af2a45455cbe0c1e740&sign=1485f27d192b24769ee5c128bebc1f41&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmbu893c77ufsb2qpts0&line=0&file_id=9276144e7d444e64b5f0cc4885d226fb&sign=21b9f01e834e792898979013762f76b7&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ckkkpobc77u8iftanf9g&line=0&file_id=d64210beaba14374ae8806f2e6eef8dd&sign=57f32a1430eba95b6d4b7e246498a595&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c39fv480tom17pqr343g&line=0&file_id=4239c12b5d96438b80ce948ab7f517fc&sign=633b91d861199a096742285891793300&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnfj1o3c77u7rppcr97g&line=0&file_id=631b1292a1604e28947894badceba931&sign=430636561228f96b7a23fcd6f23651bf&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnbkm2rc77u4scft33ng&line=0&file_id=fb62ba7883a347809aac6c942d945eb0&sign=ac67a6ba40f4233ba1b9b7c533ed0606&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clem2lbc77uebsl3ekc0&line=0&file_id=ebbaf268698e4a85bdf32efc3f1d715d&sign=267861c79c7370c46732c65aae698bfc&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clrcqhrc77u5nql6oli0&line=0&file_id=d0179920010e44b2a7b427d0cc6da1bd&sign=c2fe01b13e7d761f8efbaab9bb918a44&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://sf6-cdn-tos.douyinstatic.com/obj/tos-cn-ve-2774/311ff0e475d343f9ad7db28beb1b7829',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ck6nepjc77u8lvg0r7hg&line=0&file_id=e7f70fc7f37641dea1b6a93cfe0ffec0&sign=0fd5f70209209b24476f6334db6a2bc6&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm00j03c77u58orpnv7g&line=0&file_id=c1ce59a335e4442c9d748b279251dbe1&sign=ce2061bb7a6afaa298141d2e5a288cc2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ceso053c77u4fneot5c0&line=0&file_id=fdcc41e8fd8e4e82b22fed7984b0eeb8&sign=0509164eb9ad3e40387d0ab7c84dfa7e&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cmvjhrjc77u2j0uvnec0&line=0&file_id=f7a25af7878747719b70da6d534e257d&sign=efeba08db49a1996693a5359f4f21447&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmt234rc77u7vp38khf0&line=0&file_id=88d016eb42dd48b7a93e53202f0055f0&sign=72a9cf285cde10ac115744d30777f8f0&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmajr6bc77u4fe907bs0&line=0&file_id=181a9ff21e124975941ee4616f21fa39&sign=d49833e64774a60edab938fd7b2dc2ea&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ckhbjnrc77u48o4ihp4g&line=0&file_id=efb8135195494e10902788baaef13b4e&sign=273227cfe3d3389fa65e3ada0dfeb0f5&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c385e6o8nbrnjeot5c80&line=0&file_id=9d47b4995895480d98d003608d4ba2f4&sign=6b8d341c3d66364a7c6ac7dd6d2fbea2&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnerb3jc77u7vcq9r10g&line=0&file_id=f08bd7b32f854731a086885d3be248b9&sign=f76fb15d9a5889e0797d6d33678616f7&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cn0e74jc77ueq999hsv0&line=0&file_id=59504add3fda44caadb57400f3191b2c&sign=b02530662d46644d12ca312f67eb9f9a&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clcalvrc77u8n1qc92cg&line=0&file_id=bfe678a027704df58ffe1d0e3dc701b1&sign=a8ff255711ffeba2f914bf550de4d6f4&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clkkvtbc77uco31ab800&line=0&file_id=ba367daf85764c7d872acb716a6a6f18&sign=e4b17ef91957307627e5a5f9d1fc8cea&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000chnij4bc77u0qmr5eaig&line=0&file_id=da407c81172f467e968bb1bdff59f50a&sign=62276444b7ee1c5451b0ab90d9a10e32&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ck2tau3c77u2837psssg&line=0&file_id=86e14d8ca49247e49bddb86468e77244&sign=6a5e7bd6e35751ac9c01974eb2c702c0&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clralcjc77u7p7a3jdfg&line=0&file_id=279ec29bf89945d583d05ec13f89c086&sign=89a46d5f4c0e631e1b1b8c15af3cfb9c&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ceetjjrc77udfn151vng&line=0&file_id=c23adeb91b2542beb7b79357e28a6b69&sign=fb9ea43947731cdcf6140199c279fe80&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmuusi3c77u2td4dji8g&line=0&file_id=2d3cf23035c24a2881540271aa7b2fd7&sign=e9b2bc07afb2fbbdf141127158397fa0&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmscvq3c77ua327e6lp0&line=0&file_id=d5d40dad863047ca91368a61c1383295&sign=d3e3195c8c4ebc714b24b16d3e3bbc37&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm7vicrc77ubtani1oqg&line=0&file_id=1c75731706eb4ee8ac2435b4f6c9fbf7&sign=b5dc354d7f3c66df793e2d64350edbfa&is_play_url=1&source=PackSourceEnum_PUBLISH',
    'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ck6qmerc77uchnjv3rkg&line=0&file_id=82640765cf0242bc86a32c06253b3b45&sign=a6f83aa9b8801e0894fa343c5453d851&is_play_url=1&source=PackSourceEnum_PUBLISH'
  ]
  v.shortPlayNum = Math.floor(Math.random() * (50 - 5 + 1)) + 5
  return v
})

// eslint-disable-next-line
const t = [
  {
    type: 'imgs',
    src: `https://imgapi.cn/bing.php`,
    author: {
      unique_id: 1,
      avatar_168x168: {
        url_list: []
      },
      avatar_300x300: {
        url_list: []
      },
      cover_url: [
        {
          url_list: []
        }
      ],
      white_cover_url: [
        {
          url_list: []
        }
      ]
    }
  }
  // {
  //   type: 'user',
  //   src: `https://imgapi.cn/bing.php`,
  //   author: {
  //     unique_id: 2,
  //     avatar_168x168: {
  //       url_list: []
  //     },
  //     avatar_300x300: {
  //       url_list: []
  //     },
  //     cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ],
  //     white_cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ]
  //   }
  // },
  // {
  //   type: 'img',
  //   src: `https://imgapi.cn/bing.php`,
  //   author: {
  //     unique_id: 3,
  //     avatar_168x168: {
  //       url_list: []
  //     },
  //     avatar_300x300: {
  //       url_list: []
  //     },
  //     cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ],
  //     white_cover_url: [
  //       {
  //         url_list: []
  //       }
  //     ]
  //   }
  // }
]

async function fetchData() {
  const baseStore = useBaseStore()
  console.log('BASE_URL', BASE_URL)
  // _fetch(BASE_URL + '/data/videos.md').then((r) => {
  const num = Math.floor(Math.random() * 7)
  console.log('num', num)
  const url = `/json/${num}.md`
  _fetch(url).then((r) => {
    r.json().then(async (v) => {
      let userList = cloneDeep(baseStore.users)
      if (!userList.length) {
        await baseStore.init()
        userList = cloneDeep(baseStore.users)
      }
      v = v.map((w) => {
        w.type = 'recommend-video'
        const item: any = userList.find((a) => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
        return w
      })
      allRecommendVideos = allRecommendVideos.concat(v)
    })
  })
}

async function fetchShortPlayData() {
  const baseStore = useBaseStore()
  _fetch(BASE_URL + '/data/videos.md').then((r) => {
    r.json().then(async (v) => {
      let userList = cloneDeep(baseStore.users)
      if (!userList.length) {
        await baseStore.init()
        userList = cloneDeep(baseStore.users)
      }
      v = v.map((w) => {
        w.type = 'shortPlayVideo'
        w.shortPlayList = [
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cndfl1rc77u108sbhai0&line=0&file_id=00af8e6cc6dd4a1ab60208dd6451429e&sign=6be7a4e6a07ee2b744bafd55e1bcfec5&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clks4grc77u3a1kg2fr0&line=0&file_id=743087959f754a93b9174461d04e694a&sign=049f2253919ebf022df3a3fe7f18ae05&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cm0npqbc77ubh43jhrl0&line=0&file_id=dbe6a7e462054f4189550838b69b5398&sign=0001d71c9c87675c123585c8bffbe79f&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cjib86jc77u8gjoga27g&line=0&file_id=23f4b1b06bf44a24baf80e180eb94610&sign=1341e4ff741109ea65caa78a373bd2b0&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ckj9l4rc77ufr9psh3lg&line=0&file_id=9bc0f0cdde2a40aeb547b147cddb3231&sign=b6e8b0d17ca0af35efe2d05927a2c952&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cmb8purc77u1h5sssfsg&line=0&file_id=4ae9d23f215d41628569067c704849c3&sign=ed12e0b6abaa76b88f654e19f377f1da&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fc70000bqalo8l81shrtg3tsjs0&line=0&file_id=be1269860f474351a6bb5fdaac0750a8&sign=11d5f8ef1cf6b3f28708500b3937d3e2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cn2rl83c77u3dicca1d0&line=0&file_id=0ad9f7e1992d4708bb03f4a003cfe896&sign=c2f139681a0a84cbaf2080054f27f63e&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmv1barc77u7b6clifj0&line=0&file_id=4dcc138d7ce54565a339a7741da9f109&sign=21f9d5e8e74052bc2ca962b3be379839&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmdqofrc77ucllosb640&line=0&file_id=8f03c479e6b84fac95a7728f88f05351&sign=b2af64c67791dcd16dabe9a6cf34400c&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cl9obm3c77u58o4gdje0&line=0&file_id=c73af0d92d0d4d9595c29b0fd1a291e3&sign=4e7bcd103d30662d6de1ab3e48cddb71&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c3ap7ej2k89lnnt9lku0&line=0&file_id=e8a2c6615a7b4cd1b8795ac7c10ecfa0&sign=5fd7ff62b4ea0b9916e0ed32e9682bf2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnfv6hjc77u46jigm880&line=0&file_id=39e8731c3fc648b3a660d5df4671e4f9&sign=7628e17c5b9efc7e4fe3ab4ed77563a3&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cncru9rc77u0fsgvss3g&line=0&file_id=bec61c2ee0b54c71b0e5ccd3ab90c040&sign=50a437a5ce2d63d68317ccc1c360c500&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cli7j4jc77u9eie28ck0&line=0&file_id=3476f03210d4492c8c048ebf31fabf2d&sign=96747a7a621dd843cfa860b63864fac2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clumajjc77ubc1k9jit0&line=0&file_id=935e5a3666d148759c6a3a1512670c22&sign=ba0656c35f9a8fef0e5ca4578149857d&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cho8g9bc77u0pnpec1g0&line=0&file_id=647541ad377e4c888407bb0c22042ea8&sign=fab225cd1b4353106d4efd2bec1c5a61&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ckhvanjc77udvafmmp90&line=0&file_id=fc552b49ef064c55a61cb3210c41b770&sign=a36d6fd84c96aabb839e0a8154ac8ff2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm6ngibc77ue8cjemfe0&line=0&file_id=6d944cfe97fe4ad7953d0381750edccb&sign=9c14a387d07af8a5de8459c1372fcece&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200f4a0000bq7u4t7ibktj69454jj0&line=0&file_id=45360ecbd9d2481b851bf23057e240eb&sign=6835ae4267ae70d0a89ca77b36374721&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cn0de93c77u82kgpruh0&line=0&file_id=16bb820990124bd1929f4070d7066ebb&sign=91a95c89160d033fed30aa92c2cd237b&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmuc993c77u58ctid1pg&line=0&file_id=9a53734a26b24af2a45455cbe0c1e740&sign=1485f27d192b24769ee5c128bebc1f41&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmbu893c77ufsb2qpts0&line=0&file_id=9276144e7d444e64b5f0cc4885d226fb&sign=21b9f01e834e792898979013762f76b7&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ckkkpobc77u8iftanf9g&line=0&file_id=d64210beaba14374ae8806f2e6eef8dd&sign=57f32a1430eba95b6d4b7e246498a595&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c39fv480tom17pqr343g&line=0&file_id=4239c12b5d96438b80ce948ab7f517fc&sign=633b91d861199a096742285891793300&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnfj1o3c77u7rppcr97g&line=0&file_id=631b1292a1604e28947894badceba931&sign=430636561228f96b7a23fcd6f23651bf&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnbkm2rc77u4scft33ng&line=0&file_id=fb62ba7883a347809aac6c942d945eb0&sign=ac67a6ba40f4233ba1b9b7c533ed0606&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clem2lbc77uebsl3ekc0&line=0&file_id=ebbaf268698e4a85bdf32efc3f1d715d&sign=267861c79c7370c46732c65aae698bfc&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clrcqhrc77u5nql6oli0&line=0&file_id=d0179920010e44b2a7b427d0cc6da1bd&sign=c2fe01b13e7d761f8efbaab9bb918a44&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://sf6-cdn-tos.douyinstatic.com/obj/tos-cn-ve-2774/311ff0e475d343f9ad7db28beb1b7829',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ck6nepjc77u8lvg0r7hg&line=0&file_id=e7f70fc7f37641dea1b6a93cfe0ffec0&sign=0fd5f70209209b24476f6334db6a2bc6&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm00j03c77u58orpnv7g&line=0&file_id=c1ce59a335e4442c9d748b279251dbe1&sign=ce2061bb7a6afaa298141d2e5a288cc2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ceso053c77u4fneot5c0&line=0&file_id=fdcc41e8fd8e4e82b22fed7984b0eeb8&sign=0509164eb9ad3e40387d0ab7c84dfa7e&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cmvjhrjc77u2j0uvnec0&line=0&file_id=f7a25af7878747719b70da6d534e257d&sign=efeba08db49a1996693a5359f4f21447&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmt234rc77u7vp38khf0&line=0&file_id=88d016eb42dd48b7a93e53202f0055f0&sign=72a9cf285cde10ac115744d30777f8f0&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cmajr6bc77u4fe907bs0&line=0&file_id=181a9ff21e124975941ee4616f21fa39&sign=d49833e64774a60edab938fd7b2dc2ea&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ckhbjnrc77u48o4ihp4g&line=0&file_id=efb8135195494e10902788baaef13b4e&sign=273227cfe3d3389fa65e3ada0dfeb0f5&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000c385e6o8nbrnjeot5c80&line=0&file_id=9d47b4995895480d98d003608d4ba2f4&sign=6b8d341c3d66364a7c6ac7dd6d2fbea2&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cnerb3jc77u7vcq9r10g&line=0&file_id=f08bd7b32f854731a086885d3be248b9&sign=f76fb15d9a5889e0797d6d33678616f7&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cn0e74jc77ueq999hsv0&line=0&file_id=59504add3fda44caadb57400f3191b2c&sign=b02530662d46644d12ca312f67eb9f9a&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clcalvrc77u8n1qc92cg&line=0&file_id=bfe678a027704df58ffe1d0e3dc701b1&sign=a8ff255711ffeba2f914bf550de4d6f4&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clkkvtbc77uco31ab800&line=0&file_id=ba367daf85764c7d872acb716a6a6f18&sign=e4b17ef91957307627e5a5f9d1fc8cea&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000chnij4bc77u0qmr5eaig&line=0&file_id=da407c81172f467e968bb1bdff59f50a&sign=62276444b7ee1c5451b0ab90d9a10e32&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ck2tau3c77u2837psssg&line=0&file_id=86e14d8ca49247e49bddb86468e77244&sign=6a5e7bd6e35751ac9c01974eb2c702c0&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000clralcjc77u7p7a3jdfg&line=0&file_id=279ec29bf89945d583d05ec13f89c086&sign=89a46d5f4c0e631e1b1b8c15af3cfb9c&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000ceetjjrc77udfn151vng&line=0&file_id=c23adeb91b2542beb7b79357e28a6b69&sign=fb9ea43947731cdcf6140199c279fe80&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmuusi3c77u2td4dji8g&line=0&file_id=2d3cf23035c24a2881540271aa7b2fd7&sign=e9b2bc07afb2fbbdf141127158397fa0&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0300fg10000cmscvq3c77ua327e6lp0&line=0&file_id=d5d40dad863047ca91368a61c1383295&sign=d3e3195c8c4ebc714b24b16d3e3bbc37&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cm7vicrc77ubtani1oqg&line=0&file_id=1c75731706eb4ee8ac2435b4f6c9fbf7&sign=b5dc354d7f3c66df793e2d64350edbfa&is_play_url=1&source=PackSourceEnum_PUBLISH',
          'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000ck6qmerc77uchnjv3rkg&line=0&file_id=82640765cf0242bc86a32c06253b3b45&sign=a6f83aa9b8801e0894fa343c5453d851&is_play_url=1&source=PackSourceEnum_PUBLISH'
        ]
        w.shortPlayNum = Math.floor(Math.random() * (50 - 5 + 1)) + 5
        const item: any = userList.find((a) => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
        return w
      })

      allShorPlayVideos = allShorPlayVideos.concat(v)
    })
  })
}

//TODO 有个bug，一开始只返回了6条数据，但第二次前端传过来的pageNo是2了，就是会从第10条数据开始返回，导致中间漏了4条
export async function startMock() {
  mock.onGet(/video\/recommended/).reply(async (config) => {
    const { start, pageSize } = config.params
    // console.log('allRecommendVideos', cloneDeep(allRecommendVideos.length), config.params)
    return [
      200,
      {
        data: {
          total: 844,
          list: allRecommendVideos.slice(start, start + pageSize) // list: allRecommendVideos.slice(0, 6),
        },
        code: 200,
        msg: ''
      }
    ]
  })
  mock.onGet(/video\/long\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 844,
          list: allRecommendVideos.slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/short\/play/).reply(async (config) => {
    const page = getPage2(config.params)
    console.log(111)
    console.log('-----------------startMock', config.params, page, allShorPlayVideos)

    return [
      200,
      {
        data: {
          total: 844,
          list: allShorPlayVideos.slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })
  mock.onGet(/video\/comments/).reply(async (config) => {
    const videoIds = [
      '7260749400622894336',
      '7128686458763889956',
      '7293100687989148943',
      '6923214072347512068',
      '7005490661592026405',
      '7161000281575148800',
      '7267478481213181238',
      '6686589698707590411',
      '7321200290739326262',
      '7194815099381484860',
      '6826943630775831812',
      '7110263965858549003',
      '7295697246132227343',
      '7270431418822446370',
      '6882368275695586568',
      '7000587983069957383'
    ]
    let id = config.params.id
    if (!videoIds.includes(String(id))) {
      id = videoIds[random(0, videoIds.length - 1)]
    }
    const r2 = await _fetch(`${FILE_URL}/comments/video_id_${id}.md`)
    const v = await r2.json()
    if (v) {
      return [200, { data: v, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/video\/private/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 10,
          list: allRecommendVideos.slice(100, 110).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/like/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 150,
          list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/my/).reply(async (config) => {
    const page = getPage2(config.params)
    if (!userVideos.length) {
      // let r = await fetch(BASE_URL + '/data/user-71158770.json')
      // let r = await fetch(BASE_URL + '/data/user-8357999.json')
      const r = await _fetch(BASE_URL + '/data/user_video_list/user-12345xiaolaohu.md')
      const list = await r.json()
      const baseStore = useBaseStore()
      const userList = cloneDeep(baseStore.users)

      userVideos = list.map((w) => {
        if (userList.length) {
          const item = userList.find((a) => String(a.uid) === String(w.author_user_id))
          if (item) w.author = item
        }
        return w
      })
    }

    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: userVideos.length,
          list: userVideos.slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/video\/history/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          total: 150,
          list: allRecommendVideos.slice(200, 350).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/user\/collect/).reply(async () => {
    return [
      200,
      {
        data: {
          video: {
            total: 50,
            list: allRecommendVideos.slice(350, 400)
          },
          music: {
            total: resource.music.length,
            list: resource.music
          }
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/user\/video_list/).reply(async (config) => {
    const id = config.params.id
    const r2 = await _fetch(`${FILE_URL}/user_video_list/user-${id}.md`)
    const v = await r2.json()
    if (v) {
      return [200, { data: v, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/user\/panel/).reply(async () => {
    const r2 = await _fetch(BASE_URL + '/data/users.md')
    const v = await r2.json()
    // let item = v.find(a => a.uid === '68310389333')
    // let item = v.find(a => a.uid === '59054327754')
    const item = v.find((a) => a.uid === '2739632844317827')
    if (item) {
      return [200, { data: item, code: 200 }]
    }
    return [200, { code: 500 }]
  })

  mock.onGet(/user\/friends/).reply(async () => {
    const r2 = await _fetch(BASE_URL + '/data/users.md')
    const v = await r2.json()
    return [200, { data: v, code: 200 }]
  })

  mock.onGet(/historyOther/).reply(async (config) => {
    const page = getPage2(config.params)
    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: 0,
          list: []
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/post\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)

    if (!allRecommendPosts.length) {
      const r = await _fetch(BASE_URL + '/data/posts.md')
      allRecommendPosts = await r.json()
    }
    return [
      200,
      {
        data: {
          pageNo: page.pageNo,
          total: allRecommendPosts.length,
          list: allRecommendPosts.slice(0, 1000).slice(page.offset, page.limit)
        },
        code: 200,
        msg: ''
      }
    ]
  })

  mock.onGet(/shop\/recommended/).reply(async (config) => {
    const page = getPage2(config.params)

    const r2 = await _fetch(BASE_URL + '/data/goods.md')
    const v = await r2.json()
    return [
      200,
      {
        data: {
          total: v.length,
          list: v.slice(page.offset, page.limit)
        },
        code: 200
      }
    ]
  })

  setTimeout(fetchData, 1000)
  // setTimeout(fetchShortPlayData, 1000)
}
