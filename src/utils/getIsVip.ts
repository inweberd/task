export const getIsVip = () => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  const serial = userInfo?.result?.staff?.serial

  return serial !== 0 && serial !== 10
}
