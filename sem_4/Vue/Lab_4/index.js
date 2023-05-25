import { CheckboxComponent } from "./components/checkbox.js";
import { InputComponent } from "./components/input.js";
import { data, boolData } from "./data.js";

const App = {
    data() {
        return {
            objectKeys: data,
            textareaData: '',
            selected: boolData
        }
    },
    template: `
    <form>
        <input-component
            :selected='selected'
            @changeInputEvent='getNewSelected'>
        </input-component>
        <checkbox-component
            :selected='selected'
            @changeCheckboxEvent='getNewSelected'>
        </checkbox-component>
    </form>
    <textarea
        readonly
        :value='textareaData'
        class="uk-textarea">
    </textarea>`,
    methods: {
        getNewSelected(data) {
            console.log(data)
            Object.assign(this.selected,data);
            let text = '';
            for (let key in data) {
                if (this.selected[key] == true) {
                    let index = this.objectKeys.findIndex(el => el['id'] === key);
                    text += this.objectKeys[index]['text'] + ' '
                }
            }
            this.textareaData = text
        },
        setData: function () {
            for (let key of data) {
                if (this.selected[key] == true) {
                    console.log(key)
                }
            }
            return data
        },
    },
    components: {
        'checkbox-component': CheckboxComponent,
        'input-component': InputComponent
    }
}

const app = Vue.createApp(App);

app.mount('#forms-components');