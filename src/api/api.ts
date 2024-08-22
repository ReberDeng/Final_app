import Request from 'luch-request'
import {appBaseStore} from "@/store";

let baseUrlA = '';
baseUrlA = "http://backend.uk.php.vg/api";
// baseUrlA = "https://apifoxmock.com/m1/4914515-0-default/api";

export const baseUrlA_dev = "https://apifox.com/apidoc/shared-f6a0afc1-8f7c-4cc8-a7bf-90922de1f54f/api-199393516/api";
export const baseUrlA_test = "https://apifoxmock.com/m1/4914515-0-default/api";
export const baseUrlA_production = "http://backend.uk.php.vg/api";


export const dogs_detect: any = `/dogs/detect`; // 图片上传分类
export const articles: any = `/articles`; // 获取文章列表
export const articles_detail: any = (id: any) => {
    return `/articles/${id}`
}; // 获取文章详情
export const dogs_detail: any = (id: any) => {
    return `/dogs/${id}`
}; // 获取品种详情

const http: any = new Request();
http.setConfig((config: any) => {

    config.header = {
        reqLoading: true, // 请求加载状态
        reqLoadingType: 1, // 请求加载状态,0:自定义组件；1：原生加载
        errToast: true, // 报错提示是否显示
        baseURL: true, // 默认请求头
        c: 3  // 演示用
    }
    config.timeout = 30 * 60 * 1000;

    return config
});

http.interceptors.request.use((config: any) => {
    // 可使用async await 做异步操作
    const access_token = uni.getStorageSync('access_token');
    let reqLoading = config.header.reqLoading;
    let reqLoadingType = config.header.reqLoadingType;

    const glbAppBaseStore = appBaseStore();

    if (reqLoading) {
        if (`${reqLoadingType}` === '0') {
            glbAppBaseStore.changeNameValue('http_loading', true)
        }
        if (`${reqLoadingType}` === '1') {
            uni.showLoading({
                title: '',
                mask: true
            })
        }
    }
    config.header = {
        ...config.header,
        b: 2,  // 演示用
        a: 1 // 演示拦截器header加参
    }
    if (access_token) {
        config.header = {
            ...config.header,
            Authorization: `Bearer ${access_token}`,
        }
    }
    /* config 为默认全局配置*/
    let base_url = uni.getStorageSync('http_base_url') || baseUrlA;
    /* config 为默认全局配置*/
    config.baseURL = config.header.baseURL ? base_url : ''; /* 根域名 */

    // console.log(1, glbAppBaseStore.baseObj.http_loading, JSON.stringify(config))
    return config
}, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
})

http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
    console.log(`服务器返回`, response);

    let reqLoading = response.config.header.reqLoading;
    let errToast = response.config.header.errToast;

    const glbAppBaseStore = appBaseStore();

    if (reqLoading) {
        glbAppBaseStore.changeNameValue('http_loading', false)
        uni.hideLoading();
    }

    if (response.data.code === 403) {
        if (errToast) {
            uni.showToast({
                title: response.data.message || '请重新登录',
                icon: 'none'
            });
        }
        uni.removeStorageSync('access_token');
        uni.redirectTo({
            url: '/pages/loginPages/login'
        });
        return;
    }
    if (response.header.authorization) {
        uni.setStorageSync('access_token', response.header.authorization)
    }
    if (response.header.Authorization) {
        uni.setStorageSync('access_token', response.header.Authorization)
    }
    return response
}, (response: any): any => { /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log(`服务器返回错误`, response)
    const glbAppBaseStore = appBaseStore();
    let reqLoading = response.config.header.reqLoading;
    let errToast = response.config.header.errToast;
    if (reqLoading) {
        glbAppBaseStore.changeNameValue('http_loading', false)
        uni.hideLoading();
    }
    if (errToast) {
        if (response.statusCode === 403) {
            uni.removeStorageSync('access_token');
            uni.redirectTo({
                url: '/pages/loginPages/login'
            });
            // // #ifdef H5
            // window.open('/', '_self')
            // // #endif
            // // #ifndef H5
            //  uni.reLaunch({
            //     url: '/pages/loginPages/login'
            // })
            // #endif
            return;
        }
        try {
            uni.showToast({
                title: response.data.message || '服务器错误',
                icon: 'none'
            });
        } catch (e) {
            uni.showToast({
                title: response.errMsg || '服务器错误',
                icon: 'none'
            });
        }
    }
    return Promise.reject(response)
})

export {http, baseUrlA};
