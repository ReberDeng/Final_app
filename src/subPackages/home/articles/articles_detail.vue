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
                <uni-title :title="articles_detail.title" color="#FFFFFF" type="h2"></uni-title>
            </view>
            <view>

                <MpHtml :content="articles_detail.body">
                    <!--                    {{ articles_detail.body }}-->

                </MpHtml>
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
    navigationBarTitleText: 'Article',
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
                url: httpluch.articles_detail(articles_id.value),
                method: 'GET',
                data: {},
            }
    );
    articles_detail.value = res.data || {};
    articles_detail.value.body = (res.data.body || [''])[0];
//     articles_detail.value.body_a = `
// <p>        The Poodle, also called the Caniche in French or Pudel in German, is a breed of water dog categorized into four groups by size: Toy, Miniature, Medium, and Standard. Though famous for their show-ring success and aristocratic appearance, Poodles are more than just breed champions. Beneath their well-groomed exteriors and dignified demeanor lies an affectionate family companion with a rich heritage.</p><br/><p>        Originally developed for hunting waterfowl, Poodles are regarded as one of the most intelligent breeds in the world. They’re highly trainable, athletic, and well suited for just about any task you put them to — and you will want to give them tasks to do. Bored Poodles can get destructive if they aren’t physically and mentally stimulated. Beyond their intelligence, the Poodle temperament is lively, faithful, comic, athletic, and friendly. Active owners who can meet their dog’s needs will find a loving, smart, trainable, and loyal family companion.</p><br/><p>\t\tWhen considering a Poodle, it’s advisable to prioritize adopting from rescue organizations or shelters to provide a loving home to a dog in need. However, if you decide to purchase a Poodle puppy, choosing a reputable breeder is crucial. Conduct thorough research to ensure that the breeder follows ethical practices and prioritizes the well-being of their dogs. Reputable Poodle breeders prioritize the health and temperament of their dogs, conduct necessary health screenings, and provide a nurturing environment for the puppies. This active approach ensures that you bring home a healthy and happy pup while discouraging unethical breeding practices.</p>
// <br/><br/><p>\t\tThe Alaskan Malamute, bold, friendly, and hardworking, originates from the rugged landscapes of Alaska. With strength, endurance, and unwavering loyalty, these large fluffy dogs were an asset to indigenous people in the north. Belonging to the Mahlemuts of Alaska, Malamutes hold a significant place in the history of the Arctic. They thrived in cold climates, thanks to their thick coat. The double coat also provides insulation against freezing temperatures and comes in various colors. This includes shades of gray, black, white, and copper. It probably goes without saying, but these pups shed a lot.</p><br/><p>\t\tMalamutes are large, robust dogs designed for endurance. Initially bred to pull heavy sleds over extended distances, this breed assisted in hauling supplies and transportation tasks. This strong work ethic remains intrinsic, making regular exercise and mental stimulation vital to their well-being. Neglecting these needs can lead to a mischievous Malamute, so engaging activities and frequent outdoor adventures are imperative.</p><br/><p>\t\tWhen considering an Alaskan Malamute, it’s advisable to prioritize adopting from rescue organizations or shelters to provide a loving home to a dog in need. However, if you decide to purchase an Alaskan Malamute puppy, choosing a reputable breeder is crucial. Conduct thorough research to ensure that the breeder follows ethical practices and prioritizes the well-being of their dogs. Reputable Alaskan Malamute breeders prioritize the health and temperament of their dogs, conduct necessary health screenings, and provide a nurturing environment for the puppies. This active approach ensures you bring home a healthy and happy pup while discouraging unethical breeding practices.</p><p></p>
//
//
// `
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
