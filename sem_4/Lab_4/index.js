import { CheckboxComponent } from "./components/checkbox.js";
import { InputComponent } from "./components/input.js";
import { data } from "./data.js";

const App = {
    data() {
        return {
            objectKeys: data,
            selected: [],
            textareaValue:""
        }
    },
    template: `
    <form>
        <input-component 
        :alreadyAdd='selected'
        @changeInputEvent='getNewSelected'></input-component>
        <checkbox-component
        :objects='objectKeys'
        :alreadyAdd='selected'
        @changeCheckboxEvent='getNewSelected'></checkbox-component>
    </form>
    <textarea :value='textareaValue'></textarea>`,
    methods: {
        getNewSelected(data) {
            console.log('waewq')
        },
    },
    components: {
        'checkbox-component': CheckboxComponent,
        'input-component': InputComponent
    }
}

const app = Vue.createApp(App);

app.mount('#forms-components');