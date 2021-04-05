// import { Message } from "element-ui";

export const Message = ((that:any,message:any,type:any)=>{
    that.$message({
        message: message,
        type: type
      });
})