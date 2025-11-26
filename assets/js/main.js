function getRootPath() {
    // Check if the current page is in the 'pages' subdirectory
    if (window.location.pathname.includes('/pages/')) {
        // If so, the root is one level up
        return '../';
    }
    // Otherwise, we're at the root
    return '';
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    updateHeader();
    route();
}

function updateHeader() {
    updateCartCount();
    const userActionLink = document.getElementById('user-action-link');
    if (isLoggedIn()) {
        userActionLink.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
        userActionLink.setAttribute('aria-label', 'Logout');
        userActionLink.href = '#';
        userActionLink.onclick = (e) => {
            e.preventDefault();
            logoutUser();
            window.location.href = getRootPath() + 'index.html';
        };
    } else {
        userActionLink.innerHTML = '<i class="fa-solid fa-user"></i>';
        userActionLink.setAttribute('aria-label', 'Login');
        // Ensure href is correct for non-logged-in state
        if (window.location.pathname.includes('/pages/')) {
            userActionLink.href = 'login.html';
        } else {
            userActionLink.href = 'pages/login.html';
        }
        userActionLink.onclick = null; // remove logout handler
    }
}


function route() {
    const path = window.location.pathname;

    if (path === '/' || path.endsWith('index.html')) {
        loadHomePage();
    } else if (path.includes('products.html')) {
        loadProductsPage();
    } else if (path.includes('product-detail.html')) {
        loadProductDetailPage();
    } else if (path.includes('login.html')) {
        setupLoginForm();
    } else if (path.includes('register.html')) {
        setupRegisterForm();
    } else if (path.includes('cart.html')) {
        loadCartPage();
    } else if (path.includes('checkout.html')) {
        loadCheckoutPage();
    }
}

function loadHomePage() {
    const featuredGrid = document.getElementById('featured-product-grid');
    if (featuredGrid) {
        const products = getProducts().slice(0, 3); // Show first 3 as featured
        featuredGrid.innerHTML = products.map(p => {
             // Adjust image path for root index.html
            let cardHtml = renderProductCard(p);
            return cardHtml.replace('../assets/img', 'assets/img');
        }).join('');
    }
}

function loadProductsPage() {
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        const products = getProducts();
        productGrid.innerHTML = products.map(renderProductCard).join('');
    }
}

function loadProductDetailPage() {
    const content = document.getElementById('product-detail-content');
    if (content) {
        const productId = new URLSearchParams(window.location.search).get('id');
        const product = getProductById(productId);
        if (product) {
            content.innerHTML = renderProductDetail(product);
        } else {
            content.innerHTML = '<p>Product not found.</p>';
        }
    }
}

function setupLoginForm() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorEl = document.getElementById('form-error');

            const result = loginUser(email, password);
            if (result.success) {
                window.location.href = getRootPath() + 'index.html';
            } else {
                errorEl.style.display = 'block';
            }
        });
    }
}

function setupRegisterForm() {
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', (e) => {
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

            const result = registerUser(email, password);
            if (result.success) {
                alert('Registration successful! Please login.');
                window.location.href = getRootPath() + 'pages/login.html';
            } else {
                emailError.textContent = result.message;
                emailError.style.display = 'block';
            }
        });
    }
}

function loadCartPage() {
    const cartContent = document.getElementById('cart-content');
    const cartEmpty = document.getElementById('cart-empty');
    if (cartContent) {
        const items = getCartItems();
        if (items.length > 0) {
            cartContent.innerHTML = renderCartPage(items);
            cartEmpty.classList.add('d-none');
        } else {
            cartContent.innerHTML = '';
            cartEmpty.classList.remove('d-none');
        }
    }
}

function loadCheckoutPage() {
    if (!isLoggedIn()) {
        alert("Please login to proceed to checkout.");
        window.location.href = getRootPath() + 'pages/login.html';
        return;
    }
    const items = getCartItems();
    if (items.length === 0) {
        alert("Your cart is empty.");
        window.location.href = getRootPath() + 'pages/products.html';
        return;
    }

    renderCheckoutSummary(items);
    setupCheckoutForm();
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    const user = getCurrentUser();
    
    // Pre-fill email if possible
    if(user && user.email) {
        document.getElementById('email').value = user.email;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        // Basic validation
        if (form.checkValidity()) {
            // Process order
            clearCart();
            
            document.getElementById('checkout-content').classList.add('d-none');
            document.getElementById('checkout-success').classList.remove('d-none');
            
            setTimeout(() => {
                window.location.href = getRootPath() + 'index.html';
            }, 4000);
        } else {
            alert("Please fill all required fields.");
        }
    });
}


// Global handlers accessible from inline JS
function handleAddToCart(productId) {
    addToCart(productId);
    alert('Product added to cart!');
}

function handleRemoveFromCart(productId) {
    removeFromCart(productId);
    loadCartPage(); // Re-render cart
}

function handleUpdateQuantity(productId, quantity) {
    const qty = parseInt(quantity, 10);
    updateCartQuantity(productId, qty);
    loadCartPage(); // Re-render cart
}
