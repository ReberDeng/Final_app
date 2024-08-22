import {ref} from "vue";
import {defineStore} from "pinia";

export const usePageIndexStore: any = defineStore(
    'PageIndex',
    (): any => {
        const pageIndexObj: any = ref({
            up_img_res_data: [],
            up_img_old_img: '',
        });

        const changeNameValue: any = (name: any, value: any) => {
            pageIndexObj.value[name] = value
        }

        return {pageIndexObj, changeNameValue};
    }
);
