
const InputComponent = {
    props:['selected'],
    emits:['changeInputEvent'],
    data() {
        return {
            inputSelected: this.selected,
            newData: '',
            symbols: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        }
    },
    template: `
        <input 
            class="uk-input"
            type='text'
            v-model='newData'
            @keydown='changed'>`,
    watch: {
        getValue: function() {
            let string = ''
            for (let key of this.selected) {
                if (this.selected[key] == true) {
                    string += key
                }
            }
            return string
        }
    },
    methods: {
        updateVaribles: function() {
            for (let key in this.inputSelected) {
                if (this.newData.indexOf(key) > -1) {
                    this.inputSelected[key] = true
                } else {
                    this.inputSelected[key] = false
                }
            }
        }
    },
    computed: {
        changed: function() {
            this.updateVaribles()
            this.$emit('changeInputEvent', this.inputSelected);
        },
       
    }
}

export { InputComponent }
