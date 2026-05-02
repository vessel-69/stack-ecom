// ============================================
// STACK - main.js  (tit.html only)
// filterProducts + toggleWishlist
// cart and auth handled by auth.js
// ============================================


// FUNCTION 2: filterProducts - live search
function filterProducts() {
    var searchInput = document.getElementById('searchBar');
    var searchText  = searchInput ? searchInput.value.toLowerCase() : '';
    var allProducts = document.querySelectorAll('.product');
    var visible     = 0;

    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];
        var name = card.getAttribute('data-name');
        if (name && name.includes(searchText)) {
            card.style.display = 'flex';
            visible += 1;
        } else {
            card.style.display = 'none';
        }
    }

    var noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}


// FUNCTION 3: toggleWishlist
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
