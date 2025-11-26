const products = [
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
];

function initDB() {
    // Initialize products in localStorage if not already there
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Initialize users array if not already there
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Initialize cart if not already there
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function getProductById(id) {
    const products = getProducts();
    return products.find(product => product.id === id);
}

// Initialize the DB on script load
initDB();
