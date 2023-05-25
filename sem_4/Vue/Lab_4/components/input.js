
const InputComponent = {
    props:{selected:Object},
    emits:['changeInputEvent'],
    data() {
        return {
            inputSelected: Object.assign({},this.selected),
            newData: '',
            symbols: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        }
    },
    template: `
        <input 
            class="uk-input"
            type='text'
            v-model='newData'
            @keyup='updateVaribles'>`,
    watch: {
        selected: {
            handler() {
                console.log(this.selected)
                let string = ''
                for (let key in this.selected) {
                    if (this.selected[key] == true) {
                        string += key
                    }
                }
                this.newData = string
            },
            deep: true
        }
    },

    methods: {
        updateVaribles: function(event) {
            for (let key in this.inputSelected) {
                if (this.newData.indexOf(key) > -1) {
                    this.inputSelected[key] = true;
                } else {
                    this.inputSelected[key] = false;
                }
            }
            this.$emit('changeInputEvent', this.inputSelected);
        },
        getValue: function() {
            let string = ''
            for (let key of this.inputSelected) {
                if (this.selected[key] == true) {
                    string += key
                }
            }
            return string
        }
    },
}

export { InputComponent }
