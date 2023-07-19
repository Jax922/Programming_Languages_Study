const app = Vue.createApp({
    data() {
        return { 
            helloMsg: 'Hello Vue!',
            bookTitle: 'The Lord of the Rings',
            bookAuthor: 'J.R.R. Tolkien',
            bookPrice: 9.99,
            showing: true,
        }
    },

    methods: {
        toggleShowBooks() {
            this.showing = !this.showing;
        }
    }
});

app.mount('#app');