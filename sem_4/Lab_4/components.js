

const SelectComponent = {
    props: ['comData'],
    data() {
        return {
            data: '',
            objectValues: ''
        }
    },
    template: 
    `<div class='check-boxes'>
    <input type='text' v-model='data' @keypress='addNewSymbol'>
        <div v-for="word in comData">
            <label for='{{word.id}}'>{{word.id}}</label>
            <input type="checkbox" id='{{word.id}}'>
        </div>
    </div>`,
    computed: {
        addNewSymbol() {
            this.$emit('newSymbolEvent', this.data);
        }
    }
    
}

// const InputComponent = {
//     // emits: ['countPlus'], //создает событие
//     props: ['comData'], //передаваемое значение
//     template: 
//     `<div class='check-boxes'>
//         <div v-for="word in comData">
//             <label for='{{word.id}}'>{{word.id}}</label>
//             <input type="checkbox" id='{{word.id}}'>
//         </div>
//     </div>`,
//     methods: {
        
//     }
    
// }

export {SelectComponent}
