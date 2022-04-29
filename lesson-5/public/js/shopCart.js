Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },

    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }
        },

        remove(product){
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id_product === +product.id_product) {
                    this.$parent.deleteJson(`/api/cart/${this.cartItems[i].id_product}`, this.cartItems[i])
                        .then(data => {
                        if (data.result === 1) {
                            this.cartItems[i].quantity -= 1;
                            if (this.cartItems[i].quantity === 0) {
                                this.cartItems.splice(i, 1)
                            }
                        }
                    })
                }
            }
        }
    },

    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.cartItems.push(item);
                }
            });
    },

    template: `
    <div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">
            <img class="cartIcon" src="images/cart.png" alt="shoping cart image">
        </button>
            <div class="cart-block" v-show="showCart">
                <cart-item v-for="item of cartItems" 
                    :key="item.id_product" 
                    :cart-item="item" 
                    :img="item.cartImage"
                    @remove="remove">
                </cart-item>
            </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],

    template: `
        <div class="cart-item">
            <div class="product-bio">
                <div class="product-desc">
                    <img :src="img" alt="Some image">
                    <div class="product-title">{{ cartItem.product_name }}</div>
                    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                    <div class="product-single-price">$ {{ cartItem.price }} for each</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});
