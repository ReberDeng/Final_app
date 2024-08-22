<template>
    <page-meta :page-style="'overflow:'+(glbAppBaseStore.baseObj.page_meta?'hidden':'visible')"></page-meta>
    <PuBody
            :nav_show="true"
            :top_nav_obj="top_nav_obj"
    >
        <view
                :style="{
                    'min-height': `calc(100vh - ${global.CustomBar}px)`
                }"
                class="content"
        >
            <view class="ddl_top">
                <image
                        :src="up_img_old_img"
                        mode="aspectFit"
                ></image>
            </view>

            <view class="ddl_title">
                <uni-title align="center" color="#FFFFFF" title="Analyze Result" type="h1"></uni-title>
            </view>
            <view class="ddl_results">
                <uni-title
                        :title="`${up_img_res_data.length} dogs deted`"
                        align="center"
                        color="#FFFFFF"
                        type="h4"
                ></uni-title>
            </view>

            <view class="ddl_c_ul">
                <view
                        v-for="(ea,ia) in up_img_res_data"
                        :key="`up_img_res_data_${ia}`"
                        class="ddl_c_ul_li"
                        @click="go_url(`/subPackages/home/dogs_detect/dogs_detect_detail?id=${ea.id}`)"
                >
                    <view class="ddl_c_ul_li_img">
                        <image
                                :src="ea.img"
                                mode="aspectFit"
                        ></image>
                    </view>
                    <view class="ddl_c_ul_li_text ">
                        <text class="ellipsis_3">
                            {{
                                ea.name
                            }}
                        </text>
                    </view>
                </view>
            </view>

            <view
                    class="ddl_btm_text"
                    @click="goHome"
            >
                <text>Go to home screen!</text>
            </view>

        </view>
    </PuBody>
</template>

<script lang="ts" setup>
import {ref, inject} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import type {NavSettingObj} from "@/tsType/index";
import {appBaseStore} from "@/store";
import * as httpluch from "@/api/api";
import {usePageIndexStore} from "@/store/modules/pageIndex";

/**
 * ts定义类型
 */
/**
 * 以下是全局变量
 */
const glbAppBaseStore = appBaseStore();
const {
    pageIndexObj: {
        up_img_res_data = [],
        up_img_old_img = '',
    }
} = usePageIndexStore();
/**
 * 以下是变量
 */
let top_nav_obj = ref<NavSettingObj>({
    navigationBarTitleText: 'Analyze Result',
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: '#FFFFFF',
    right_action: false,
})
// 获取全局对象`
const global: any = inject('global')
/**
 * 以下是自定义事件
 */
// 跳转路由
const go_url = (url: string) => {
    uni.navigateTo({
        url: url
    })
};
const goHome = () => {
    uni.reLaunch({
        url: '/pages/index/index'
    })
}
/**
 * 以下是系统方法
 */
onLoad((props: any) => {
    console.log(up_img_res_data, up_img_old_img)
})
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background: black;
    color: white;
    padding: 40rpx 32rpx;

    .ddl_top {
        width: 100%;
        height: 300rpx;
        background: #e4e4e4;
    }

    .ddl_title {
        margin-bottom: 40rpx;
    }

    .ddl_results {
        margin-bottom: 20rpx;
    }

    .ddl_c_ul {
        width: 100%;
        height: 410rpx;
        //background: #FFFFFF;
        overflow-x: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;

        .ddl_c_ul_li {
            width: 270rpx;
            min-width: 270rpx;
            height: 410rpx;
            //background: #007aff;
            margin-right: 20rpx;

            &:last-child {
                margin-right: 0;
            }

            .ddl_c_ul_li_img {
                width: 270rpx;
                height: 270rpx;
                overflow: hidden;
                border-radius: 20rpx;
                background: #e4e4e4;
                margin-bottom: 20rpx;
            }

            .ddl_c_ul_li_text {
                width: 100%;
                min-height: 40rpx;
                line-height: 40rpx;
                font-size: 28rpx;
                text-align: center;
                word-break: break-all;
                padding: 0 10rpx;
            }
        }
    }

    .ddl_btm_text {
        width: 100%;
        height: 200rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #0a7ea4;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>
