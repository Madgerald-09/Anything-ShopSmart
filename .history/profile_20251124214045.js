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

// Check if user is logged in
function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showDashboard();
        const user = JSON.parse(currentUser);
        document.getElementById('userGreeting').textContent = `Hello, ${user.name.split(' ')[0]}!`;
    } else {
        showLogin();
    }
}

// Show login page
function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'none';
}

// Show register page
function showRegister() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'flex';
    document.getElementById('dashboardPage').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'block';
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9]{10,15}$/;
    return re.test(phone);
}

// Hide all error messages
function hideErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Show error for specific field
function showError(fieldId, messageId) {
    document.getElementById(fieldId).classList.add('error');
    document.getElementById(messageId).style.display = 'block';
}

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    hideErrors();
    
    const name = document.getElementById('registerName').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    let isValid = true;
    
    if (!name) {
        showError('registerName', 'registerNameError');
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        showError('registerPhone', 'registerPhoneError');
        isValid = false;
    }
    
    if (email && !validateEmail(email)) {
        showError('registerEmail', 'registerEmailError');
        isValid = false;
    }
    
    if (password.length < 6) {
        showError('registerPassword', 'registerPasswordError');
        isValid = false;
    }
    
    if (password !== confirm) {
        showError('registerConfirm', 'registerConfirmError');
        isValid = false;
    }
    
    if (isValid) {
        // Save user to localStorage (simulating database)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        const userExists = users.find(user => user.phone === phone || (email && user.email === email));
        if (userExists) {
            alert('User with this phone or email already exists!');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            phone,
            email: email || '',
            password, // In a real app, this would be hashed
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login after registration
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Show success message and redirect to dashboard
        showDashboard();
        document.getElementById('userGreeting').textContent = `Hello, ${name.split(' ')[0]}!`;
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    hideErrors();
    
    const loginValue = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    let isValid = true;
    
    if (!loginValue) {
        showError('loginEmail', 'loginEmailError');
        isValid = false;
    }
    
    if (!password) {
        showError('loginPassword', 'loginPasswordError');
        isValid = false;
    }
    
    if (isValid) {
        // Check credentials against stored users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => 
            (u.phone === loginValue || u.email === loginValue) && 
            u.password === password
        );
        
        if (user) {
            // Login successful
            localStorage.setItem('currentUser', JSON.stringify(user));
            showDashboard();
            document.getElementById('userGreeting').textContent = `Hello, ${user.name.split(' ')[0]}!`;
        } else {
            alert('Invalid login credentials. Please try again.');
        }
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    showLogin();
});

// Navigation between auth pages
document.getElementById('goToRegister').addEventListener('click', function(e) {
    e.preventDefault();
    showRegister();
});

document.getElementById('goToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    showLogin();
});

// Check auth status on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Check authentication status
    checkAuthStatus();
});