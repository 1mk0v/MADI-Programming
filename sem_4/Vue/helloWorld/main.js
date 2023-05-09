const FirstApp = {
    data() {
        return {
            message: "Hello, Vue!",
            count: 0
        }
    },
    methods: {
        plusOne() {
            this.count++
        }
    }
}

Vue.createApp(FirstApp).mount("#firstApp")
