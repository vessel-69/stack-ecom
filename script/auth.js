// ============================================
// STACK - auth.js
// handles cart panel, profile state, sign out
// included on tit.html and page2.html
// ============================================


// -----------------------------------------------
// CART HELPERS  (localStorage)
// -----------------------------------------------

function getCart() {
    var raw = localStorage.getItem('stackCart');
    if (!raw) return [];
    try { return JSON.parse(raw); } catch(e) { return []; }
}

function saveCart(items) {
    localStorage.setItem('stackCart', JSON.stringify(items));
}

function getCartCount() {
    return getCart().reduce(function(sum, item) { return sum + item.qty; }, 0);
}

function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    var cpCount = document.getElementById('cpCount');
    var cpItemCount = document.getElementById('cpItemCount');
    var count = getCartCount();

    if (badge) {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }
    }
    if (cpCount) cpCount.textContent = count;
    if (cpItemCount) cpItemCount.textContent = count;
}


// -----------------------------------------------
// CART PANEL - open / close
// -----------------------------------------------

function openCart() {
    var panel   = document.getElementById('cartPanel');
    var overlay = document.getElementById('cartOverlay');
    if (!panel) return;
    renderCartPanel();
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    var panel   = document.getElementById('cartPanel');
    var overlay = document.getElementById('cartOverlay');
    if (!panel) return;
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function renderCartPanel() {
    var cart    = getCart();
    var list    = document.getElementById('cpList');
    var empty   = document.getElementById('cpEmpty');
    var footer  = document.getElementById('cpFooter');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML  = '';
        if (empty)  empty.style.display  = 'block';
        if (footer) footer.classList.remove('visible');
        return;
    }

    if (empty)  empty.style.display  = 'none';
    if (footer) footer.classList.add('visible');

    var html = '';
    cart.forEach(function(item, i) {
        html +=
            '<li class="cp-item">' +
                '<div class="cp-item-info">' +
                    '<span class="cp-item-name">' + item.name + '</span>' +
                    '<span class="cp-item-tag">FREE</span>' +
                '</div>' +
                '<div class="cp-item-controls">' +
                    '<button class="cp-qty-btn" onclick="decreaseQty(' + i + ')">-</button>' +
                    '<span class="cp-qty">' + item.qty + '</span>' +
                    '<button class="cp-qty-btn" onclick="increaseQty(' + i + ')">+</button>' +
                    '<button class="cp-remove-btn" onclick="removeFromCart(' + i + ')">Remove</button>' +
                '</div>' +
            '</li>';
    });
    list.innerHTML = html;
    updateCartBadge();
}


// -----------------------------------------------
// CART ACTIONS - add / remove / qty
// -----------------------------------------------

function addToCart(productName) {
    var cart     = getCart();
    var existing = cart.find(function(item) { return item.name === productName; });
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, qty: 1 });
    }
    saveCart(cart);
    updateCartBadge();

    // show toast
    var toast = document.getElementById('toastMsg');
    if (toast) {
        toast.textContent = 'Added to cart: ' + productName;
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 2500);
    }
}

function removeFromCart(index) {
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartPanel();
}

function increaseQty(index) {
    var cart = getCart();
    if (!cart[index]) return;
    cart[index].qty += 1;
    saveCart(cart);
    renderCartPanel();
}

function decreaseQty(index) {
    var cart = getCart();
    if (!cart[index]) return;
    if (cart[index].qty <= 1) {
        removeFromCart(index);
        return;
    }
    cart[index].qty -= 1;
    saveCart(cart);
    renderCartPanel();
}

function clearCart() {
    saveCart([]);
    renderCartPanel();
    updateCartBadge();
}

function checkoutClick() {
    var currentUser = localStorage.getItem('stackCurrentUser');
    if (!currentUser) {
        closeCart();
        // redirect to login - works from both root and pages/
        var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
        window.location.href = isInPages ? 'login,signup.html' : 'pages/login,signup.html';
        return;
    }
    var count = getCartCount();
    if (count === 0) return;
    // demo checkout - show toast
    var toast = document.getElementById('toastMsg');
    if (toast) {
        toast.textContent = 'Checkout coming soon fr';
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 3000);
    }
}


// -----------------------------------------------
// PROFILE DROPDOWN
// -----------------------------------------------

function toggleProfileDropdown() {
    var drop = document.getElementById('profileDropdown');
    if (!drop) return;
    drop.classList.toggle('open');
}

// close dropdown when clicking outside
document.addEventListener('click', function(e) {
    var area = document.getElementById('profileArea');
    var drop = document.getElementById('profileDropdown');
    if (!area || !drop) return;
    if (!area.contains(e.target)) {
        drop.classList.remove('open');
    }
});

function logout() {
    localStorage.removeItem('stackCurrentUser');
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    window.location.href = isInPages ? 'login,signup.html' : 'pages/login,signup.html';
}


// -----------------------------------------------
// AUTH STATE - init on page load
// shows profile icon if logged in, LOGIN btn if not
// -----------------------------------------------

function initAuthState() {
    var currentUser = localStorage.getItem('stackCurrentUser');
    var loginBtn    = document.getElementById('loginBtn');
    var profileArea = document.getElementById('profileArea');
    var pdName      = document.getElementById('pdName');
    var profileUser = document.getElementById('profileUsername');

    if (currentUser) {
        // hide login button, show profile area
        if (loginBtn)    loginBtn.style.display = 'none';
        if (profileArea) profileArea.style.display = 'flex';
        if (pdName)      pdName.textContent = currentUser;
        if (profileUser) profileUser.textContent = currentUser.charAt(0).toUpperCase();
    } else {
        // show login button, hide profile
        if (loginBtn)    loginBtn.style.display = 'inline-flex';
        if (profileArea) profileArea.style.display = 'none';
    }

    updateCartBadge();
}


// -----------------------------------------------
// RUN on every page load
// -----------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    initAuthState();
});
