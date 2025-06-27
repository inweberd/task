import { showFailToast, showToast } from 'vant'

export function copyToClipboard(text, successMsg?) {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // 将文本框添加到HTML页面中
  document.body.appendChild(textArea)

  // 选中文本框中的内容
  textArea.select()

  try {
    // 尝试执行复制命令
    const successful = document.execCommand('copy')
    const msg = successful ? '复制成功!' : '复制失败!'
    console.log(msg)
    showToast(successMsg || msg)
  } catch (err) {
    showFailToast('复制失败！')
    console.error('无法执行复制操作', err)
  }

  // 最后移除文本框
  document.body.removeChild(textArea)
}
