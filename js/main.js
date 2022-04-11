'use strict';

const pathToImage = 'images';
const pathToProdImage = `${pathToImage}/products`;

const products = [
    {id: 1, title: 'Notebook', price: 2000, image: '1.jpg'},
    {id: 2, title: 'Mouse', price: 20, image: '2.jpg'},
    {id: 3, title: 'Keyboard', price: 200, image: '3.jpg'},
    {id: 4, title: 'Gamepad', price: 50, image: '4.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `
            <div class="product-item">
                <img class="product-img" src="${pathToProdImage}/${product.image}" alt="${product.title}>
                <div class="product-description">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
                </div>
            </div>
            `
};

/*после каждого товара выводилась запятая из-за того что строки 
товаров из массива передаются в функцию через запятую.
методом .join(' ') мы заменяем запятую на пробел.
*/
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join(' ');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);