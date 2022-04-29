Vue.component ('error-url', {
    data(){
        return {
        text: ''
        }
    },
    computed: {
        isVisible(){
            return this.text !== ''
        }
    },

    template: `
    <div class="error-block" v-if="isVisible">
        В данный момент сервер недоступен, пожалуйста повторите запрос позже.
    </div>
    `
})