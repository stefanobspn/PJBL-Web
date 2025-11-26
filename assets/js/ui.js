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

function renderCartPage(cartItems) {
    const total = getCartTotal();

    const itemsHtml = `
        <div class="cart-items-list">
            ${cartItems.map(item => `
                <div class="cart-item-card">
                    <img src="../assets/img/product-${item.id.substring(1)}.jpg" alt="${item.name}" class="cart-item-card-img">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.name}</p>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button onclick="handleUpdateQuantity('${item.id}', ${item.qty - 1})">-</button>
                                <input type="number" value="${item.qty}" min="1" onchange="handleUpdateQuantity('${item.id}', this.value)">
                                <button onclick="handleUpdateQuantity('${item.id}', ${item.qty + 1})">+</button>
                            </div>
                            <a href="#" onclick="handleRemoveFromCart('${item.id}')" class="cart-item-remove" aria-label="Remove item">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const summaryHtml = `
        <div class="cart-summary-sticky">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary w-100">Proceed to Checkout</a>
        </div>
    `;

    return `
        <div class="cart-page-layout">
            ${itemsHtml}
            ${summaryHtml}
        </div>
    `;
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
