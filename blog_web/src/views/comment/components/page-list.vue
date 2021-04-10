<template>
    <div class="page-list">
        <div class="container">
            <div class="card">
                <div class="card_header">
                    <el-avatar class="avater" :size="70" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <div class="header_info">
                        <div class="name">小王</div>
                        <div class="time">2021-10-09</div>
                    </div>
                </div>
                <div class="card_info">
                    评论内容
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "src/base.scss";
@import "../../common.scss";
.page-list{
@include common;
.card{
    width:100%;
    margin-top: 30px;
    .card_header{
        display: flex;
        .header_info{
            margin:20px;
            .name{
                cursor: pointer;
                font-size: 23px;
                line-height: 20px;
                font-weight: 500;
                color: $c-info;
                &:hover{
                    color: $c-brand;
                }
            }
            .time{
                color: $c-medium;
                margin-top: 10px;
            }
        }
        .card_info{
            width: 100%;
            margin-left: 90px;
            font-size: 23px;
            line-height: 20px;
            font-weight: 500;
        }
    }
}
}
</style>