const serialNameMap = {
  '1': '一级合伙人',
  '2': '二级合伙人',
  '3': '三级合伙人',
  '4': '四级合伙人',
  '5': '五级合伙人',
  '6': '六级合伙人',
  '7': '七级合伙人',
  '8': '八级合伙人',
  '9': '九级合伙人'
}
export const getSerialName = (val) => {
  return serialNameMap[val] || '--'
}
