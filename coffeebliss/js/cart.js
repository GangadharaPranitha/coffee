// Load Cart Items from Local Storage
document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cartTotal");

    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        cartTotal.innerText = "₹0";
        return;
    }

    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace("₹", "")); // Extract price as number
        totalAmount += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-img">
                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p>Price: ${item.price}</p>
                </div>
                <button class="btn remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.innerText = `₹${totalAmount.toFixed(2)}`;
}

// Remove Item from Cart
function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    loadCart(); // Reload the cart
}

// Checkout Function
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase! Your order has been placed.");
    localStorage.removeItem("cart");
    loadCart();
}

// Clear Cart
function clearCart() {
    localStorage.removeItem("cart");
    alert("Your cart has been cleared!");
    loadCart();
}
