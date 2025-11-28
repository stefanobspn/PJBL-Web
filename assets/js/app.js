const App = {
    // --- DATA ---
    products: [
        {
            id: 'p1',
            name: 'Aesthetic Vase',
            price: 45.00,
            description: 'A beautifully crafted ceramic vase to bring a touch of minimalist elegance to any room. Its neutral tone and simple silhouette make it a versatile piece for modern homes.',
            category: 'Decor',
            image: 'assets/img/product-1.jpg'
        },
        {
            id: 'p2',
            name: 'Monochrome Wall Art',
            price: 120.00,
            description: 'Abstract wall art featuring a high-contrast monochrome design. Printed on high-quality canvas, this piece acts as a bold statement in a minimalist space.',
            category: 'Art',
            image: 'assets/img/product-2.jpg'
        },
        {
            id: 'p3',
            name: 'Minimalist Desk Lamp',
            price: 78.50,
            description: 'Sleek and functional, this LED desk lamp provides clean, focused light. Made from matte black aluminum, it features an adjustable arm and a minimalist footprint.',
            category: 'Lighting',
            image: 'assets/img/product-3.jpg'
        },
        {
            id: 'p4',
            name: 'Charcoal Linen Throw',
            price: 95.00,
            description: 'A soft, breathable linen throw in a deep charcoal color. Perfect for adding a layer of texture and comfort to your sofa or bed.',
            category: 'Textiles',
            image: 'assets/img/product-4.jpg'
        },
        {
            id: 'p5',
            name: 'Concrete Planter',
            price: 32.00,
            description: 'A small, geometric concrete planter ideal for succulents or cacti. Its raw texture and simple form are hallmarks of brutalist-inspired design.',
            category: 'Decor',
            image: 'assets/img/product-5.jpg'
        },
        {
            id: 'p6',
            name: 'Digital Smart Clock',
            price: 65.00,
            description: 'A smart clock with a clean, numberless display that shows time via light segments. Syncs with your devices and features a minimalist white oak finish.',
            category: 'Electronics',
            image: 'assets/img/product-6.jpg'
        }
    ],

    // --- INITIALIZATION ---
    init() {
        // This method is called when the DOM is ready.
        this.cacheSelectors();
        this.addEventListeners();
        this.route();
        this.updateHeader();
    },

    cacheSelectors() {
        // Cache DOM elements to avoid repeated lookups
        this.ui = {
            featuredProductGrid: document.getElementById('featured-product-grid'),
            productGrid: document.getElementById('product-grid'),
            productDetailContent: document.getElementById('product-detail-content'),
            cartPageContainer: document.getElementById('cart-page-container'),
            cartCount: document.getElementById('cart-count'),
            userActionLink: document.getElementById('user-action-link'),
            loginForm: document.getElementById('login-form'),
            registerForm: document.getElementById('register-form'),
            checkoutForm: document.getElementById('checkout-form'),
            checkoutContent: document.getElementById('checkout-content'),
            checkoutSuccess: document.getElementById('checkout-success'),
            summaryItems: document.getElementById('summary-items'),
            summaryTotal: document.getElementById('summary-total'),
        };
    },

    addEventListeners() {
        if (this.ui.loginForm) {
            this.ui.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.ui.registerForm) {
            this.ui.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        if (this.ui.checkoutForm) {
            this.ui.checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
        }
    },
    
    // --- ROUTING ---
    route() {
        const path = window.location.pathname;

        if (path.endsWith('/') || path.endsWith('index.html')) {
            this.loadHomePage();
        } else if (path.includes('products.html')) {
            this.loadProductsPage();
        } else if (path.includes('product-detail.html')) {
            this.loadProductDetailPage();
        } else if (path.includes('cart.html')) {
            this.loadCartPage();
        } else if (path.includes('checkout.html')) {
            this.loadCheckoutPage();
        }
    },

    // --- PAGE LOADERS ---
    loadHomePage() {
        if (this.ui.featuredProductGrid) {
            const featuredProducts = this.products.slice(0, 3);
            this.ui.featuredProductGrid.innerHTML = featuredProducts.map(p => this.renderProductCard(p, true)).join('');
        }
    },

    loadProductsPage() {
        if (this.ui.productGrid) {
            this.ui.productGrid.innerHTML = this.products.map(p => this.renderProductCard(p)).join('');
        }
    },

    loadProductDetailPage() {
        if (this.ui.productDetailContent) {
            const productId = new URLSearchParams(window.location.search).get('id');
            const product = this.getProductById(productId);
            if (product) {
                this.ui.productDetailContent.innerHTML = this.renderProductDetail(product);
            } else {
                this.ui.productDetailContent.innerHTML = '<p>Product not found.</p>';
            }
        }
    },
    
    loadCartPage() {
        if (this.ui.cartPageContainer) {
            const cartItems = this.getCartItems();
            if (cartItems.length > 0) {
                this.ui.cartPageContainer.innerHTML = this.renderCartPage(cartItems);
            } else {
                this.ui.cartPageContainer.innerHTML = `
                    <div class="cart-empty-message">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <a href="products.html" class="btn btn-primary">Continue Shopping</a>
                    </div>`;
            }
        }
    },

    loadCheckoutPage() {
        if (!this.isLoggedIn()) {
            alert("Please login to proceed to checkout.");
            window.location.href = this.getRootPath() + 'pages/login.html';
            return;
        }
        const items = this.getCartItems();
        if (items.length === 0) {
            alert("Your cart is empty.");
            window.location.href = this.getRootPath() + 'pages/products.html';
            return;
        }
        this.renderCheckoutSummary(items);
    },

    // --- UI RENDERING ---
    renderProductCard(product, isHomePage = false) {
        // Adjust paths for pages inside the /pages/ directory
        const imagePath = isHomePage ? product.image : `../${product.image}`;
        const detailPath = isHomePage ? `pages/product-detail.html?id=${product.id}` : `product-detail.html?id=${product.id}`;

        return `
            <a href="${detailPath}" class="product-card">
                <img src="${imagePath}" alt="${product.name}" class="product-card-image">
                <div class="product-card-info">
                    <p class="product-card-category">${product.category}</p>
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-price">${this.formatPrice(product.price)}</p>
                </div>
            </a>`;
    },

    renderProductDetail(product) {
        return `
            <div class="product-detail-layout">
                <div class="product-detail-image">
                    <img src="../${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <p class="category">${product.category}</p>
                    <h1>${product.name}</h1>
                    <p class="price">${this.formatPrice(product.price)}</p>
                    <p class="description">${product.description}</p>
                    <button class="btn btn-primary" onclick="App.handleAddToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>`;
    },

    renderCartPage(cartItems) {
        const total = this.getCartTotal();
        const itemsHtml = cartItems.map(item => `
            <div class="cart-item-card">
                <img src="../${item.image}" alt="${item.name}" class="cart-item-card-img">
                <div class="cart-item-details">
                    <p class="cart-item-title">${item.name}</p>
                    <p class="cart-item-price">${this.formatPrice(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-selector">
                            <button onclick="App.handleUpdateQuantity('${item.id}', ${item.qty - 1})">-</button>
                            <input type="number" value="${item.qty}" min="1" onchange="App.handleUpdateQuantity('${item.id}', this.value)">
                            <button onclick="App.handleUpdateQuantity('${item.id}', ${item.qty + 1})">+</button>
                        </div>
                        <a href="#" onclick="App.handleRemoveFromCart('${item.id}')" class="cart-item-remove" aria-label="Remove item"><i class="fa-solid fa-trash"></i></a>
                    </div>
                </div>
            </div>`).join('');
        
        const summaryHtml = `
            <div class="cart-summary-sticky">
                <h3>Order Summary</h3>
                <div class="summary-row"><span>Subtotal</span><span>${this.formatPrice(total)}</span></div>
                <div class="summary-row"><span>Shipping</span><span>FREE</span></div>
                <div class="summary-row total"><span>Total</span><span>${this.formatPrice(total)}</span></div>
                <a href="checkout.html" class="btn btn-primary w-100">Proceed to Checkout</a>
            </div>`;

        return `<div class="cart-page-layout">${itemsHtml}${summaryHtml}</div>`;
    },
    
    renderCheckoutSummary(cartItems) {
        if(this.ui.summaryItems && this.ui.summaryTotal) {
            const total = this.getCartTotal();
            this.ui.summaryItems.innerHTML = cartItems.map(item => `<div class="summary-row"><span>${item.name} (x${item.qty})</span><span>${this.formatPrice(item.price * item.qty)}</span></div>`).join('');
            this.ui.summaryTotal.innerHTML = `<div class="summary-row total"><span>Total</span><span>${this.formatPrice(total)}</span></div>`;
        }
    },
    
    updateHeader() {
        this.updateCartCount();
        if (this.isLoggedIn()) {
            this.ui.userActionLink.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
            this.ui.userActionLink.setAttribute('aria-label', 'Logout');
            this.ui.userActionLink.href = '#';
            this.ui.userActionLink.onclick = (e) => {
                e.preventDefault();
                this.logoutUser();
                window.location.href = this.getRootPath() + 'index.html';
            };
        } else {
            this.ui.userActionLink.innerHTML = '<i class="fa-solid fa-user"></i>';
            this.ui.userActionLink.setAttribute('aria-label', 'Login');
            this.ui.userActionLink.href = this.getRootPath() + 'pages/login.html';
            this.ui.userActionLink.onclick = null;
        }
    },

    updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        if (this.ui.cartCount) {
            this.ui.cartCount.textContent = count;
            this.ui.cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // --- DATA HELPERS ---
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },
    
    formatPrice(price) {
        return `$${price.toFixed(2)}`;
    },

    getRootPath() {
        return window.location.pathname.includes('/pages/') ? '../' : '';
    },

    // --- AUTH LOGIC ---
    getUsers() { return JSON.parse(localStorage.getItem('users')) || []; },
    saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); },
    getCurrentUser() { return JSON.parse(localStorage.getItem('currentUser')) || null; },
    isLoggedIn() { return !!this.getCurrentUser(); },
    
    registerUser(email, password) {
        const users = this.getUsers();
        if (users.find(user => user.email === email)) {
            return { success: false, message: 'Email already exists.' };
        }
        users.push({ id: Date.now().toString(), email, password });
        this.saveUsers(users);
        return { success: true };
    },

    loginUser(email, password) {
        const user = this.getUsers().find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true };
        }
        return { success: false };
    },

    logoutUser() {
        localStorage.removeItem('currentUser');
    },

    // --- CART LOGIC ---
    getCart() { return JSON.parse(localStorage.getItem('cart')) || []; },
    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },
    
    getCartItems() {
        return this.getCart().map(item => {
            const product = this.getProductById(item.id);
            return { ...product, qty: item.qty };
        });
    },

    getCartTotal() {
        return this.getCartItems().reduce((total, item) => total + (item.price * item.qty), 0);
    },

    clearCart() { this.saveCart([]); },

    // --- EVENT HANDLERS ---
    handleAddToCart(productId) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ id: productId, qty: 1 });
        }
        this.saveCart(cart);
        alert('Product added to cart!');
    },

    handleRemoveFromCart(productId) {
        let cart = this.getCart().filter(item => item.id !== productId);
        this.saveCart(cart);
        this.loadCartPage(); // Re-render cart
    },
    
    handleUpdateQuantity(productId, quantity) {
        let cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.qty = parseInt(quantity, 10);
            if (item.qty <= 0) {
                this.handleRemoveFromCart(productId);
                return;
            }
        }
        this.saveCart(cart);
        this.loadCartPage();
    },

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('form-error');
        
        const result = this.loginUser(email, password);
        if (result.success) {
            window.location.href = this.getRootPath() + 'index.html';
        } else {
            errorEl.style.display = 'block';
        }
    },

    handleRegister(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        if (password !== confirmPassword) {
            passwordError.style.display = 'block';
            return;
        }

        const result = this.registerUser(email, password);
        if (result.success) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            emailError.textContent = result.message;
            emailError.style.display = 'block';
        }
    },
    
    handleCheckout(e) {
        e.preventDefault();
        if (e.target.checkValidity()) {
            this.clearCart();
            this.ui.checkoutContent.classList.add('d-none');
            this.ui.checkoutSuccess.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = this.getRootPath() + 'index.html';
            }, 4000);
        } else {
            alert("Please fill all required fields.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
