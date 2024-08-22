import {ref} from "vue";
import {defineStore} from "pinia";

export const appBaseStore: any = defineStore('appBaseStore', () => {
    const baseObj: any = ref({
        page_meta: false,
        http_loading: false,
    });

    function changeNameValue(name: string = '', value: any = '') {
        baseObj.value[name] = value;
    }

    return {baseObj, changeNameValue};
});
