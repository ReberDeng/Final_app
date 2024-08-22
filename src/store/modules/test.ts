import {ref} from "vue";
import {defineStore} from "pinia";

export const useCounterStore: any = defineStore(
    'counter',
    (): any => {
        const count = ref(0);

        function increment() {
            count.value++;
        }

        return {count, increment};
    }
);
