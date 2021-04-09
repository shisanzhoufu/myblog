
/**粘贴图片 */
export const handlePaste = ((event:any)=>{
    const items = event.clipboardData && event.clipboardData.items
    let file
    if (items && items.length) {
      // 检索剪切板items，是个数组
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile() // file 是剪切板内的图片文件
          // TODO: 自行上传file即可
          return file
        }
    }
}   
})
