
//成功
export const Success = ((that:any,message:any)=>{
  that.$message({
    message: message,
    type: 'success'
  });
})
//普通
export const Message = (((that:any,message:any)=>{
  that.$message(message);
}))


//警告
export const Warning = (((that:any,message:any)=>{
  that.$message({
    message: message,
    type: 'warning'
  });
}))
//错误
export const Error = (((that:any,message:any)=>{
  that.$message.error(message);
}))



