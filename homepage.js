// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('naijashop-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('naijashop-theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('naijashop-theme', 'light');
        }
    });
}

// Product Database
const products = [
    {
        id: 1,
        name: "Tecno Spark 10 Pro 128GB",
        price: "₦89,999",
        originalPrice: "₦120,000",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.5,
        reviews: 124,
        category: "Phones & Tablets",
        badge: "AI PICK",
        description: "6.8-inch Display, 128GB Storage, 5000mAh Battery"
    },
    {
        id: 2,
        name: "Infinix Smart Watch 5",
        price: "₦32,499",
        originalPrice: "₦45,000",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.0,
        reviews: 89,
        category: "Wearables",
        badge: "TRENDING",
        description: "1.3-inch Display, Heart Rate Monitor, Water Resistant"
    },
    {
        id: 3,
        name: "Canon EOS 250D DSLR Camera",
        price: "₦280,000",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 5.0,
        reviews: 67,
        category: "Cameras",
        description: "24.1MP APS-C Sensor, 4K Video, Wi-Fi Connectivity"
    },
    {
        id: 4,
        name: "Wireless Noise Cancelling Headphones",
        price: "₦24,999",
        originalPrice: "₦35,000",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.7,
        reviews: 203,
        category: "Audio",
        badge: "DEAL",
        description: "Active Noise Cancellation, 30hr Battery, Bluetooth 5.0"
    },
    {
        id: 5,
        name: "Nike Air Max Sneakers - Men's",
        price: "₦31,500",
        originalPrice: "₦45,000",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.2,
        reviews: 156,
        category: "Fashion",
        badge: "30% OFF",
        description: "Men's Running Shoes, Air Cushioning, Size 6-12"
    },
    {
        id: 6,
        name: "Laptop Backpack Waterproof",
        price: "₦12,500",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.6,
        reviews: 78,
        category: "Accessories",
        description: "Waterproof, Laptop Compartment, Multiple Pockets"
    },
    {
        id: 7,
        name: "PlayStation 5 Gaming Console",
        price: "₦420,000",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.3,
        reviews: 45,
        category: "Gaming",
        badge: "HOT",
        description: "4K Gaming, 825GB SSD, DualSense Wireless Controller"
    },
    {
        id: 8,
        name: "Fitness Tracker Smartwatch",
        price: "₦18,900",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 3.8,
        reviews: 92,
        category: "Wearables",
        description: "Heart Rate Monitor, Sleep Tracking, 7-day Battery"
    },
    {
        id: 9,
        name: "Samsung Galaxy Tab S8",
        price: "₦245,000",
        originalPrice: "₦299,000",
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.4,
        reviews: 134,
        category: "Phones & Tablets",
        badge: "NEW",
        description: "11-inch Display, S Pen Included, 128GB Storage"
    },
    {
        id: 10,
        name: "Apple MacBook Air M2",
        price: "₦680,000",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.8,
        reviews: 89,
        category: "Computers",
        description: "M2 Chip, 13-inch Retina Display, 256GB SSD"
    },
    {
        id: 11,
        name: "Wireless Earbuds Pro",
        price: "₦15,999",
        originalPrice: "₦22,000",
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.1,
        reviews: 167,
        category: "Audio",
        badge: "POPULAR",
        description: "True Wireless, Noise Cancellation, 24hr Battery"
    },
    {
        id: 12,
        name: "Gaming Mechanical Keyboard",
        price: "₦8,500",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.3,
        reviews: 56,
        category: "Gaming",
        description: "RGB Backlit, Mechanical Switches, Wired"
    }
];

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('naijashop-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('naijashop-theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('naijashop-theme', 'light');
        }
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const resultsCount = document.getElementById('resultsCount');

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.trim().toLowerCase();

        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            return;
        }

        // Filter products based on search term
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(filteredProducts, searchTerm);
    });

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-bar')) {
            searchResults.classList.remove('active');
        }
    });

    // Keep results open when clicking inside search bar
    searchInput.addEventListener('click', function (e) {
        if (this.value.trim().length > 0) {
            searchResults.classList.add('active');
        }
    });
}

