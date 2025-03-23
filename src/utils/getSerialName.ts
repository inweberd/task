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
    return '暂无特权'
  } else if (val ===1) {
    return '学徒特权'
  } else if (val===2) {
    return '文员特权'
  } else if (val===3) {
    return '组长特权'
  } else if (val===4) {
    return '经理特权'
  } else if (val ===5) {
    return '总裁特权'
  }
  // return serialNameMap[val] || '--'
}
