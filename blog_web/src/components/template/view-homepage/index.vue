<template>
  <div class="view-homepage" @click="stop">
    <div class="view-homepage__header" :class="{ 'with-bg': withBg }">
      <div class="view-homepage__container">
        <div class="header">
          <div class="avater">
            <img
              src="http://127.0.0.1/blog/blog_admin/static/img/1618719343117.png"
              alt=""
            />
          </div>
          <div class="title">
            <div class="star">23号星球</div>
            <p>在六便士的世界里，掸掉月亮上的尘土</p>
          </div>
          <div class="row">
            <div class="nav">
              <div
                class="nav-list"
                :class="isHover === true ? 'hoverlink' : ''"
              >
                <div class="icon-worlds home">
                  <router-link to="/" class="card-list" title="首页"
                    ><i class="iconfont icon icon-zhuye"></i>
                    <p>首页</p>
                  </router-link>
                </div>
                <div
                  class="icon-worlds blog"
                  :class="isHover === true ? 'hoverlink' : ''"
                >
                  <router-link to="/article" class="pro-list" title="文章"
                    ><i
                      class="iconfont icon icon-wenzhang-copy"
                      title="文章"
                    ></i>
                    <p>文章</p>
                  </router-link>
                  <!-- <div
                    class="card-list"
                    :class="isShow === true ? 'has-card' : ''"
                    @click.stop="showCard"
                  >
                    <i class="iconfont icon icon-wenzhang-copy" title="文章"></i>
                    <div class="card-sub">
                      <router-link to="/interest" class="pro-list"
                        >兴趣</router-link
                      >
                      <router-link to="/technology" class="pro-list"
                        >技术</router-link
                      >
                      <router-link to="/life" class="pro-list"
                        >生活</router-link
                      >
                    </div>
                  </div> -->
                </div>
                <div class="icon-worlds comment">
                  <router-link to="/comment" class="card-list" title="留言"
                    ><i class="iconfont icon icon-icon-test"></i>
                    <p>留言</p>
                  </router-link>
                </div>
                <div class="icon-worlds about">
                  <router-link
                    to="/manage"
                    class="card-list"
                    v-if="flag"
                    title="管理"
                    ><i class="iconfont icon icon-xiaoren"></i>
                    <p>管理</p>
                  </router-link>
                </div>
                <div class="icon-worlds about">
                  <router-link
                    to="/addArticle"
                    class="card-list"
                    v-if="flag"
                    title="写文章"
                    ><i class="iconfont icon icon-xiezuo"></i>
                    <p>写文章</p></router-link
                  >
                </div>
              </div>
              <div class="search">
                <div class="search-input">
                  <input
                    type="text"
                    placeholder="输入关键词搜索"
                    class="search-input"
                    v-model="searchInfo"
                    @keyup.enter="search()"
                  />
                </div>
                <div class="search-icons">
                  <i class="iconfont search-icon icon-tubiao11"></i>
                  <i class="el-icon-close icon-close"></i>
                </div>
              </div>

              <div
                class="login"
                :class="isLogin === true ? 'has-login' : ''"
                @click.stop="showLogin"
              >
                <i class="iconfont login-icon icon-zhuce"></i>
                <div class="login-card">
                  <div class="login" v-if="login">
                    <router-link to="/sign-in" class="pro-list sign-in"
                      >登录</router-link
                    >
                    <router-link to="/sign-up" class="pro-list sign-up"
                      >注册</router-link
                    >
                  </div>
                  <div class="logout" v-if="logout">
                    <router-link to="/userInfo" class="pro-list sign-in"
                      >个人信息</router-link
                    >
                    <div @click.stop="logoutLocal" class="pro-list sign-up">
                      登出
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <slot @click="stop"></slot>
    </div>

    <!-- <div class="view-homepage__footer">
      <div class="view-homepage__container">
        <div class="copyright">
          <a href="mailto:1223945508@qq.com" target="_blank" title="小王的博客"
            >copy right</a
          >
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { getSearchList } from "../../../api/commentApi";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
@Component({
  components: {},
})
export default class extends Vue {
  withBg = false;
  private isShow = false;
  private isSub = false;
  private isHover = false;
  private isLogin = false;
  private searchInfo = "";
  private login = true;
  private logout = false;
  private flag = false;
  created() {
    window.addEventListener("scroll", () => {
      this.withBg = window.scrollY !== 0;
    });
    // this.showHover();
    const userInfo: any = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.logout = true;
      this.login = false;
    }
    if (userInfo.user_role == 500) {
      this.flag = true;
    }
  }

  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
        this.isLogin = false; //这句话的意思是点击其他区域关闭（也可以根据自己需求写触发事件）
      }
    });
  }
  // @Watch("$route")
  // private showHover() {
  //   // eslint-disable-next-line no-constant-condition
  //   if (this.$route.path === "/life") {
  //     this.isHover = true;
  //   } else if (this.$route.path === "/interest") {
  //     this.isHover = true;
  //   } else if (this.$route.path === "/technology") {
  //     this.isHover = true;
  //   } else {
  //     this.isHover = false;
  //   }
  // }
  private logoutLocal() {
    localStorage.clear();
    this.$router.push("/");
    this.logout = false;
    this.login = true;
  }
  private showCard() {
    this.isShow = !this.isShow;
  }
  private showLogin() {
    this.isLogin = !this.isLogin;
  }
  private stop() {
    this.isShow = false;
    this.isLogin = false;
  }

  @Mutation setSearchList: any;
  private search() {
    if (this.searchInfo) {
      const data = {
        searchInfo: this.searchInfo,
      };
      let blogList;
      getSearchList(data, (res: any) => {
        if (res.statusCode === 200) {
          blogList = res.commentList;
          // this.searchInfo = "";
        }
        //存入vuex
        this.setSearchList(blogList);
        if (blogList) {
          if (this.$route.path === "/search") {
            console.log("当前页面跳转");
            // this.$router.go(0);
          } else {
            console.log("跳转到新页面");
            this.$router.push({
              name: "search",
              params: { blogList: blogList },
            });
          }
        }
      });
    }

    this.searchInfo = "";
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
.view-homepage {
  .view-homepage__container {
    // width: 900px;
    // // width:100%;
    // margin-right: auto;
    // margin-left: auto;
    position: fixed;
    overflow-y: auto;
    top: 0;
    bottom: 0;
    left: 0;
    width: 25%;
    background-color: #fff;
    background-image: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn@master/img/bg/alpha-stars-timing-1.webp);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom 1rem center;
    text-align: center;
    z-index: 10;
    transition-property: all;
    transition-duration: 0.3s;
    transition-delay: 0s;
    box-shadow: 0 0 2px rgb(0 0 0 / 20%);
    .header {
      .router-link-exact-active {
        text-decoration: none;
      }
      margin-top: 100px;
      .avater {
        text-align: center;
        padding-top: 100px;
        img {
          cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
            auto;
          height: 96px;
          width: 96px;
          max-width: 100%;
          border-radius: 50%;
          margin: 0;
          padding: 4px;
          background-color: #fff;
          box-shadow: 0 0 10px rgb(0 0 0 / 20%);
          transition: 0.4s;
          &:hover {
            box-shadow: 0 0 30px rgb(0 120 231 / 20%);
          }
        }
      }
      .star {
        margin-top: 20px;
        font-size: 23px;
        font-weight: 500;
        line-height: 25px;
        &:hover {
          color: $c-main;
        }
      }
      p {
        text-align: center;
        font-size: 15px;
        color: $c-medium;
      }
    }
    .row {
      .nav {
        a {
          text-decoration: none;
        }

        .router-link-active {
          text-decoration: none;
        }
        text-decoration: none;

        .iconfont {
          font-family: "iconfont" !important;
          font-size: 28px;
          font-style: normal;
          color: $c-main;
          margin-left: 8px;
        }
        .icon-xiezuo {
          font-size: 30px;
          margin-top: 2px;
        }
        .nav-list {
          margin-top: 50px;
          display: flex;
          justify-content: center;
          .router-link-exact-active {
            text-decoration: none;
          }
        }
        .search {
          position: absolute;
          top: 10px;
          right: 70px;
          cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
            auto;
          width: 35px;
          height: 35px;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: $c-main;
          opacity: 0.7;
          transition: 0.6s;
          .icon-close {
            display: none;
          }
          &:focus,
          &:hover {
            width: 180px;
            transition: 0.6s;
            padding-right: 20px;
            .search-input {
              display: block;
            }
            .search-icon {
              display: none;
            }
            .icon-close {
              display: block;
            }
          }

          .search-input {
            display: none;
            border: 0px;
            outline: none;
            background: none;
            input {
              height: 35px;
              padding: 0 15px;
              width: calc(100%-40px);
              background-image: none;
              border: none;
              outline: none;
              color: $c-white;
              font-size: 15px;
              line-height: 18;
              width: 100%;

              &:focus {
                border: none;
                outline: none;
              }
            }
          }
          input::-webkit-input-placeholder {
            color: white;
          }
          .search-icon {
            font-size: 20px;
          }
          .search-icons {
            flex: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            font-size: 20px;

            i {
              margin: 0px;
              border-radius: 100%;
              // background: $c-pending;
              text-decoration: none;
              color: $c-white;
            }
          }
        }
        .login-card {
          width: 80px;
          height: 98px;
          background: #ffffff;
          box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
          border-radius: 8px;
          position: absolute;
          transition: transform 0.5s;
          top: 45px;
          right: -10px;
          display: flex;
          justify-content: center;
          z-index: 99 !important;
          .pro-list {
            margin: 2px;
            text-decoration: none;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            display: block;
            font-size: 16px;
            text-align: center;
            font-family: SourceHanSans-Normal, SourceHanSans;
            font-weight: 400;
            color: $c-main;

            line-height: 17px;
            &:first-child {
              padding-top: 16px;
              padding-bottom: 8px;
            }
            &:last-child {
              padding-top: 12px;
              padding-bottom: 16px;
            }
            &:hover {
              color: $c-brand;
            }
          }
        }
        .login {
          position: absolute;
          right: 20px;
          top: 10px;
          cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
            auto;
          .iconfont {
            font-size: 28px;
            margin: 0px 7px;
          }
        }
        .login-card {
          display: none;
        }
        .has-login {
          .login-card {
            display: block;
            transition: height 2s;
          }
        }
        .iconfont {
          font-size: 30px;
          margin: 0px 7px;
        }
        .icon-xiezuo {
          font-size: 30px;
          margin-top: 2px;
        }
      }
    }
  }
  .view-homepage__header.with-bg {
    background: #ffffff;
  }
  .view-homepage__header {
  }
  .view-homepage__footer {
    .view-homepage__container {
      font-size: 12px;
      position: fixed;
      top: auto;
      color: #777;
      bottom: 0;
      left: 0;
      width: 100%;
      display: block;
      text-decoration: none;
      .copyright {
        padding: 20px;
        text-align: center;
      }
    }
  }
  .aside {
  }
}
</style>
