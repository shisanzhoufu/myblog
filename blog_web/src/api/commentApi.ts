import {Success, Warning } from "./message";
import { axiosGet } from "./axiosApi";

/**
 * 获取留言列表
 * @param that 
 */
export const getCommentList = ((callback?:any)=>{
    axiosGet("/api/commentList", {}, (res: any) => {
        callback && callback(res);
      });
})

/**
 * 发布留言
 * @param data 提交的数据
 */
 export const pubComment = (data:any,callback?:any)=>{
    axiosGet("/api/comment", data, (res: any) => {
        if(res.statusCode===200){
            callback && callback(res);
        }
      });
}

/**
 * 提交评论
 * @param data 
 * @param callback 
 */

export const pubReply = async (data:any,callback?:any) => {
    axiosGet("/api/replyComment", data, (res:any) => {
        callback && callback(res);
      });
  }