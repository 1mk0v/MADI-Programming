

const App = {
    data() {
        return {
            count: 0,
        }
    },
    template: `
    <count-reader :count='count'></count-reader>
    <button @click="countPlus">
        Счётчик кликов
    </button>`,
    methods: {
        countPlus() {
            this.count++;
        }
    }
}


//emit
const app = Vue.createApp(App);

app.component('count-reader', {
    props: ['count'],
    template: `<h4>{{countMultiplyTwo}}</h4>`,
    computed: {
        countMultiplyTwo() {
            return this.count*2
        }
    }
});

app.mount('#my-first-components');