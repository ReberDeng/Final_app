<template>
    <page-meta :page-style="'overflow:'+(glbAppBaseStore.baseObj.page_meta?'hidden':'visible')"></page-meta>
    <PuBody
        :nav_show="true"
        :top_nav_obj="top_nav_obj"
    >
        <view class="content">

        </view>
    </PuBody>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import type {NavSettingObj} from "@/tsType/index";
import {appBaseStore} from "@/store";

/**
* 以下是系统方法
*/
onLoad((props) => {
})
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
    navigationBarTitleText: '发现',
    navigationBarBackgroundColor: '#F3F3F3',
    navigationBarTextStyle: '#000000',
    right_action: true,
})
/**
* 以下是自定义事件
*/
// 跳转路由
const go_url = (url:string) => {
    uni.navigateTo({
        url
    })
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    min-height: 1rpx;
    position: relative;
}
</style>
