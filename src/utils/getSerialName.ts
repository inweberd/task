const serialNameMap = {
  '0': '体验股权',
  '1': '正式股权',
  '2': '正式股权',
  '3': '正式股权',
  '4': '正式股权',
  '5': '正式股权',
  '6': '正式股权',
  '7': '正式股权',
  '8': '正式股权',
  '9': '正式股权'
  // '9': '九级',
  // '10': '十级',
  // '11': '十一级',
  // '12': '十二级',
  // '13': '十三级',
  // '14': '十四级',
  // '15': '十五级',
  // '16': '十六级',
  // '17': '十七级',
  // '18': '十八级'
}
export const getSerialName = (val) => {
  if (!val) {
    return '暂无会员'
  } else if (val < 5) {
    return '铜卡'
  } else if (val < 10) {
    return '银卡'
  } else if (val < 30) {
    return '黄金卡'
  } else if (val < 50) {
    return '白金卡'
  } else if (val < 100) {
    return '钻石卡'
  } else if (val < 200) {
    return '黑卡'
  } else {
    return '至尊卡'
  }
  // return serialNameMap[val] || '--'
}
