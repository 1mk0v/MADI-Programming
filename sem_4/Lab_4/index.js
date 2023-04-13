import { SelectComponent } from "./components.js";
import { data } from "./data.js";

const App = {
    data() {
        return {
            data: data 
        }
    },
    template: `
    <form>
        <input>
        <select-component :comData='data'></select-component>
    <form>
    <textarea></textarea>`,
    components: {
        'select-component': SelectComponent
    }
}

const app = Vue.createApp(App);

app.mount('#forms-components');