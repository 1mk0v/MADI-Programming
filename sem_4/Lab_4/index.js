import { SelectComponent } from "./components.js";
import { data } from "./data.js";

const App = {
    data() {
        return {
            data: data,
            selected: ''
        }
    },
    template: `
    <form>
        <select-component :comData='data' @newSymbolEvent='addToTextarea'></select-component>
    </form>
    <textarea :value='selected'></textarea>`,
    methods: {
        addToTextarea(text) {
            this.selected=text
        }
    },
    components: {
        'select-component': SelectComponent
    }
}

const app = Vue.createApp(App);

app.mount('#forms-components');