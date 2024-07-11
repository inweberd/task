function getInitVideo() {
  const num = Math.floor(Math.random() * 287)
  console.log('num', num)
  const url = `/json/${num}.json`
  let data = []

  const xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      data = JSON.parse(xmlHttp.responseText)
    }
  }
  xmlHttp.open('get', url, false)
  xmlHttp.send()

  return data
}

export { getInitVideo }
