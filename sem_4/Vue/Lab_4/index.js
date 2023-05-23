import { CheckboxComponent } from "./components/checkbox.js";
import { InputComponent } from "./components/input.js";
import { data } from "./data.js";

const App = {
    data() {
        return {
            objectKeys: data,
            selected: [{a: false},
                       {b: false},
                       {c: false},
                       {d: false},
                       {e: false},
                       {f: false},
                       {g: false}]
            
        }
    },
    template: `
    <form>
        <input-component 
            v-model:alreadyAdd='setData'
            @changeInputEvent='getNewSelected'></input-component>
        <checkbox-component
            :objects='objectKeys'
            v-model:alreadyAdd='selected'
            @changeCheckboxEvent='getNewSelected'></checkbox-component>
    </form>
    <textarea
        :value='setData'></textarea>`,
    methods: {
        getNewSelected(data) {
            console.log(data)
            this.selected = data;
        },
    },
    computed: {
        setData: function () {
            let data = ''
            for (let key in this.selected) {
                
                if (this.selected[key] == true) {
                    data += key.toString()
                }
            }
            return data
        }
    },
    components: {
        'checkbox-component': CheckboxComponent,
        'input-component': InputComponent
    }
}

const app = Vue.createApp(App);

app.mount('#forms-components');