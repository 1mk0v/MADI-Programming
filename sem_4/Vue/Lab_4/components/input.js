
const InputComponent = {
    props:{selected:Object, symbols:Array},
    emits:['changeInputEvent'],
    data() {
        return {
            inputSelected: Object.assign({},this.selected),
            newData: ''
        }
    },
    template: `
        <input 
            class="uk-input"
            type='text'
            v-model='newData'
            @keyup='updateVaribles'
            @keydown='blockVaribles'>`,
    watch: {
        selected: {
            handler() {
                let string = ''
                for (let key in this.selected) {
                    if (this.selected[key] == true) {
                        string += key
                    }
                }
                this.newData = string
            },
            deep: true
        },
    },

    methods: {
        updateVaribles: function() {
            console.log('update')
            for (let key in this.inputSelected) {
                if (this.newData.indexOf(key) > -1) {
                    this.inputSelected[key] = true;
                } else {
                    this.inputSelected[key] = false;
                }
            }
            this.$emit('changeInputEvent', this.inputSelected);            
        },
        blockVaribles: function(event) {
            console.log(event.key)
            if ((!this.symbols.includes(event.key) && event.key !='Backspace') || this.newData.indexOf(event.key) > -1) {
                event.preventDefault();
            }
        }
    },
}

export { InputComponent }
