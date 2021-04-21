<template>
  <div class="view-homepage" @click="stop">
    <div class="view-homepage__header" :class="{ 'with-bg': withBg }">
      <div class="view-homepage__container">
        <div class="header">
          <div class="row">
            <div class="nav">
              <div
                class="nav-list"
                :class="isHover === true ? 'hoverlink' : ''"
              >
                <!-- <input type="radio" id="home" name="tab" checked>
              <input type="radio" id="blog" name="tab" >
              <input type="radio" id="comment" name="tab">
              <input type="radio" id="about" name="tab"> -->

                <div class="icon-worlds home">
                  <router-link to="/" class="card-list"
                    ><i class="iconfont icon icon-zhuye"></i>首页</router-link
                  >
                </div>
                <div
                  class="icon-worlds blog"
                  :class="isHover === true ? 'hoverlink' : ''"
                >
                  <div
                    class="card-list"
                    :class="isShow === true ? 'has-card' : ''"
                    @click.stop="showCard"
                  >
                    <i class="iconfont icon icon-wenzhang-copy"></i>文章
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
                  </div>
                </div>
                <div class="icon-worlds comment">
                  <router-link to="/comment" class="card-list"
                    ><i class="iconfont icon icon-icon-test"></i
                    >留言</router-link
                  >
                </div>
                <div class="icon-worlds about" >
                  <router-link to="/manage" class="card-list" v-if="flag"
                    ><i class="iconfont icon icon-xiaoren"></i>管理</router-link
                  >
                </div>
                <div class="icon-worlds about">
                  <router-link to="/addArticle" class="card-list"  v-if="flag"
                    ><i class="iconfont icon icon-xiezuo"></i
                    >写文章</router-link
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

              <div class="icon2">
                <!-- <img src="../../../assets/iconfont/down.png" alt=""> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot @click="stop"></slot>
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
    this.showHover();
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
  @Watch("$route")
  private showHover() {
    // eslint-disable-next-line no-constant-condition
    if (this.$route.path === "/life") {
      this.isHover = true;
    } else if (this.$route.path === "/interest") {
      this.isHover = true;
    } else if (this.$route.path === "/technology") {
      this.isHover = true;
    } else {
      this.isHover = false;
    }
  }
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
        console.log(blogList, "indexres");
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
    width: 900px;
    // width:100%;
    margin-right: auto;
    margin-left: auto;
  }
  .view-homepage__header.with-bg {
    background: #ffffff;
  }
  .view-homepage__header {
    width: 100%;
    // width: 1130px;
    position: fixed;
    top: 0;
    z-index: 1;
    transition: all 0.7s;
    background: #ffffff00;
    .header {
      // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid #eef3f3;
      .row {
        // padding: 0 68px;
        display: flex;
        align-items: center;
        height: 60px;
        position: relative;
        z-index: 1;
        .nav {
          height: 100%;
          width: 100%;
          // display: inline-block;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-decoration: none;
          margin-right: 99px;
          .hoverlink {
            &:before {
              content: "";
              display: block;
              position: absolute;
              width: 100px;
              height: 4px;
              top: 57px;
              left: 100px;
              z-index: 0;
              background: $c-main;
              transition: transform 0.3s;
            }
          }
          .nav-list {
            width: 60%;
            height: 100%;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
            position: relative;
            display: flex;
            align-items: center;
            // justify-content: center;
            justify-content: start;
            input {
              display: none;
            }
            .icon-worlds {
              .router-link-exact-active {
                text-decoration: none;
                &:before {
                  content: "";
                  display: block;
                  position: absolute;
                  width: 100px;
                  height: 4px;
                  top: 39px;
                  left: 0px;
                  z-index: 0;
                  background: $c-main;
                  transition: transform 0.3s;
                }
              }
              width: 25%;
              display: flex;
              justify-content: center;
              z-index: 1;
              .card-list {
                z-index: -1;
                // width:150px;
                // z-index: 1;
                height: 100%;
                text-align: center;
                flex: 1;
                text-decoration: none;
                cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
                  auto;
                position: relative;
                font-size: 16px;
                font-family: SourceHanSans-Regular, SourceHanSans;
                color: $c-main;
                line-height: 20px;
                letter-spacing: 1px;
                font-weight: 400;
                // padding: 0px 30px;
                .iconfont {
                  margin-top: 30px;
                }
                .card-sub {
                  width: 110px;
                  height: 148px;
                  background: #ffffff;
                  box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
                  border-radius: 8px;
                  position: absolute;
                  top: 45px;
                  left: 0px;
                  z-index: 99 !important;
                  .router-link-exact-active {
                    text-decoration: none;
                    &:before {
                      display: none;
                    }
                  }
                  .pro-list {
                    margin: 2px;
                    text-decoration: none;
                    cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
                      auto;
                    display: block;
                    padding: 13px 10px;
                    font-size: 16px;
                    font-family: SourceHanSans-Normal, SourceHanSans;
                    font-weight: 400;
                    color: $c-main;
                    line-height: 21px;
                    &:hover {
                      color: $c-brand;
                    }
                  }
                  .router-link-exact-active {
                    background: #fafafa;
                    border-radius: 8px;
                    padding-top: 0px !important;
                    padding: 14px !important;
                    span {
                      font-size: 12px;
                      font-family: SourceHanSans-Bold, SourceHanSans;
                      font-weight: bold;
                      color: $c-main;
                      line-height: 21px;
                    }
                  }
                }
              }
              .card-sub {
                display: none;
                transition: 0.6s;
              }
              .has-card {
                display: block;
                .card-sub {
                  display: block;
                  transition: 0.6s;
                }
              }
            }
          }
          .search {
            position: absolute;
            right: 100px;
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
                // &:-ms-input-placeholder {
                //   //提示字样式
                //   color: $c-white;
                // }
              }
            }
            input::-webkit-input-placeholder {
              color: white;
            }
            .search-icons {
              flex: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              // margin-left: 20px;

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
            width: 110px;
            height: 98px;
            background: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
            border-radius: 8px;
            position: absolute;
            transition: transform 0.5s;
            top: 45px;
            right: -50px;
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
            right: 50px;
            cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),
              auto;
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
            font-size: 16px;
            margin: 0px 7px;
          }
          .icon-xiezuo {
            font-size: 21px;
            margin-top: 2px;
          }
        }
      }
    }
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
}
</style>
