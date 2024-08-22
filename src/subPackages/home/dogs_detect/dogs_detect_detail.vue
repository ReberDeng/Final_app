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
            <view class="uni-box">
                <uni-title :title="articles_detail.breed" color="#FFFFFF" type="h2"></uni-title>
            </view>
            <view>
                <MpHtml :content="articles_detail.detail">
                </MpHtml>
                <!--                <text-->
                <!--                        class="uni-text"-->
                <!--                >-->
                <!--                    {{ articles_detail.detail }}-->
                <!--                </text>-->
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
import {dogs_detail} from "@/api/api";

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
    navigationBarTitleText: 'Detail',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: '#000000',
    right_action: false,
})
let articles_id: any = ref<any>('')
let articles_detail: any = ref<any>({})
// 获取全局对象`
const global: any = inject('global')
/**
 * 以下是自定义事件
 */

// 获取文章列表
const getArticleDetail = async () => {
    let res = await httpluch.http.request(
            {
                url: httpluch.dogs_detail(articles_id.value),
                method: 'GET',
                data: {},
            }
    );
    articles_detail.value = res.data || {};
}
/**
 * 以下是系统方法
 */
onLoad((props: any) => {
    articles_id.value = props.id;
    getArticleDetail()
})
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background: black;
    color: white;
    padding: 40rpx 20rpx;

}
</style>
