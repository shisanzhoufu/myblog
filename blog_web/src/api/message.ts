import {ElMessage}  from 'element-plus';
//成功
export const Success = ((message:any)=>{
  ElMessage.success({
              message: message,
              type: 'success'
      });
})
//普通
export const Message = (((message:any)=>{
  ElMessage(message);
}))


//警告
export const Warning = (((message:any)=>{
  ElMessage.warning({
              message: message,
              type: 'warning'
            });
}))
//错误
export const Error = (((message:any)=>{
  ElMessage.error(message);
}))
