

const CheckboxComponent = {
    props: ['objects','alreadyAdd'],
    emits:['changeCheckboxEvent'],
    data() {
        return {
            data: this.alreadyAdd
        }
    },
    template: `
        <div v-for="word in objects">
            <input type="checkbox" :id='word.id' :value='word.id' v-model='data' @click='changed'>
            <label :for='word.id'>{{word.id}}</label>
        </div>
        <div>{{data}}</div>`,
    methods: {
    },
    computed: {
        changed() {
            this.$emit('changeCheckboxEvent', this.data)
        },
        
        // addNewSymbol(event) {
        //     console.log(event.key)
        //     for (let item in this.data) {
        //         let object = this.data[item]
        //         if (event.key == object.id && object.text in this.selected) {
        //             console.log(event.key)
        //             this.selected.push(object.text)
        //             return
        //         }
        //     }
        // }
    }
}

export { CheckboxComponent }
