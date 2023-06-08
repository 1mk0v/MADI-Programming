

const CheckboxComponent = {
    props: {selected: Object},
    emits:['changeCheckboxEvent'],
    data() {
        return {
            data: Object.assign({}, this.selected),
        }
    },
    template: `
    <div class="uk-flex uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <div v-for="(value,key) in data">
            <input
                class="uk-checkbox"
                type="checkbox"
                :id='key'
                v-model='data[key]'
                @change='changed'>
            <label :for='key'>{{key}}</label>
        </div>
    </div>`,
    watch: {
        selected: {
            handler(){
                this.data = Object.assign({}, this.selected)
            },
            deep:true
        }
    },
    methods: {
        changed() {
            this.$emit('changeCheckboxEvent', this.data);
        },
    },
}

export { CheckboxComponent }
