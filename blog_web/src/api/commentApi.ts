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
 * 获取不同类型文章列表
 * @param data 
 * @param callback 
 */
export const getBlogList = async (data,callback?:any) => {
    axiosGet('/api/getBlogList',data,(res:any)=>{
        callback && callback(res);
    })
  }
  /**
   * 获取全部文章
   * @param data 
   * @param callback 
   */
  export const getBlog = async (callback?:any) => {
    axiosGet('/api/getBlog',{},(res:any)=>{
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

  /**
   * 更新点赞信息
   * @param data 
   * @param callback 
   */
  export const setLikeStatus = async (data:any,callback?:any) => {
    axiosGet('/api/setLikeStatus',data,(res:any)=>{
        callback && callback(res);
    })
  }
  /**
   * 获取点赞状态
   * @param data 
   * @param callback 
   */
  export const getLikeStatus = async (data:any,callback?:any) => {
    axiosGet('/api/getLikeStatus',data,(res:any)=>{
        callback && callback(res);
    })
  }
  /**
   * 浏览量
   * @param data 
   */
  export const setLookStatus = async (data:any) => {
    axiosGet('/api/setLookStatus',data,(res:any)=>{
        console.log(res)
    })
  }
/**
 * 更新文章
 * @param data 
 */
  export const updateBlog = async (data:any,callback?:any) => {
    axiosPost('/api/updateBlog',data,(res:any)=>{
        callback && callback(res);
    })
  }
/**
 * 获取用户信息
 * @param callback 
 */
  export const getUserList = async (callback?:any) => {
    axiosGet('/api/getUserList',{},(res:any)=>{
        callback && callback(res);
    })
  }
  /**
   * 删除留言
   * @param callback 
   */
  export const delComment = async (data:any,callback?:any) => {
    axiosGet('/api/delComment',data,(res:any)=>{
        callback && callback(res);
    })
  }