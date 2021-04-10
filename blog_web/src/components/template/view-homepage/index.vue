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
                <div class="icon-worlds blog">
                  <div
                    class="card-list"
                    :class="isShow === true ? 'has-card' : ''"
                    @click.stop="showCard"
                  >
                    <i class="iconfont icon icon-wenzhang-copy"></i>文章
                    <div class="card-sub">
                      <router-link to="/cardList" class="pro-list"
                        >兴趣</router-link
                      >
                      <router-link to="/cardList" class="pro-list">技术</router-link>
                      <router-link to="/cardList" class="pro-list"
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
                <div class="icon-worlds about">
                  <router-link to="/about" class="card-list"
                    ><i class="iconfont icon icon-xiaoren"></i>关于</router-link
                  >
                </div>
                <div class="icon-worlds about">
                  <router-link to="/addArticle" class="card-list"
                    ><i class="iconfont icon icon-xiaoren"></i>发布文章</router-link
                  >
                </div>
              </div>
              <div
                class="search"
              >
                <div class="search-input">
                  <input
                    type="text"
                    placeholder="输入关键词搜索"
                    class="search-input"
                  />
                </div>
                <div class="search-icon">
                  <i class="iconfont search-icons icon-tubiao11"></i>
                </div>
              </div>

              <div
                class="login"
                :class="isLogin === true ? 'has-login' : ''"
                @click.stop="showLogin"
              >
                <i class="iconfont login-icon icon-zhuce"></i>
                <div class="login-card">
                  <router-link to="/sign-in" class="pro-list sign-in"
                    >登录</router-link>
                  <router-link to="/sign-up" class="pro-list sign-up"
                    >注册</router-link>
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
    <slot></slot>
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
@Component
export default class extends Vue {
  withBg = false;
  private isShow = false;
  private isSub = false;
  private isHover = false;
  private isLogin = false;
  $route: any;
  created() {
    window.addEventListener("scroll", () => {
      this.withBg = window.scrollY !== 0;
    });
    this.showHover();
  }
  @Watch("$route")
  private showHover() {
    // eslint-disable-next-line no-constant-condition
    if (this.$route.path === "/blog_life") {
      this.isHover = true;
    } else if (this.$route.path === "/blog_interest") {
      this.isHover = true;
    } else {
      this.isHover = false;
    }
  }
  private showCard() {
    this.isShow = !this.isShow;
  }
  private showLogin() {
    this.isLogin = !this.isLogin;
  }
  private showSub() {
    this.isSub = !this.isSub;
  }
  private stop() {
    if (this.isShow || this.isLogin) {
      this.isShow = false;
      this.isSub = false;
      this.isLogin = false;
    }
  }
  private See(e: any) {
    window.location.href = e;
  }
}
</script>
<style lang="scss">
@import "src/base.scss";
.view-homepage {
  .view-homepage__container {
    width: 1130px;
    // width:100%;
    margin-right: auto;
    margin-left: auto;
  }
  .view-homepage__header.with-bg {
    background: #ffffff;
  }
  .view-homepage__header {
    
    width:100%;
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
          .router-link-exact-active {
            text-decoration: none;
            &:before {
              content: "";
              display: block;
              position: absolute;
              width: 128px;
              height: 4px;
              top: 40px;
              left: 0px;
              z-index: 0;
              background: $c-main;
            }
          }
          .nav-list {
            width: 60%;
            height: 100%;
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            input {
              display: none;
            }
            .icon-worlds {
              width: 25%;
              display: flex;
              justify-content: center;
              z-index: 1;
              .card-list {
                z-index: -1;

                // z-index: 1;
                height: 100%;
                text-align: center;
                flex: 1;
                text-decoration: none;
                cursor: pointer;
                position: relative;
                font-size: 20px;
                font-family: SourceHanSans-Regular, SourceHanSans;
                color: $c-main;
                line-height: 24px;
                letter-spacing: 1px;
                font-weight: 400;
                // padding: 0px 30px;
                .iconfont {
                  margin-top: 30px;
                }
                .card-sub {
                  width: 150px;
                  height: 148px;
                  background: #ffffff;
                  box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
                  border-radius: 8px;
                  position: absolute;
                  top: 60px;
                  left: 0px;
                  .pro-list {
                    margin: 2px;
                    text-decoration: none;
                    cursor: pointer;
                    display: block;
                    padding: 13px 10px;
                    font-size: 20px;
                    font-family: SourceHanSans-Normal, SourceHanSans;
                    font-weight: 400;
                    color: $c-main;
                    line-height: 21px;
                    // &:first-child {
                    //   padding-top: 16px;
                    //   padding-bottom: 8px;
                    // }
                    // &:last-child {
                    //   padding-top: 12px;
                    //   padding-bottom: 16px;
                    // }
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
                      font-size: 14px;
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
            right:100px;
            cursor: pointer;
            width: 43px;
            height: 43px;
            border-radius: 100px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background: $c-main;
            opacity: 0.7;
            transition: 0.6s;
            &:hover{
              width: 240px;
              transition: 0.6s;
            .search-input {
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
                font-size: 18px;
                line-height: 20;
                width:100%;

                &:focus {
                  border: none;
                  outline: none;
                }
                &:-ms-input-placeholder {
                  //提示字样式
                  color: $c-white;
                }
              }
            }
            .search-icon {
              flex: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              margin-left: 20px;

              i {
                margin:0px;
                margin-top: 10px;
                margin-right: 2px;
                border-radius: 100%;
                // background: $c-pending;
                text-decoration: none;
                color: $c-white;
              }
            }
          }

          .login-card {
            width: 150px;
            height: 108px;
            background: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(0, 50, 53, 0.08);
            border-radius: 8px;
            position: absolute;
            top: 60px;
            right: -50px;
            .pro-list {
              margin: 2px;
              text-decoration: none;
              cursor: pointer;
              display: block;
              padding: 0 17px;
              font-size: 16px;
              font-family: SourceHanSans-Normal, SourceHanSans;
              font-weight: 400;
              color: $c-main;
              line-height: 21px;
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
            position:absolute;
            right:50px;
            cursor: pointer;
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
            font-size: 20px;
            margin: 0px 7px;
          }
        }
      }
    }
  }
  .view-homepage__footer {
    .view-homepage__container {
      font-size: 14px;
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
