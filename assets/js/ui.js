// Utility to format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Renders a single product card
function renderProductCard(product) {
    return `
        <a href="product-detail.html?id=${product.id}" class="product-card">
            <img src="../assets/img/product-${product.id.substring(1)}.jpg" alt="${product.name}" class="product-card-image">
            <div class="product-card-info">
                <p class="product-card-category">${product.category}</p>
                <h3 class="product-card-name">${product.name}</h3>
                <p class="product-card-price">${formatPrice(product.price)}</p>
            </div>
        </a>
    `;
}

// Renders the product detail page content
function renderProductDetail(product) {
    return `
        <div class="product-detail-layout">
            <div class="product-detail-image">
                <img src="../assets/img/product-${product.id.substring(1)}.jpg" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <p class="category">${product.category}</p>
                <h1>${product.name}</h1>
                <p class="price">${formatPrice(product.price)}</p>
                <p class="description">${product.description}</p>
                <button class="btn btn-primary" onclick="handleAddToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
}

// Renders the entire cart page
function renderCartPage(cartItems) {
    const total = getCartTotal();
    
    const itemsHtml = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th colspan="2">Product</th>
                    <th class="hide-mobile">Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${cartItems.map(item => `
                    <tr>
                        <td><img src="../assets/img/product-${item.id.substring(1)}.jpg" alt="${item.name}" class="cart-item-image"></td>
                        <td>
                            <p class="cart-item-title">${item.name}</p>
                            <p class="cart-item-price hide-desktop">${formatPrice(item.price)}</p>
                        </td>
                        <td class="hide-mobile">${formatPrice(item.price)}</td>
                        <td>
                            <input type="number" value="${item.qty}" min="1" class="form-input quantity-input" onchange="handleUpdateQuantity('${item.id}', this.value)">
                        </td>
                        <td>${formatPrice(item.price * item.qty)}</td>
                        <td>
                            <button class="btn-icon" onclick="handleRemoveFromCart('${item.id}')" aria-label="Remove item">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    const summaryHtml = `
        <div class="cart-summary">
            <h3>Cart Total</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary w-100 mt-lg">Proceed to Checkout</a>
        </div>
    `;

    return itemsHtml + summaryHtml;
}

// Renders checkout summary
function renderCheckoutSummary(cartItems) {
    const total = getCartTotal();

    const itemsHtml = cartItems.map(item => `
        <div class="summary-row">
            <span>${item.name} (x${item.qty})</span>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');

    const totalHtml = `
         <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;

    document.getElementById('summary-items').innerHTML = itemsHtml;
    document.getElementById('summary-total').innerHTML = totalHtml;
}
