// Cart page functionality
class CartPage {
    constructor() {
        this.cart = new Cart();
        this.init();
    }

    init() {
        this.renderCart();
        this.setupEventListeners();
        this.updateCartSummary();
        this.setupTheme();
        this.debugCart(); // Remove this in production
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        
        console.log('Cart items to render:', this.cart.items);
        
        if (this.cart.items.length === 0) {
            emptyCart.classList.add('active');
            cartItems.innerHTML = '';
            return;
        }
        
        emptyCart.classList.remove('active');
        
        cartItems.innerHTML = this.cart.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-product">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-category">${item.category || 'General'}</p>
                        <div class="cart-item-price-mobile">₦${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</div>
                
                <button class="remove-btn" data-id="${item.id}" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateCartSummary() {
        const subtotal = this.cart.calculateSubtotal();
        const shipping = this.cart.calculateShipping();
        const total = this.cart.calculateTotal();
        const itemCount = this.cart.getTotalItems();

        // Update summary section
        document.getElementById('itemCount').textContent = itemCount;
        document.getElementById('subtotal').textContent = `₦${subtotal.toLocaleString()}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`;
        document.getElementById('totalPrice').textContent = `₦${total.toLocaleString()}`;

        // Update mobile summary
        const mobileItemCount = document.getElementById('mobileItemCount');
        const mobileTotalPrice = document.getElementById('mobileTotalPrice');
        if (mobileItemCount) mobileItemCount.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
        if (mobileTotalPrice) mobileTotalPrice.textContent = `₦${total.toLocaleString()}`;

        // Update shipping progress
        this.updateShippingProgress(subtotal);

        // Update checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.disabled = itemCount === 0;
        }
    }

    updateShippingProgress(subtotal) {
        const progressFill = document.getElementById('progressFill');
        const progressAmount = document.getElementById('progressAmount');
        const shippingProgress = document.getElementById('shippingProgress');
        
        if (!progressFill || !progressAmount || !shippingProgress) return;

        const freeShippingThreshold = 10000;
        const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
        const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

        progressFill.style.width = `${progress}%`;

        if (subtotal >= freeShippingThreshold) {
            progressAmount.textContent = 'Free shipping unlocked! 🎉';
            shippingProgress.style.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
        } else {
            progressAmount.textContent = `₦${amountNeeded.toLocaleString()} more`;
            shippingProgress.style.background = '';
        }
    }

    setupEventListeners() {
        // Quantity buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn.plus')) {
                const button = e.target.closest('.quantity-btn.plus');
                const productId = button.dataset.id;
                this.updateQuantity(productId, 1);
            }
            
            if (e.target.closest('.quantity-btn.minus')) {
                const button = e.target.closest('.quantity-btn.minus');
                const productId = button.dataset.id;
                this.updateQuantity(productId, -1);
            }
            
            if (e.target.closest('.remove-btn')) {
                const button = e.target.closest('.remove-btn');
                const productId = button.dataset.id;
                this.removeItem(productId);
            }
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.items.length > 0) {
                    this.showToast('Checkout functionality coming soon!');
                }
            });
        }

        // Continue shopping button
        const continueShoppingBtn = document.querySelector('.btn-secondary');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'homepage.html';
            });
        }
    }

    updateQuantity(productId, change) {
        const item = this.cart.items.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.quantity + change;
            this.cart.updateQuantity(productId, newQuantity);
            this.renderCart();
            this.updateCartSummary();
            this.showToast(`Quantity updated to ${newQuantity}`);
        }
    }

    removeItem(productId) {
        const item = this.cart.items.find(item => item.id === productId);
        if (item) {
            this.cart.removeItem(productId);
            this.renderCart();
            this.updateCartSummary();
            this.showToast('Item removed from cart');
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
            document.body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    debugCart() {
        console.log('Current cart items:', this.cart.items);
        console.log('Local storage data:', localStorage.getItem('naijashop_cart'));
        
        // Test: Add sample item if cart is empty
        if (this.cart.items.length === 0) {
            console.log('Cart is empty. Add items from homepage first.');
        }
    }
}

// Cart class (same as in homepage.js)
class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem('naijashop_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('naijashop_cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        return this.items;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        return this.items;
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            return this.removeItem(productId);
        }

        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
        }
        return this.items;
    }

    getTotalItems() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    calculateSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    calculateShipping() {
        const subtotal = this.calculateSubtotal();
        return subtotal >= 10000 ? 0 : 1000;
    }

    calculateTotal() {
        return this.calculateSubtotal() + this.calculateShipping();
    }
}

// Initialize cart page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cartPage = new CartPage();
});