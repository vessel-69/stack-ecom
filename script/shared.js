// ============================================
// STACK - shared.js
// auth state + cart badge sync
// loaded on every page via tit.html and page2.html
// ============================================


// -----------------------------------------------
// CART HELPERS (localStorage)
// -----------------------------------------------

function getCart() {
    var raw = localStorage.getItem('stackCart');
    if (!raw) return [];
    try { return JSON.parse(raw); } catch(e) { return []; }
}

function getCartCount() {
    return getCart().reduce(function(t, item) { return t + item.qty; }, 0);
}

function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var count = getCartCount();
    badge.textContent = count;
    if (count > 0) badge.classList.add('visible');
    else badge.classList.remove('visible');
}


// -----------------------------------------------
// AUTH STATE - swap LOGIN button for profile icon
// -----------------------------------------------

function checkAuthState() {
    var user     = localStorage.getItem('stackCurrentUser');
    var loginBtn = document.getElementById('loginBtn');
    var profArea = document.getElementById('profileArea');

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profArea) {
            profArea.classList.add('visible');
            var unEl = document.getElementById('profileUsername');
            var dnEl = document.getElementById('pdName');
            if (unEl) unEl.textContent = user;
            if (dnEl) dnEl.textContent = 'Hi, ' + user;
        }
    } else {
        if (loginBtn) loginBtn.style.display = '';
        if (profArea) profArea.classList.remove('visible');
    }
}

function toggleProfileDropdown() {
    var dd = document.getElementById('profileDropdown');
    if (dd) dd.classList.toggle('open');
}

function logout() {
    localStorage.removeItem('stackCurrentUser');
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    window.location.href = isInPages ? '../tit.html' : 'tit.html';
}

// close dropdown on outside click
document.addEventListener('click', function(e) {
    var dd   = document.getElementById('profileDropdown');
    var area = document.getElementById('profileArea');
    if (dd && dd.classList.contains('open')) {
        if (!area || !area.contains(e.target)) dd.classList.remove('open');
    }
});


// -----------------------------------------------
// INIT on load
// -----------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
    updateCartBadge();
});
