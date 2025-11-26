function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ id: productId, qty: quantity });
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty = quantity;
        if (item.qty <= 0) {
            removeFromCart(productId);
            return; // Exit because removeFromCart already saves
        }
    }
    saveCart(cart);
}

function getCartItems() {
    const cart = getCart();
    const products = getProducts();
    
    return cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...product,
            qty: item.qty
        };
    });
}

function getCartTotal() {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
}

function clearCart() {
    saveCart([]);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
}
