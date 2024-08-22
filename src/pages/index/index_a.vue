<template>
    <PuBody>
        <view class="content">
            <button size="mini" type="primary">右下</button>
            <text class="iconfont icon-zhuye" style="color: #007aff"/>
        </view>
    </PuBody>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import {useCounterStore} from "@/store/modules/test";

/**
 * 以下是系统方法
 */
onLoad((props) => {
    console.log(11, props, title)
    title.value = `s${title.value}`;
    console.log(11, props, title)
})
watch(
        // pointer函数，监听的是什么
        () => obj_a.value.a,
        // change函数，监听值的变化
        (newV, oldV) => {
            console.log("当前值：", obj_a.value)
            console.log("变化前：", oldV)
            console.log("变化后：", newV)
        },
        {
            immediate: true, // 立即执行
            deep: true // 深度监听
        }
)

/**
 * ts定义类型
 */
interface ObjA {
    a: number,
    b: string
}

/**
 * 以下是全局变量
 */
const counter = useCounterStore();

/**
 * 以下是变量
 */
let title = ref<string>('Hello');
let obj_a = ref<ObjA>({a: 1, b: 'a'})

/**
 * 以下是自定义事件
 */
const t_c = (ev: any, sd: string) => {
    console.log(1111, ev, sd)
    obj_a.value.a++
    counter.count++;
    // 可以手动触发
    // counter.$patch({ count: counter.count + 1 });
    // 或者使用 actions
    // counter.increment();
    console.log(1113, counter.count)
};
</script>

<style lang="scss" scoped>
.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #333333;
}
</style>
