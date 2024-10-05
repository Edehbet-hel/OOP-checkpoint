

// creating object class to properties for id,name and price
// Define the Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = 0;
    }

    addQuantity() {
        this.quantity += 1;
    }

    removeQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }
}

// Define the Cart class
class Cart {
    constructor() {
        this.products = [];
        this.total = document.getElementById('total');
    }

    addProduct(productId) {
        const product = this.findProductById(productId);
        if (product) {
            product.addQuantity();
            this.updateQuantityDisplay(productId, product.quantity);
            this.updateTotal();
        }
    }

    removeProduct(productId) {
        const product = this.findProductById(productId);
        if (product) {
            product.removeQuantity();
            this.updateQuantityDisplay(productId, product.quantity);
            this.updateTotal();
        }
    }

    findProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateQuantityDisplay(productId, quantity) {
        const qtyElement = document.getElementById(`qty${productId}`);
        if (qtyElement) {
            qtyElement.innerText = quantity;
        }
    }

    updateTotal() {
        const totalAmount = this.products.reduce((total, product) => total + product.getTotalPrice(), 0);
        this.total.innerText = `$${totalAmount.toFixed(2)}`;
    }

    initialize(productsList) {
        this.products = productsList;
        productsList.forEach(product => {
            this.updateQuantityDisplay(product.id, product.quantity);
        });
    }
}

// Create products
const product1 = new Product(1, "Product 1", 100);
const product2 = new Product(2, "Product 2", 20);
const product3 = new Product(3, "Product 3", 50);

// Initialize the cart
const cart = new Cart();
cart.initialize([product1, product2, product3]);

// Add and remove event handlers
function add(ind) {
    cart.addProduct(ind);
}

function sub(ind) {
    cart.removeProduct(ind);
}

function changeCol(ind) {
    const likeButton = document.getElementById(`like-btn${ind}`);
    if (likeButton.style.color === 'black') {
        likeButton.style.color = 'red';
    } else {
        likeButton.style.color = 'black';
    }
}

// Event listener for removing items
document.querySelectorAll(".fa-trash-alt").forEach(button => {
    button.addEventListener("click", () => {
        const cardBody = button.closest(".dell");
        cardBody.parentElement.removeChild(cardBody);
    });
});
