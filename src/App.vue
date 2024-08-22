<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(async () => {
    console.log("App Launch");

});
onShow(async () => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});


</script>
<style lang="scss">
    @import url("utils/iconFont.scss");
	// #ifndef MP
    body,
	// #endif
	page{
        background: #F3F3F3;
    }
    .pg_padding{
        padding: 20rpx 30rpx;
        width: 100%;
        min-height: 1rpx;
    }
    .ypa_a_a{
        color: #606266;
        font-size: 28rpx;
    }
    :deep(.uni-easyinput__content-input){
        text-align: right;
    }
    .ypa_a_b{
        :deep(.uni-easyinput__content-textarea){
            background: #F9F9F9;
        }
    }
    .f_p_box{
        width: 100%;
        min-height: 1rpx;
        background: #ffffff;
        border-radius: 30rpx;
        padding: 20rpx 28rpx 30rpx 28rpx;
        .f_p_box_a{
            width: 100%;
            height: 30rpx;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .f_p_box_a_a{
                width: 4rpx;
                min-width: 4rpx;
                height: 28rpx;
                background: #80C99C;
                margin-right: 8rpx;
            }
            .f_p_box_a_b{
                flex: 1;
                height: 30rpx;
                line-height: 30rpx;
                font-size: 30rpx;
                font-weight: bold;
                color: #333333;
            }
            .f_p_box_a_c{
                width: auto;
                min-width: auto;
                height: 30rpx;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .f_p_box_a_c_a{
                    font-size: 24rpx;
                    font-weight: 500;
                    color: #656565;
                    line-height: 30rpx;
                }
                .f_p_box_a_c_b{
                    font-size: 24rpx;
                    line-height: 30rpx;
                    color: #656565;
                }
            }
        }
    }

</style>
