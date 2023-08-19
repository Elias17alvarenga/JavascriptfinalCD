const products = [
  {
      id: 1,
      name: "Producto 1",
      description: "Descripción del producto 1.",
      price: 279866,
      image: "imagenes/HP.jpeg"
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2.",
    price: 352400,
    image: "imagenes/asus X515.jpg"
},
{
  id: 3,
  name: "Producto 3",
  description: "Descripción del producto 3.",
  price: 248999,
  image: "imagenes/ASUS X515EA.jpg"
},
{
  id: 4,
  name: "Producto 4",
  description: "Descripción del producto 4.",
  price: 322000,
  image: "imagenes/Lenovo ideapad3.jpg"
},
{
  id: 5,
  name: "Producto 5",
  description: "Descripción del producto 5.",
  price: 270000,
  image: "imagenes/Lenovo Thinkbook.jpg"
},
{
  id: 6,
  name: "Producto 6",
  description: "Descripción del producto 6.",
  price: 360000,
  image: "imagenes/Lenovo V15.jpg"
},
];

let cartItems = [];
let total = 0;

function renderProducts() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    for (const product of products) {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productCard.appendChild(productImage);

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productCard.appendChild(productName);

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
        productCard.appendChild(productDescription);

        const productPrice = document.createElement("p");
        productPrice.textContent = "$" + product.price;
        productCard.appendChild(productPrice);

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.addEventListener("click", () => addToCart(product));
        productCard.appendChild(addToCartButton);

        productContainer.appendChild(productCard);
    }
}

function addToCart(product) {
    let existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice += product.price;
    } else {
        cartItems.push({ ...product, quantity: 1, totalPrice: product.price });
    }

    total += product.price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      let listItem = document.createElement('li');
      listItem.textContent = item.name + ' - Cantidad: ' + item.quantity + ' - $' + item.totalPrice;
  
      let removeButton = document.createElement('button');
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', function() {
        removeFromCart(item); 
      });
  
      listItem.appendChild(removeButton);
      cartList.appendChild(listItem);
    }
  
    let totalElement = document.getElementById('total');
    totalElement.textContent = '$' + total;
  }
  function removeFromCart(item) {
    let index = cartItems.indexOf(item);
    if (index !== -1) {
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        cartItems[index].totalPrice -= cartItems[index].price;
      } else {
        cartItems.splice(index, 1);
      }
  
      total -= item.price;
      updateCart(); 
    }
  }
  


function checkout() {
    if (cartItems.length > 0) {
        alert('Gracias por su compra. Total: $' + total);
        cartItems = [];
        total = 0;
        updateCart();
    } else {
        const warning = document.getElementById("warning");
        warning.style.display = "block";
    }
}

window.addEventListener("load", () => {
    renderProducts();
});