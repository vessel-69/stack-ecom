// ============================================
// STACK - auth.js
// cart panel + profile/auth state
// runs on tit.html and page2.html
// ============================================


// ─── CART HELPERS ────────────────────────────────────────────────────────

function getCart() {
    try { return JSON.parse(localStorage.getItem('stackCart') || '[]'); }
    catch(e) { return []; }
}

function saveCart(items) {
    localStorage.setItem('stackCart', JSON.stringify(items));
}

function getCartCount() {
    return getCart().reduce(function(n, item) { return n + item.qty; }, 0);
}

function updateCartBadge() {
    var count  = getCartCount();
    var badge  = document.getElementById('cartBadge');
    var cpHead = document.getElementById('cpCount');
    var cpFoot = document.getElementById('cpItemCount');

    if (badge) {
        badge.textContent = count;
        count > 0 ? badge.classList.add('visible') : badge.classList.remove('visible');
    }
    if (cpHead) cpHead.textContent = count;
    if (cpFoot) cpFoot.textContent = count;
}


// ─── CART PANEL OPEN / CLOSE ─────────────────────────────────────────────

function openCart() {
    renderCartPanel();
    var panel   = document.getElementById('cartPanel');
    var overlay = document.getElementById('cartOverlay');
    if (!panel) return;
    panel.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    var panel   = document.getElementById('cartPanel');
    var overlay = document.getElementById('cartOverlay');
    if (!panel) return;
    panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}


// ─── RENDER CART ITEMS ───────────────────────────────────────────────────

function renderCartPanel() {
    var cart    = getCart();
    var list    = document.getElementById('cpList');
    var empty   = document.getElementById('cpEmpty');
    var footer  = document.getElementById('cpFooter');
    if (!list) return;

    updateCartBadge();

    if (cart.length === 0) {
        list.innerHTML = '';
        if (empty)  empty.style.display = 'block';
        if (footer) footer.classList.remove('visible');
        return;
    }

    if (empty)  empty.style.display = 'none';
    if (footer) footer.classList.add('visible');

    list.innerHTML = cart.map(function(item, i) {
        var imgMarkup = item.img
            ? '<img class="cp-item-img" src="' + item.img + '" alt="' + item.name + '" onerror="this.style.display=\'none\'">'
            : '<div class="cp-item-img cp-no-img"></div>';

        return '<li class="cp-item">' +
            imgMarkup +
            '<div class="cp-item-info">' +
                '<span class="cp-item-name">' + item.name + '</span>' +
                '<span class="cp-item-price">FREE</span>' +
            '</div>' +
            '<div class="cp-qty-wrap">' +
                '<button class="cp-qty-btn cp-dec" onclick="changeQty(' + i + ',-1)">&#8722;</button>' +
                '<span class="cp-qty-num">' + item.qty + '</span>' +
                '<button class="cp-qty-btn cp-inc" onclick="changeQty(' + i + ',1)">&#43;</button>' +
            '</div>' +
            '<button class="cp-remove-btn" onclick="removeFromCart(' + i + ')" title="Remove item">&#x2715;</button>' +
        '</li>';
    }).join('');
}


// ─── CART MUTATIONS ───────────────────────────────────────────────────────

function addToCart(productName, btnEl) {
    // grab image from the product card that contains this button
    var card  = btnEl.closest ? btnEl.closest('.product') : null;
    var imgEl = card ? card.querySelector('.product-img-wrap img') : null;
    var img   = imgEl ? imgEl.src : '';

    var cart     = getCart();
    var existing = cart.find(function(it) { return it.name === productName; });
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, qty: 1, img: img });
    }
    saveCart(cart);
    updateCartBadge();

    // toast
    var toast = document.getElementById('toastMsg');
    if (toast) {
        toast.textContent = 'Added: ' + productName;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 2400);
    }
}

function removeFromCart(i) {
    var cart = getCart();
    cart.splice(i, 1);
    saveCart(cart);
    renderCartPanel();
}

function changeQty(i, delta) {
    var cart = getCart();
    if (!cart[i]) return;
    cart[i].qty += delta;
    if (cart[i].qty < 1) {
        cart.splice(i, 1);
    }
    saveCart(cart);
    renderCartPanel();
}

// kept for backwards compatibility
function increaseQty(i) { changeQty(i, 1); }
function decreaseQty(i) { changeQty(i, -1); }

function clearCart() {
    saveCart([]);
    renderCartPanel();
    updateCartBadge();
}

function checkoutClick() {
    if (!localStorage.getItem('stackCurrentUser')) {
        closeCart();
        var inPages = window.location.pathname.indexOf('/pages/') !== -1;
        window.location.href = inPages ? 'login,signup.html' : 'pages/login,signup.html';
        return;
    }
    if (getCartCount() === 0) return;
    var toast = document.getElementById('toastMsg');
    if (toast) {
        toast.textContent = 'Checkout coming soon - we are working on it fr';
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 3000);
    }
}


// ─── PROFILE DROPDOWN ────────────────────────────────────────────────────

function toggleProfileDropdown() {
    var drop = document.getElementById('profileDropdown');
    if (drop) drop.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    var area = document.getElementById('profileArea');
    var drop = document.getElementById('profileDropdown');
    if (area && drop && !area.contains(e.target)) {
        drop.classList.remove('open');
    }
});

function logout() {
    localStorage.removeItem('stackCurrentUser');
    var inPages = window.location.pathname.indexOf('/pages/') !== -1;
    window.location.href = inPages ? 'login,signup.html' : 'pages/login,signup.html';
}


// ─── AUTH STATE INIT ─────────────────────────────────────────────────────

function initAuthState() {
    var user        = localStorage.getItem('stackCurrentUser');
    var loginBtn    = document.getElementById('loginBtn');
    var profileArea = document.getElementById('profileArea');
    var pdName      = document.getElementById('pdName');
    var avatar      = document.getElementById('profileAvatar');

    if (user) {
        if (loginBtn)    loginBtn.style.display    = 'none';
        if (profileArea) profileArea.style.display = 'flex';
        if (pdName)      pdName.textContent         = user;
        if (avatar)      avatar.textContent         = user.charAt(0).toUpperCase();
    } else {
        if (loginBtn)    loginBtn.style.display    = 'inline-flex';
        if (profileArea) profileArea.style.display = 'none';
    }

    updateCartBadge();
}


// ─── BOOT ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
    initAuthState();
});
