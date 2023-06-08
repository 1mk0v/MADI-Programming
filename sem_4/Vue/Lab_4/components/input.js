
const InputComponent = {
    props:{selected:Object, symbols:Array},
    emits:['changeInputEvent'],
    data() {
        return {
            inputSelected: Object.assign({},this.selected),
            newData: '',
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
                for (let key in this.selected) {
                    if (!this.newData.includes(key) && this.selected[key]) {
                        this.newData += key
                    } 
                }
            },
            deep: true
        },
    },

    methods: {
        updateVaribles: function() {
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
            if ((!this.symbols.includes(event.key) && !['Backspace', 'ArrowLeft','ArrowRight', 'Delete'].includes(event.key) ) || this.newData.indexOf(event.key) > -1) {
                event.preventDefault();
            }
        }
    },
}

export { InputComponent }
