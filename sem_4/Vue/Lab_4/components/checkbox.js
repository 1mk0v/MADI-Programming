

const CheckboxComponent = {
    props: ['selected'],
    emits:['changeCheckboxEvent'],
    data() {
        return {
            data: this.selected,
        }
    },
    template: `
    <div class="uk-flex uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <div v-for="(value,key) in this.data">
        <p>{{value}} {{key}}</p>
        <input
            class="uk-checkbox"
            type="checkbox"
            :id='key'
            v-model='this.data[key]'
            @change='changed'>
        <label :for='key'>{{key}}</label>
        </div>
    </div>`,
    computed: {
        changed() {
            console.log(this.selected)
            this.$emit('changeCheckboxEvent', this.selected);
        },
    },
}

export { CheckboxComponent }
