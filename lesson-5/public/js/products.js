// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
    
        // this.$parent.getJson(`${API + this.catalogUrl}`)
        //     .then(data => {
        //         for (let item of data){
        //             this.$data.products.push(item);
        //             this.$data.filtered.push(item);
        //         }
        //     });
            
    },

    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    template: `
    <div class="products">
        <product v-for="item of filtered" 
        :key="item.id_product" 
        :img="item.image"
        :product="item"
        :desctription = "item.desctription"> 
        </product>
    </div>`
});
// @add="addProduct"
Vue.component('product', {
    props: ['product', 'img'],
    
    template: `
            <div class="product-item">
                <img :src="img" alt="Some img"> </img>
                <div class="desc">
                    <h3 class="product__item-header">{{product.product_name}}</h3>
                    <p class="product__item-par">{{product.description}}</p>
                    <p class="product__item-price">{{product.price}}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
})