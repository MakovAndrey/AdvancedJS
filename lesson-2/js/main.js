'use strict';

const pathToImage = 'images';
const pathToProdImage = `${pathToImage}/products`;

class ProductList {
    constructor (container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._chooseProduct();
    }

    _chooseProduct(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000, image: '1.jpg'},
            {id: 2, title: 'Mouse', price: 20, image: '2.jpg'},
            {id: 3, title: 'Keyboard', price: 200, image: '3.jpg'},
            {id: 4, title: 'Gamepad', price: 50, image: '4.jpg'},
        ];
    }

    render () {
        const place = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            place.insertAdjacentHTML('beforeend', productObj.renderMarkup())
        }
    }

    getPrice() {
        let sum = 0;
        for (let product of this.goods) {
            sum += product.price;
        }
        console.log (sum);
    }
}

class ProductItem {
    constructor (product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.image = `${pathToProdImage}/${product.image}`;
    }

    renderMarkup () {
        return `
            <div class="product-item" data-id = ${this.id}>
                <img class="product-img" src="${this.image}" alt="${this.title}>
                <div class="product-description">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
                </div>
            </div>
        `
    }
}

let prodList = new ProductList();
prodList.render();
prodList.getPrice();

// class ShopCart {

//     addProductToShopCart () {
        
//     }

//     removeProductFromShopCart () {

//     }

//     changeNumbOfProducts() {
        
//     }

//     changeSumForProducts() {
        
//     }

//     calculateTotalShopCartSum() {
        
//     }

//     MarkupProductsInShopCart (){

//     }
// }