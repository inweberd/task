export const getTopPadding = () => {
  if (window.android) {
    return '40px !important'
  } else {
    return '0px !important'
  }
}
export const getIsInApp = () => {
  if (window.android && window.android.getVersionCode) {
    return true
  } else {
    return false
  }
}
