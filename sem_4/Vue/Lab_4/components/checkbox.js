

const CheckboxComponent = {
    props: ['objects','alreadyAdd'],
    emits:['changeCheckboxEvent'],
    data() {
        return {
            data: this.alreadyAdd
        }
    },
    template: `
        <p>{{data}}</p>
        <div v-for="(word,index) in objects">
            <input type="checkbox"
                :id='word.id'
                v-model='data[index][word.id]'
                @click='changed'>
            <label :for='word.id'>{{word.text}}</label>
        </div>`,
    methods: {
        changed() {
            console.log(this.data)
            this.$emit('changeCheckboxEvent', this.data);
        },
    },
    computed: {
        

    }
}

export { CheckboxComponent }
