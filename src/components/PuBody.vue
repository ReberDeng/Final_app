<template>
    <view class="pb_body">
        <template
                v-if="nav_show"
        >
            <view
                    :style="{
                    height:`${global.CustomBar}px`,
                    background: top_nav_obj.navigationBarBackgroundColor
                }"
                    class="custom_nav"
            >
                <view :style="{height:`${global.statusBarHeight}px`}" class="custom_nav_sta"><!--状态栏占位--></view>
                <view class="custom_nav_con">
                    <view
                            :style="{
                            color: top_nav_obj.navigationBarTextStyle,
                        }"
                            class="custom_nav_con_left"
                    >
                        <text
                                v-if="pages.length > 1"
                                class="iconfont animal-fanhui custom_nav_con_left_text"
                                @click="go_back"
                        ></text>
                        <text
                                v-if="currentRouteWhite.every(ea => ea !== currentRoute) && pages.length===1"
                                :class="{'animal-zhuye': currentRouteWhite.every(ea => ea !== currentRoute)}"
                                class="iconfont custom_nav_con_left_text"
                                @click="go_home"
                        ></text>
                    </view>
                    <view
                            :style="{
                            marginRight: `${top_nav_obj.right_action?global.custom_paddingRight:0}px`
                        }"
                            class="custom_nav_con_title"
                    >
                        <text :style="{color: top_nav_obj.navigationBarTextStyle}">
                            {{ top_nav_obj.navigationBarTitleText }}
                        </text>
                    </view>
                    <view
                            v-if="top_nav_obj.right_action"
                            :style="{
                            right:`${global.custom_paddingRight}px`,
                            color: top_nav_obj.navigationBarTextStyle,
                        }"
                            class="custom_nav_con_right"
                    >
                        <text class="iconfont animal-yuan1 custom_nav_con_right_text"></text>
                        <text class="iconfont animal-ai-set custom_nav_con_right_text"></text>
                    </view>
                </view>
            </view>
            <view :style="{height:`${global.CustomBar}px`}" class="custom_nav_z"><!--导航栏占位--></view>
        </template>
        <template
                v-else
        >
            <view v-if="statusBar_show" :style="{height:`${global.statusBarHeight}px`}" class="custom_nav_sta">
                <!--状态栏占位--></view>
        </template>
        <slot></slot>
    </view>
</template>
<script lang="ts" setup>
import {inject, onDeactivated, onMounted, ref} from "vue";
import type {NavSettingObj} from "@/tsType/index";

/**
 * 以下是系统方法
 */
onMounted(() => {
    pages.value = getCurrentPages() // 获取栈实例
    currentRoute.value = pages.value[pages.value.length - 1].route; // 获取当前页面路由
})
onDeactivated(() => {
    console.log('onDeactivated', 2222)
})

/**
 * ts定义类型
 */
export interface PbPrapos {
    top_nav_obj?: any, // 顶部样式
    /**
     * 导航是否显示
     */
    nav_show?: boolean,
    /**
     * 导航是否显示
     */
    statusBar_show?: boolean,
}

/**
 * 以下是全局变量
 */
const props = withDefaults(defineProps<PbPrapos>(), {
    statusBar_show: true,
})
// 获取全局对象`
const global: any = inject('global')
// console.log(global)
/**
 * 以下是变量
 */
let pages = ref<any[]>([]);
let currentRoute = ref<string>('');
let currentRouteWhite = ref<any[]>([
    'pages/index/index',
    'pages/mine/mine',
    'pages/trading/trading',
    'pages/announce/announce',
    'pages/detect/detect',
]);
/**
 * 以下是自定义事件
 */
const go_back = () => {
    uni.navigateBack({
        delta: 1
    })
}
const go_home = () => {
    uni.reLaunch({
        url: '/pages/index/index'
    })
}

</script>
<style lang="scss" scoped>
.pb_body {
    min-height: 1rpx;
    height: auto;
}

.custom_nav_z {
    width: 100%;
}

.custom_nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    .custom_nav_sta {
        width: 100%;
    }

    .custom_nav_con {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding-left: 20rpx;

        .custom_nav_con_title {
            flex: 1;
            font-size: 34rpx;
            font-weight: 700;
            text-align: center;
        }

        .custom_nav_con_right {
            width: 90rpx;
            height: 40rpx;
            position: absolute;
            top: 50%;
            margin-top: -20rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .custom_nav_con_right_text {
                font-size: 40rpx;
            }
        }

        .custom_nav_con_left {
            width: fit-content;
            height: 40rpx;
            position: absolute;

            .custom_nav_con_left_text {
                font-size: 30rpx;
                line-height: 40rpx;
                height: 40rpx;
                margin-right: 20rpx;
            }
        }
    }
}
</style>
