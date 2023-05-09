
const InputComponent = {
    props:['alreadyAdd'],
    emits:['changeInputEvent'],
    data() {
        return {
            data: this.alreadyAdd
        }
    },
    template: `
        <input type='text' v-model='data' @keypress='changed'>
        <div>{{data}}</div>`,
    methods:{
        getNewDataForm: function (data) {
            console.log('InputComponent')
            let newWord = ''
            for (let i in data) {
                newWord += data[i]
            }
            return newWord
        },
        
    },
    computed: {
        changed(){
            this.$emit('changeInputEvent', this.data)
        }
    }

        
    }    

export { InputComponent }
