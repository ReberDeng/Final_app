<template>
    <page-meta :page-style="'overflow:'+(glbAppBaseStore.baseObj.page_meta?'hidden':'visible')"></page-meta>
    <PuBody
            :nav_show="false"
            :statusBar_show="false"
    >
        <view
                :style="{
                    width:windows_size.width+'px',
                    height:windows_size.height+'px',
                }"
                class="content"
                @click="select_img()"
                @touchend="click_end"
                @touchstart="click_start"
        >
            <text
                    class="iconfont animal-gouxiao gou_a"
            ></text>

            <view class="btm_text">
                <text>
                    Flip Camera
                </text>
            </view>
        </view>
    </PuBody>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import {appBaseStore} from "@/store";
import * as httpluch from "@/api/api";
import {articles, baseUrlA, dogs_detect} from "@/api/api";
import {usePageIndexStore} from "@/store/modules/pageIndex";

/**
 * ts定义类型
 */
/**
 * 以下是全局变量
 */
const glbAppBaseStore = appBaseStore();
const PageIndexStore = usePageIndexStore();
/**
 * 以下是变量
 */
let windows_size: any = ref<any>({width: 0, height: 0})
let url_a: any = ref<any>('')
let touch_start_time: any = ref<any>(0)

/**
 * 以下是自定义事件
 */
// 跳转路由
const go_url = (url: string) => {
    uni.navigateTo({
        url
    })
};

// 选择图片
const select_img = async () => {
    // let res = await httpluch.http.request(
    //         {
    //             url: httpluch.articles,
    //             method: 'GET',
    //             data: {},
    //         }
    // );
    // console.log(1, res.data)
    uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
        success: async function (res) {

            let tempFilePaths = res.tempFilePaths;
            for (let i = 0, len_a = tempFilePaths.length; i < len_a; i++) {
                uni.showLoading({
                    title: '努力上传中',
                    mask: true,
                })
                try {
                    let the_url: any = tempFilePaths[i];
                    url_a.value = the_url;
                    let base_url = uni.getStorageSync('http_base_url') || httpluch.baseUrlA;
                    let res: any = await uni.uploadFile({
                        url: base_url + httpluch.dogs_detect, //仅为示例，非真实的接口地址
                        filePath: the_url,
                        name: 'image',
                        timeout: 30 * 60 * 1000
                    });

                    uni.hideLoading()
                    console.log(2, res)
                    if (`${res.statusCode}` === '200') {
                        let user_detail = JSON.parse(res.data) || [];
                        console.log(3, user_detail)
                        PageIndexStore.changeNameValue('up_img_res_data', user_detail)
                        PageIndexStore.changeNameValue('up_img_old_img', the_url)
                        go_url(`/subPackages/home/dogs_detect/dogs_detect_list`)
                    } else {
                        uni.showToast({
                            title: '上传失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                } catch (e) {
                    console.log(e)
                    uni.hideLoading()
                    uni.showToast({
                        title: '上传失败',
                        icon: 'none',
                        duration: 2000
                    })
                }

            }
        }
    });
}

const windowResizeCallback = (res) => {
    windows_size.value.width = res.size.windowWidth;
    windows_size.value.height = res.size.windowHeight;
}

// 点击开始
const click_start = (e) => {
    let touch_start_time_a = e.timeStamp;
    console.log(11, e)
    touch_start_time.value = touch_start_time_a;
}
// 点击结束
const click_end = (e) => {
    let touch_start_end = e.timeStamp;
    const touch_start_time_in = touch_start_time.value;
    let jg_time = touch_start_end - touch_start_time_in;
    console.log(22, e, jg_time);
    if (jg_time > 10000) {
        uni.showActionSheet({
            itemList: ['mock环境_Shaun', 'mock环境_dpc', '正式环境'],
            success: function (res) {
                console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                let api_obj = {
                    '0': httpluch.baseUrlA_dev,
                    '1': httpluch.baseUrlA_test,
                    '2': httpluch.baseUrlA_production,
                };
                uni.setStorageSync('http_base_url', api_obj[`${res.tapIndex}`]);
            },
            fail: function (res) {
                console.log(res.errMsg);
            }
        });
    }

}


/**
 * 以下是系统方法
 */
uni.onWindowResize(windowResizeCallback)

onLoad(() => {
    const windowInfo = uni.getWindowInfo();
    windows_size.value.width = windowInfo.windowWidth;
    windows_size.value.height = windowInfo.windowHeight;
})

</script>

<style lang="scss" scoped>
.content {
    min-height: 1rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
    background-color: #000000;
    width: 100%;

    .gou_a {
        font-size: 512rpx;
        color: #FFFFFF;
        margin-top: -300rpx;
    }

    .btm_text {
        font-size: 48rpx;
        color: #FFFFFF;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        width: 100%;
        font-weight: bold;
        line-height: 400rpx;
    }

    .gou_b {
        width: 100rpx;
        height: 100rpx;
    }
}
</style>
