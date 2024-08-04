export const getTopPadding = () => {
  if (window.android) {
    return '40rem !important'
  } else {
    return '0rem !important'
  }
}
export const getIsInApp = () => {
  if (window.android) {
    return true
  } else {
    return false
  }
}
