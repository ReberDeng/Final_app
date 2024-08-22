<template>
    <page-meta :page-style="'overflow:'+(glbAppBaseStore.baseObj.page_meta?'hidden':'visible')"></page-meta>
    <PuBody
            :nav_show="true"
            :top_nav_obj="top_nav_obj"
    >
        <view class="content">
            <!--            顶部-->
            <view class="home_top_ul">
                <template v-if="articles_list.length">
                    <view
                            v-for="(ea,ia) in articles_list"
                            :key="`articles_list_${ia}`"
                            class="home_top_ul_li"
                            @click="go_url(`/subPackages/home/articles/articles_detail?id=${ea.id}`)"
                    >
                        <view class="home_top_ul_li_img">
                            <image
                                    :src="ea.image_url"
                                    mode="aspectFit"
                            ></image>
                        </view>
                        <view class="home_top_ul_li_title">
                            <text>{{ ea.title }}</text>
                        </view>
                    </view>
                </template>

                <uni-load-more
                        v-else
                        :content-text="{
                                contentdown: '查看更多',
                                contentrefresh: '加载中',
                                contentnomore: '------没有数据了------'
                            }"
                        status="noMore"
                />
            </view>

        </view>

    </PuBody>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import type {NavSettingObj} from "@/tsType/index";
import {appBaseStore} from "@/store";
import * as httpluch from "@/api/api";

/**
 * ts定义类型
 */
/**
 * 以下是全局变量
 */
const glbAppBaseStore = appBaseStore();
/**
 * 以下是变量
 */
let top_nav_obj = ref<NavSettingObj>({
    navigationBarTitleText: 'HOME',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: '#000000',
    right_action: false,
})
let articles_list: any = ref<any>([])
/**
 * 以下是自定义事件
 */
// 跳转路由
const go_url = (url: string) => {
    uni.navigateTo({
        url: url
    })
};

// 获取文章列表
const getArticleList = async () => {
    let res = await httpluch.http.request(
            {
                url: httpluch.articles,
                method: 'GET',
                data: {},
            }
    );
    articles_list.value = res.data || [];
}
/**
 * 以下是系统方法
 */
onLoad((props: any) => {
    getArticleList()
})
onPullDownRefresh(() => {
    articles_list.value = [];
    getArticleList()
    setTimeout(function () {
        uni.stopPullDownRefresh();
    }, 1000);
})

</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    min-height: 1rpx;
    position: relative;
    padding-top: 40rpx;
    padding-bottom: 40rpx;

    .home_top_ul {
        width: 100%;
        min-height: 1rpx;

        .home_top_ul_li {
            width: 100%;
            min-height: 1rpx;
            border-bottom: 2rpx solid #adadad;
            background: #FFFFFF;
            margin-bottom: 40rpx;

            .home_top_ul_li_img {
                width: 100%;
                height: 400rpx;
                background: #e4e4e4;
            }

            .home_top_ul_li_title {
                width: 100%;
                min-height: 1rpx;
                padding: 20rpx;
                font-size: 32rpx;
                line-height: 40rpx;
                font-weight: 600;
                color: #000000;
            }
        }
    }
}
</style>
