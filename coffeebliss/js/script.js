// Menu Items Array
const menuItems = [
    { name: "Espresso", price: "₹50", image: "images/espresso.webp" },
    { name: "Cappuccino", price: "₹120", image: "images/cappuccino.webp" },
    { name: "Latte", price: "₹100", image: "images/latte.webp" },
    { name: "Mocha", price: "₹130", image: "images/mocha.webp" },
    { name: "Americano", price: "₹150", image: "images/americano.webp" },
    { name: "Affogato", price: "₹180", image: "images/affogato.webp" },
    { name: "Cold Brew", price: "₹200", image: "images/coldbrew.webp" },
    { name: "Cuban Coffee", price: "₹220", image: "images/Cuban Coffee.webp" },
    { name: "Turkish Coffee", price: "₹250", image: "images/Turkish Coffee.webp" },
    { name: "Irish Coffee", price: "₹280", image: "images/Irish Coffee.webp" }
];

// Load Menu Items Dynamically
const menuContainer = document.getElementById("menu-container");

menuItems.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onclick="openModal('${item.name}', '${item.image}', '${item.price}')">
        <h2>${item.name}</h2>
        <p>${item.price}</p>
    `;
    menuContainer.appendChild(menuItem);
});

// Open Modal for Item Details
const modal = document.getElementById("itemModal");
const itemImage = document.getElementById("itemImage");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");

function openModal(name, img, price) {
    itemImage.src = img;
    itemName.innerText = name;
    itemPrice.innerText = `Price: ${price}`;
    document.getElementById('addToCartBtn').setAttribute('data-name', name);
    document.getElementById('addToCartBtn').setAttribute('data-img', img);
    document.getElementById('addToCartBtn').setAttribute('data-price', price);
    modal.style.display = "block";
}

// Close Modal
function closeModal() {
    modal.style.display = "none";
}

// Store cart items globally
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to Cart
function addToCart() {
    const name = document.getElementById('addToCartBtn').getAttribute('data-name');
    const img = document.getElementById('addToCartBtn').getAttribute('data-img');
    const price = document.getElementById('addToCartBtn').getAttribute('data-price');

    const item = { name, img, price };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    closeModal();
}

// Open Cart Modal
function showCartModal() {
    updateCart();
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('cartOverlay').style.display = 'block';
}

// Close Cart Modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('cartOverlay').style.display = 'none';
}

// Update Cart Items Display
function updateCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartContainer.innerHTML = ''; // Clear previous items

    let total = 0;
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            const priceNum = parseInt(item.price.replace('₹', ''));
            total += priceNum;

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" width="50">
                    <div>
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                    <button class="btn remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }

    cartTotal.innerText = `₹${total}`;
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Checkout Items
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    closeCartModal();
}

// Clear Cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
// Toggle Cart Visibility
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const showCartBtn = document.getElementById('showCartBtn');

    // Check current display status and toggle visibility
    if (cartModal.style.display === 'none' || cartModal.style.display === '') {
        cartModal.style.display = 'block';
        showCartBtn.innerText = 'Close Cart';
        updateCartUI(); // Update cart when opening
    } else {
        cartModal.style.display = 'none';
        showCartBtn.innerText = 'Show Cart';
    }
}

// Go Back from Cart (Updated)
function goBack() {
    const cartModal = document.getElementById('cartModal');
    const showCartBtn = document.getElementById('showCartBtn');

    // Hide Cart and Reset Button
    cartModal.style.display = 'none';
    showCartBtn.innerText = 'Show Cart';
}
