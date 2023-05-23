
const InputComponent = {
    props:['alreadyAdd'],
    emits:['changeInputEvent'],
    data() {
        return {
            data: this.alreadyAdd
        }
    },
    template: `
        <input
            type='text'
            v-model='data'
            @keydown='changed'>`,
    computed: {
        changed(){
            let ourData = this.data;
            this.$emit('changeInputEvent', ourData);
        }
    }        
}    

export { InputComponent }
