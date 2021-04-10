import axios from "axios"
import {axiosPost,getBase64 } from "../../api/axiosApi"
import {Warning} from "../../api/message"
/**粘贴图片 */
export const handlePaste = ((event:any,insertImage:any)=>{
    const items = event.clipboardData && event.clipboardData.items
    let file
    if (items && items.length) {
      // 检索剪切板items，是个数组
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile() // file 是剪切板内的图片文件
          // TODO: 自行上传file即可
          if (!file) {
            Warning(this,"请粘贴图片后上传")
           return
         }
         const form = new FormData()
         form.append("file", file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            axiosPost('/api/upload',form,function(res: any){
                   insertImage({
                       url:reader.result,
                       desc: "kkkijj",
                     })
                
              },{headers: { "content-type": "multipart/form-data" }})
            console.log('file 转 base64结果：' + reader.result)
            // this.iconBase64 = reader.result
        }
        reader.onerror = function (error) {
            console.log('Error: ', error) 
        }
        //  const url = '/api/upload'
        // axios.post('/api/upload',form,{
        //     responseType: 'arraybuffer',
        //     }).then(res=>{
        //         console.log(res)
        //         return 'data:image/png;base64,' + btoa(

        //             new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    
        //             );
                    
        //             }).then(data => {
        //             console.log(data,'data')
                    
        //             })
        //        const url = '/api/upload'     
                    
        // axios({
        //     method: "post",
        //     url,
        //     params: form,
        //     responseType:"blob"
        //    }).then(response => {
        //     const res = window.URL.createObjectURL(response);
        //     console.log(res)
        //   });
         

         
        }
    }
}   
})
