'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const pathToImage = '../images';
const pathToProdImage = `${pathToImage}/products`;

class ProductList {
    constructor (container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.getProduct ()
            .then (data => {
                this.goods = [...data];
                this.render();
            });
    }

    getProduct (){
        return fetch (`${API}/catalogData.json`)
            .then (data => data.json())
            .catch (error => {
                console.log (error)
            });
    }

    render () {
        const place = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            place.insertAdjacentHTML('beforeend', productObj.renderMarkup())
        }
    }

    getPrice () {
        let sum = 0;
        for (let product of this.allProducts) {
            sum += product.price;
        }
        console.log (sum);
    }
}

class ProductItem {
    constructor (product, image = 'https://placehold.it/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;;
        this.price = product.price;
        this.image = image;
    }

    renderMarkup () {
        return `
            <div class="product-item" data-id = ${this.id}>
                <img class="product-img" src="${this.image}" alt="${this.title}">
                <div class="product-description">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>
        `
    }
}

class ShopingCart {
    constructor(container = ".shoping-cart"){
        this.container = container;
        this.goods = [];
        this._clickBasket();
        this._addProductToShopCart()
            .then(data => { 
                this.goods = [...data.contents];
                this.render()
            });
    }

    render () {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ShopingCartItem();
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }

    _addProductToShopCart () {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _clickBasket() {
        document.querySelector(".shop-cart__btn").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('visible-hidden');
        });
    }
}

class ShopingCartItem {
    render (product) {
        return `
            <div class="cart-item" data-id="${product.id_product}">
                <div class="product-bio">
                <img src="${product.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${product.product_name}</p>
                <p class="product-quantity">Quantity: ${product.quantity}</p>
            <p class="product-single-price">$${product.price} for each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${product.quantity * product.price}</p>
                <button class="del-btn" data-id="${product.id_product}">&times;</button>
            </div>
            </div>
        `
    }
}

let prodList = new ProductList();
let shopCart = new ShopingCart();
