import {createSSRApp} from "vue";
import PuBody from "@/components/PuBody.vue"
import App from "./App.vue";
import * as Pinia from 'pinia';
import prototypeApp from "@/utils/prototypeApp";
import './global.scss'
import MpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'


export function createApp() {
    const app = createSSRApp(App);
    app.use(prototypeApp)
    app.use(Pinia.createPinia())
    app.component('PuBody', PuBody)
    app.component('MpHtml', MpHtml)
    app.config.errorHandler = (err, instance, info) => {
        // 处理错误，例如：报告给一个服务
        console.log('errorHandler', err, instance, info)
    }
    return {
        app,
        Pinia,
    };
}
