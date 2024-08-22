const color_ui = (app: any) => {
    uni.getSystemInfo({
        async success(e) {
            if (e.statusBarHeight === undefined) {
                color_ui(app)
                return
            }
            let statusBarHeight:number = e.statusBarHeight ? e.statusBarHeight : 0;
            let titleBarHeight:number = e.titleBarHeight ? e.titleBarHeight : 0;
            let customBar:number = 0;
            let custom: any = {};

            // #ifndef MP
            if (e.platform === 'android') {
                customBar = statusBarHeight + 50;
            } else {
                customBar = statusBarHeight + 45;
            }
            // #endif

            // #ifdef MP-WEIXIN
            // @ts-ignore
            custom = wx.getMenuButtonBoundingClientRect();
            customBar = custom.bottom + custom.top - statusBarHeight;
            // #endif

            // #ifdef MP-ALIPAY
            customBar = statusBarHeight + titleBarHeight;
            // #endif

            app.config.globalProperties.$statusBarHeight =statusBarHeight;
            app.provide('global', {
                // 窗体高度
                windowHeight: e.windowHeight,
                // 窗体宽度
                windowWidth: e.windowWidth,
                // 状态栏高度
                statusBarHeight: statusBarHeight,
                // 小程序custom
                Custom: custom,
                // 导航栏最终高度
                CustomBar: customBar,
                // 文字栏
                titleBarHeight: titleBarHeight,
                // 胶囊偏移量
                custom_paddingRight: custom.left ? e.windowWidth- (custom.left || 0) + 10 : 10,
            })
            // console.log('color_ui', e)
        }
    })

};


export default {
    install: async (app: any) => {
        await color_ui(app);
    }
}