function getCart() {
    try {
        return JSON.parse(localStorage.getItem('stackCart') || '[]');
    } catch(e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('stackCart', JSON.stringify(cart));
}

function refreshBadge() {
    var cart  = getCart();
    var total = 0;
    for (var i = 0; i < cart.length; i++) total += (cart[i].qty || 0);

    var badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = total;
        if (total > 0) badge.classList.add('visible');
        else badge.classList.remove('visible');
    }

    var cpCount = document.getElementById('cpCount');
    if (cpCount) cpCount.textContent = total;

    var cpItemCount = document.getElementById('cpItemCount');
    if (cpItemCount) cpItemCount.textContent = total;
}

function openCart() {
    var panel = document.getElementById('cartPanel');
    if (!panel) return;

    buildCartList();

    panel.style.right      = '0';
    panel.style.visibility = 'visible';
    panel.style.boxShadow  = '-6px 0 32px rgba(0,0,0,0.55)';

    var overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.style.opacity      = '1';
        overlay.style.pointerEvents = 'all';
    }
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    var panel = document.getElementById('cartPanel');
    if (!panel) return;

    panel.style.right      = '-420px';
    panel.style.visibility = 'hidden';
    panel.style.boxShadow  = 'none';

    var overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.style.opacity      = '0';
        overlay.style.pointerEvents = 'none';
    }
    document.body.style.overflow = '';
}

function buildCartList() {
    var cart   = getCart();
    var list   = document.getElementById('cpList');
    var empty  = document.getElementById('cpEmpty');
    var footer = document.getElementById('cpFooter');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '';
        if (empty)  empty.style.display  = 'block';
        if (footer) footer.style.display = 'none';
        refreshBadge();
        return;
    }

    if (empty)  empty.style.display  = 'none';
    if (footer) footer.style.display = 'flex';

    var html = '';
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var imgTag = item.img
            ? '<img class="cp-item-img" src="' + item.img + '" alt="" onerror="this.outerHTML=\'<div class=cp-item-img></div>\'">'
            : '<div class="cp-item-img"></div>';

        html += '<li class="cp-item">' +
            imgTag +
            '<div class="cp-item-info">' +
                '<span class="cp-item-name">' + item.name + '</span>' +
                '<span class="cp-item-price">FREE</span>' +
            '</div>' +
            '<div class="cp-qty-wrap">' +
                '<button class="cp-qty-btn" onclick="adjustQty(' + i + ', -1)">&#8722;</button>' +
                '<span class="cp-qty-num">' + item.qty + '</span>' +
                '<button class="cp-qty-btn" onclick="adjustQty(' + i + ', 1)">&#43;</button>' +
            '</div>' +
            '<button class="cp-remove-btn" onclick="removeItem(' + i + ')">&#x2715;</button>' +
        '</li>';
    }
    list.innerHTML = html;
    refreshBadge();
}

function addToCart(name, btn) {
    var img = '';
    if (btn) {
        var card  = btn.closest ? btn.closest('.product') : null;
        var imgEl = card ? card.querySelector('img') : null;
        if (imgEl) img = imgEl.src;
    }

    var cart = getCart();
    var found = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) { found = cart[i]; break; }
    }

    if (found) {
        found.qty += 1;
    } else {
        cart.push({ name: name, qty: 1, img: img });
    }

    saveCart(cart);
    refreshBadge();

    var panel = document.getElementById('cartPanel');
    if (panel && panel.style.right === '0px') buildCartList();

    showToast('Added: ' + name);
}

function removeItem(idx) {
    var cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    buildCartList();
}

function adjustQty(idx, delta) {
    var cart = getCart();
    if (!cart[idx]) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart(cart);
    buildCartList();
}

function clearCart() {
    saveCart([]);
    buildCartList();
}

function checkoutClick() {
    var user = localStorage.getItem('stackCurrentUser');
    if (!user) {
        closeCart();
        var inSubdir = window.location.pathname.indexOf('/pages/') !== -1;
        window.location.href = inSubdir ? 'login,signup.html' : 'pages/login,signup.html';
        return;
    }
    showToast('Checkout coming soon');
}

function showToast(msg) {
    var toast = document.getElementById('toastMsg');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._tid);
    toast._tid = setTimeout(function() { toast.classList.remove('show'); }, 2300);
}

function toggleProfileDropdown() {
    var drop = document.getElementById('profileDropdown');
    if (drop) drop.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    var area = document.getElementById('profileArea');
    var drop = document.getElementById('profileDropdown');
    if (area && drop && !area.contains(e.target)) drop.classList.remove('open');
});

function logout() {
    localStorage.removeItem('stackCurrentUser');
    var inSubdir = window.location.pathname.indexOf('/pages/') !== -1;
    window.location.href = inSubdir ? 'login,signup.html' : 'pages/login,signup.html';
}

function initAuth() {
    var user = localStorage.getItem('stackCurrentUser');
    var loginBtn    = document.getElementById('loginBtn');
    var profileArea = document.getElementById('profileArea');
    var pdName      = document.getElementById('pdName');
    var avatar      = document.getElementById('profileAvatar');

    if (user) {
        if (loginBtn)    loginBtn.style.display    = 'none';
        if (profileArea) profileArea.style.display = 'flex';
        if (pdName)      pdName.textContent        = user;
        if (avatar)      avatar.textContent        = user.charAt(0).toUpperCase();
    } else {
        if (loginBtn)    loginBtn.style.display    = 'inline-flex';
        if (profileArea) profileArea.style.display = 'none';
    }

    refreshBadge();
}

function lockCartPanel() {
    var panel = document.getElementById('cartPanel');
    if (!panel) return;
    panel.style.cssText = 'position:fixed;top:0;right:-420px;width:380px;max-width:95vw;height:100%;background:#0f0f0f;border-left:1px solid #1e1e1e;z-index:9999;display:flex;flex-direction:column;transition:right .3s ease,box-shadow .3s ease;visibility:hidden';
    var overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9998;opacity:0;pointer-events:none;transition:opacity .3s';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    lockCartPanel();
    initAuth();
});
