const componentA = {
    emits: ['countPlus'],
    props: ['multiplication'],
    template: `
    <button @click='emitCountPlus'>Увеличить число</button>
    <button @click='anotherFunc'>Другое имя</button> `,
    computed: {
        countPlusFunc() {
            return this.multiplication + 1;
        }
    },
    methods: {
        emitCountPlus() {
            this.$emit("countPlus", this.countPlusFunc)
        },
        anotherFunc() {
            alert(this.countPlusFunc)
        }
    }

}

export {componentA}

// countMultiplyTwo() {
    // return this.multiplication*2
// }, 