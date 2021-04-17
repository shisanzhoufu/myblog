import {Success, Warning } from "./message";
import { axiosGet,axiosPost } from "./axiosApi";

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

/**
 * 获取文章列表
 * @param data 
 * @param callback 
 */
export const getBlogList = async (data:any,callback?:any) => {
    axiosGet('/api/getBlogList',data,(res:any)=>{
        callback && callback(res);
    })
  }

/**
 * 获取搜索结果
 * @param data 
 * @param callback 
 */
export const getSearchList = async (data:any,callback?:any) => {
    axiosGet('/api/getSearchList',data,(res:any)=>{
        callback && callback(res);
    })
  }
  /**
   * 登录且保存信息
   * @param that 
   * @param data 
   * @param callback 
   */
  export const loginInfo = async (data:any,callback?:any) => {
    axiosPost("/api/sign-in", data, (res: any) => {
      callback && callback(res);
    });
  }
  
/**
 * 更新用户信息
 * @param data 
 * @param callback 
 */
  export const changeUserInfo = async (data:any,callback?:any) => {
    axiosGet('/api/changeUserInfo',data,(res:any)=>{
        callback && callback(res);
    })
  }