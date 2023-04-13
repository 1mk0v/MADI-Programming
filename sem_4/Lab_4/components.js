

const SelectComponent = {
    // emits: ['countPlus'], //создает событие
    props: ['comData'], //передаваемое значение
    template: 
    `<div class='check-boxes'>
        <div v-for="word in comData">
            <label for='{{word.id}}'>{{word.id}}</label>
            <input type="checkbox" id='{{word.id}}'>
        </div>
    </div>`,
    methods: {
        
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
