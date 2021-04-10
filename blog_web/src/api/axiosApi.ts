
  // import { Loading } from "element-ui";
  // import router from "@/router/index";
  import { throttle } from "lodash";
  import axios from "axios"
//   import { QUsers } from "@/graphql/smart-query";
  
  /** 登录 */
  // export const login = async (api,dataObj) => {
  //     try {
  //       axios.get()
  //     } catch (error) {
          
  //     }
    
  // }

  //axios请求
  export const axiosGet = async (api:any,dataObj:any,callback:any) => {
    await axios.get(api,{params:dataObj}).then(res=>{
      callback && callback(res.data);
    })
  }
  /**post请求 */
  export const axiosPost = async (api:any,dataObj:any,callback:any,header?:any) => {
    await axios.post(api,dataObj,header).then(res=>{
      callback && callback(res.data);
    })
  }

  /**
 * 上传图片
 */
 export const uploadPlans = ((that:any,file:any)=>{
  if (!file) {
    that.$message.error("请粘贴图片后上传")
    return
  }
  that.loading = true
  const form = new FormData()
  form.append("file", file)
  form.append("type", that.type)
  
})

/**
 * 用户信息查询
 */
 export const checkUserInfo = (()=>{
   
  // const userInfo:string|null = JSON.parse(localStorage.getItem('userInfo'))
  
})
  



  /** 登出 */
  // export const logout = async () => {
  //   const loading = Loading.service({ fullscreen: true });
  //   try {
      
  //   } finally {
  //   //   clearSession();
  //   //   router.push("/sign-in");
  //   //   loading.close();
  //   }
  // };
  
  // 三十分钟无操作则退出
//   export const autoLogout = () => {
//     const listener = throttle(() => {
//       clearTimeout(timer);
//       timer = setTimeout(innterLogout, timeLimit);
//     }, 5000);
  
//     const innterLogout = () => {
//       window.removeEventListener("mouseover", listener);
//       window.removeEventListener("keypress", listener);
//       clearTimeout(timer);
//       logout();
//     };
  
//     const timeLimit = 1000 * 60 * 30;
//     let timer = setTimeout(innterLogout, timeLimit);
//     window.addEventListener("mouseover", listener);
//     window.addEventListener("keypress", listener);
//   };
  