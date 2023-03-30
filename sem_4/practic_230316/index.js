import { componentA } from "./components.js";

const App = {
    data() {
        return {
            count: 0,
        }
    },
    template: `<h4>{{count}}</h4>
    <double-count @countPlus='countMultiplyTwo' :multiplication='count'></double-count>`,
    methods: {
        countMultiplyTwo(newCount) {
            this.count = newCount;
        }
    },
    components: {
        'double-count': componentA
    }
}

const app = Vue.createApp(App);

app.mount('#my-first-components');