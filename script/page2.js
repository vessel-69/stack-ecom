// ============================================
// STACK - page2.js (page2.html only)
// filterProducts, toggleWishlist, toggleDetails,
// validateNewsletter, sortProducts
// cart + auth handled by auth.js
// ============================================


// FUNCTION 1: toggleDetails - reveal/hide spec panels
function toggleDetails(panelId, button) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        button.textContent  = '- Hide Details';
        button.style.color  = '#00c8ff';
    } else {
        panel.style.display = 'none';
        button.textContent  = '+ See Details';
        button.style.color  = '';
    }
}


// FUNCTION 2: validateNewsletter
function validateNewsletter() {
    var emailField = document.getElementById('emailInput');
    var messageBox = document.getElementById('newsletterMsg');
    if (!emailField || !messageBox) return;
    var val = emailField.value.trim();

    if (!val) {
        messageBox.textContent = 'Enter your email first';
        messageBox.className   = 'newsletter-msg error';
        return;
    }
    if (!val.includes('@') || val.indexOf('.', val.indexOf('@')) < 0) {
        messageBox.textContent = 'That does not look like a valid email';
        messageBox.className   = 'newsletter-msg error';
        return;
    }

    messageBox.textContent = 'Subscribed - expect good stuff in your inbox';
    messageBox.className   = 'newsletter-msg success';
    emailField.value       = '';
    setTimeout(function() {
        messageBox.textContent = '';
        messageBox.className   = 'newsletter-msg';
    }, 5000);
}


// FUNCTION 3: sortProducts - category filter buttons
function sortProducts(category, clickedButton) {
    var allProducts = document.querySelectorAll('.product');
    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];
        var cat  = card.getAttribute('data-category');
        card.style.display = (category === 'all' || cat === category) ? 'block' : 'none';
    }

    var allBtns = document.querySelectorAll('.filter-btn');
    for (var j = 0; j < allBtns.length; j++) allBtns[j].classList.remove('active');
    clickedButton.classList.add('active');

    var labels = { all: 'All Products', fitness: 'Fitness Gear', tech: 'Tech and Components', sports: 'Sports', coming: 'Coming Soon' };
    var title  = document.querySelector('.section-title');
    if (title) title.textContent = labels[category] || 'All Products';
}

function filterProducts() {
    var searchInput = document.getElementById('searchBar');
    var searchText  = searchInput ? searchInput.value.toLowerCase() : '';
    var allProducts = document.querySelectorAll('.product');
    var visible     = 0;

    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];
        var name = card.getAttribute('data-name');
        if (name && name.includes(searchText)) {
            card.style.display = 'block';
            visible += 1;
        } else {
            card.style.display = 'none';
        }
    }

    var noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

function toggleWishlist(button) {
    if (button.classList.contains('wishlisted')) {
        button.classList.remove('wishlisted');
        button.textContent = '\u2661';
    } else {
        button.classList.add('wishlisted');
        button.textContent = '\u2665';
        button.style.transform = 'scale(1.3)';
        setTimeout(function() { button.style.transform = 'scale(1)'; }, 200);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var btns = document.querySelectorAll('.wishlist-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.transition = 'transform 0.2s, color 0.2s, border-color 0.2s';
    }
});