function displaySearchResults(products, searchTerm) {
    const searchResultsList = document.getElementById('searchResultsList');
    const resultsCount = document.getElementById('resultsCount');
    const searchResults = document.getElementById('searchResults');

    resultsCount.textContent = `${products.length} items found for "${searchTerm}"`;

    if (products.length === 0) {
        searchResultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found for "${searchTerm}"</p>
                <p class="suggestions">Try searching for "phone", "watch", "laptop", or "headphones"</p>
            </div>
        `;
    } else {
        searchResultsList.innerHTML = products.map(product => `
            <a href="#" class="search-result-item" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="search-result-image">
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    <div class="search-result-price">
                        ${product.originalPrice ? `<span class="product-original-price">${product.originalPrice}</span>` : ''}
                        ${product.price}
                    </div>
                    <div class="search-result-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.rating})</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    searchResults.classList.add('active');

    // Add click event to search result items
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const product = products.find(p => p.id == productId);
            if (product) {
                // For demo purposes, just alert the product name
                // In a real app, you would navigate to product page
                alert(`Selected: ${product.name}\nPrice: ${product.price}\n\nThis would open the product detail page in a real application.`);
            }
        });
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Initialize dark mode
    initDarkMode();

    // Initialize search functionality
    initSearch();

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // AI Assistant with Free Test API
    const aiToggle = document.getElementById('aiToggle');
    const aiChat = document.getElementById('aiChat');
    const aiMessages = document.getElementById('aiMessages');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');

    aiToggle.addEventListener('click', () => {
        aiChat.classList.toggle('active');
    });

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'ai');
        messageDiv.textContent = text;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai', 'typing');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        aiMessages.appendChild(typingDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage(message, true);
            aiInput.value = '';
            aiSend.disabled = true;

            addTypingIndicator();

            try {
                // Using a free public API for testing
                const response = await fetch('https://api.quotable.io/random');

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                const aiResponse = `I understand you asked about shopping, but while I'm setting up, here's an interesting quote: "${data.content}" - ${data.author}`;

                removeTypingIndicator();
                addMessage(aiResponse);

            } catch (error) {
                console.error('Error:', error);
                removeTypingIndicator();

                // Fallback to smart responses based on user input
                const userMessage = message.toLowerCase();
                let response = "Thanks for your message! I'm currently in testing mode.";

                if (userMessage.includes('price') || userMessage.includes('cost')) {
                    response = "I can help you compare prices! In the full version, I'll check current prices across multiple sellers.";
                } else if (userMessage.includes('product') || userMessage.includes('item')) {
                    response = "I can help you find products! Tell me what you're looking for and I'll search our catalog.";
                } else if (userMessage.includes('shipping') || userMessage.includes('delivery')) {
                    response = "Shipping usually takes 3-5 business days. Express delivery is available for an additional fee.";
                } else if (userMessage.includes('return') || userMessage.includes('refund')) {
                    response = "We have a 30-day return policy. Items must be in original condition with tags attached.";
                }

                addMessage(response);
            } finally {
                aiSend.disabled = false;
            }
        }
    }

    // Add welcome message when chat opens
    aiToggle.addEventListener('click', function () {
        if (aiChat.classList.contains('active') && aiMessages.children.length === 0) {
            addMessage("Hello! I'm your AI shopping assistant (Demo Mode). I can help you with product searches, price comparisons, and shopping questions. What would you like to know?");
        }
    });

    // // AI Assistant
    // const aiToggle = document.getElementById('aiToggle');
    // const aiChat = document.getElementById('aiChat');
    // const aiMessages = document.getElementById('aiMessages');
    // const aiInput = document.getElementById('aiInput');
    // const aiSend = document.getElementById('aiSend');

    // aiToggle.addEventListener('click', () => {
    //     aiChat.classList.toggle('active');
    // });

    // function addMessage(text, isUser = false) {
    //     const messageDiv = document.createElement('div');
    //     messageDiv.classList.add('message');
    //     messageDiv.classList.add(isUser ? 'user' : 'ai');
    //     messageDiv.textContent = text;
    //     aiMessages.appendChild(messageDiv);
    //     aiMessages.scrollTop = aiMessages.scrollHeight;
    // }

    // aiSend.addEventListener('click', sendMessage);
    // aiInput.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //         sendMessage();
    //     }
    // });

    // function sendMessage() {
    //     const message = aiInput.value.trim();
    //     if (message) {
    //         addMessage(message, true);
    //         aiInput.value = '';

    //         // Simulate AI response after a short delay
    //         setTimeout(() => {
    //             const responses = [
    //                 "I found several products matching your request. Would you like me to show them?",
    //                 "Based on your budget, I recommend these options...",
    //                 "That product is currently on sale! Would you like to see similar items?",
    //                 "I can help you compare prices from different sellers. What's your budget range?",
    //                 "Great choice! This product has excellent reviews. Would you like me to track the price for you?"
    //             ];
    //             const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    //             addMessage(randomResponse);
    //         }, 1000);
    //     }
    // }


    // Homepage functionality
class Homepage {
    constructor() {
        this.cart = new Cart();
        this.init();
    }

    init() {
        this.setupAddToCartButtons();
        this.setupCartIcon();
        this.setupSearch();
        this.setupHeroSlider();
        this.setupTheme();
        this.updateCartCount();
    }

    setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const product = this.getProductData(button);
                this.cart.addItem(product);
                this.updateCartCount();
                this.showAddToCartToast(product.name);
            });
        });
    }

    getProductData(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent.trim();
        const priceElement = productCard.querySelector('.product-price');
        
        // Extract price (handle both discounted and regular prices)
        let priceText = priceElement.textContent;
        const originalPriceElement = productCard.querySelector('.product-original-price');
        
        if (originalPriceElement) {
            // Use the discounted price (the one without line-through)
            priceText = priceElement.textContent.replace(originalPriceElement.textContent, '').trim();
        }
        
        const price = this.extractPrice(priceText);
        const image = productCard.querySelector('.product-image').src;
        
        // Generate consistent ID based on product name
        const id = 'prod_' + productName.toLowerCase().replace(/[^a-z0-9]/g, '_');

        return {
            id: id,
            name: productName,
            price: price,
            image: image,
            category: this.getCategoryFromProduct(productName)
        };
    }

    extractPrice(priceText) {
        // Remove currency symbol and commas, then convert to number
        const cleanPrice = priceText.replace(/[^\d.]/g, '');
        return parseFloat(cleanPrice);
    }

    getCategoryFromProduct(productName) {
        const name = productName.toLowerCase();
        if (name.includes('phone') || name.includes('tecno') || name.includes('infinix')) return 'Phones & Tablets';
        if (name.includes('watch') || name.includes('smartwatch')) return 'Smart Watches';
        if (name.includes('camera')) return 'Cameras';
        if (name.includes('headphone')) return 'Headphones';
        if (name.includes('sneaker') || name.includes('nike')) return 'Sneakers';
        if (name.includes('laptop') || name.includes('backpack')) return 'Computers';
        if (name.includes('playstation') || name.includes('gaming')) return 'Gaming';
        return 'General';
    }

    setupCartIcon() {
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'carts.html';
            });
        }
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    showAddToCartToast(productName) {
        let toast = document.getElementById('addToCartToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'addToCartToast';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: var(--primary);
                color: white;
                padding: 12px 20px;
                border-radius: var(--radius);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                opacity: 0;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
            `;
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="fas fa-check-circle"></i> ✓ ${productName} added to cart`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
        }, 2000);
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput && searchResults) {
            searchInput.addEventListener('focus', () => {
                searchResults.classList.add('active');
            });
            
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    searchResults.classList.remove('active');
                }, 200);
            });
            
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    handleSearch(query) {
        // Search functionality can be implemented here
        console.log('Searching for:', query);
    }

    setupHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-dot');
        let currentSlide = 0;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[n].classList.add('active');
            dots[n].classList.add('active');
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
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
}

// Cart class used by both pages
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

    clearCart() {
        this.items = [];
        this.saveCart();
        return this.items;
    }
}

// Initialize homepage when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.homepage = new Homepage();
});

// Make cart accessible globally
window.Cart = Cart;

    // // Add to Cart functionality
    // const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // const cartCount = document.querySelector('.cart-count');
    // let count = 0;

    // addToCartButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         count++;
    //         cartCount.textContent = count;

    //         // Animation effect
    //         button.textContent = 'Added!';
    //         button.style.backgroundColor = '#4CAF50';

    //         setTimeout(() => {
    //             button.textContent = 'Add to Cart';
    //             button.style.backgroundColor = '';
    //         }, 1500);
    //     });
    // });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navActions = document.querySelector('.nav-actions');

    mobileMenuToggle.addEventListener('click', () => {
        navActions.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-actions') && !e.target.closest('.mobile-menu-toggle')) {
            navActions.classList.remove('show');
        }
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Initialize dark mode
    initDarkMode();

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // // AI Assistant
    // const aiToggle = document.getElementById('aiToggle');
    // const aiChat = document.getElementById('aiChat');
    // const aiMessages = document.getElementById('aiMessages');
    // const aiInput = document.getElementById('aiInput');
    // const aiSend = document.getElementById('aiSend');

    // aiToggle.addEventListener('click', () => {
    //     aiChat.classList.toggle('active');
    // });

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'ai');
        messageDiv.textContent = text;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage(message, true);
            aiInput.value = '';

            // Simulate AI response after a short delay
            setTimeout(() => {
                const responses = [
                    "Bia dont disturb me no try am NEVER?",
                    "Based on your budget, I recommend that you make money before coming here ",
                    "That product is currently on sale! Would you like to see similar items?",
                    "I can help you compare prices from different sellers. What's your budget range?",
                    "Great choice! This product has excellent reviews. Would you like me to track the price for you?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000);
        }
    }

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;

            // Animation effect
            button.textContent = 'Added!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1500);
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navActions = document.querySelector('.nav-actions');

    mobileMenuToggle.addEventListener('click', () => {
        navActions.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-actions') && !e.target.closest('.mobile-menu-toggle')) {
            navActions.classList.remove('show');
        }
    });
});