// ================================================
// STACK - main.js
// JavaScript for tit.html (page 1)
// 
// Functions:
//   1. addToCart()     - updates cart counter + shows notification
//   2. filterProducts()- live search/filter through products
//   3. toggleWishlist()- toggles the heart icon on product cards
// ================================================


// keep track of how many items in cart
var cartCount = 0;


// ------------------------------------------------
// FUNCTION 1: addToCart
// Reacts to the user clicking "Add to Cart"
// Increments the cart badge and shows a toast
// Uses: if statement, variables, DOM manipulation
// ------------------------------------------------
function addToCart(productName) {

    // add one to the cart
    cartCount = cartCount + 1;

    // grab the badge element and update the number
    var badge = document.getElementById('cartBadge');
    badge.textContent = cartCount;

    // make the badge visible (it starts hidden)
    if (cartCount > 0) {
        badge.classList.add('visible');
    }

    // show toast notification at top right
    showToast('Added to cart: ' + productName);
}


// helper function for the toast popup
function showToast(message) {
    var toast = document.getElementById('toastMsg');
    toast.textContent = '✓ ' + message;
    toast.classList.add('show');

    // hide it after 2.5 seconds
    setTimeout(function() {
        toast.classList.remove('show');
    }, 2500);
}


// ------------------------------------------------
// FUNCTION 2: filterProducts
// Called every time user types in the search bar
// Hides product cards that don't match the search
// Uses: event input (onkeyup), loop, if statement, DOM
// ------------------------------------------------
function filterProducts() {

    // get what the user typed, make it lowercase for easier comparing
    var searchInput = document.getElementById('searchBar');
    var searchText = searchInput.value.toLowerCase();

    // get all the product cards
    var allProducts = document.querySelectorAll('.product');

    var visibleCount = 0;

    // loop through every product card
    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];

        // each card has a data-name attribute with the product keywords
        var productName = card.getAttribute('data-name');

        // check if the product name contains the search text
        if (productName.includes(searchText)) {
            card.style.display = 'block';
            visibleCount = visibleCount + 1;
        } else {
            card.style.display = 'none';
        }
    }

    // if nothing matched, show the "no results" message
    var noResultsMsg = document.getElementById('noResults');

    if (visibleCount === 0) {
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
}


// ------------------------------------------------
// FUNCTION 3: toggleWishlist
// Changes the heart icon when you click it
// Toggles between ♡ (empty) and ♥ (filled red)
// Uses: if statement, classList, changing styles
// ------------------------------------------------
function toggleWishlist(button) {

    // check if it's already wishlisted
    if (button.classList.contains('wishlisted')) {
        // remove from wishlist
        button.classList.remove('wishlisted');
        button.textContent = '♡';
        button.title = 'Add to wishlist';
    } else {
        // add to wishlist
        button.classList.add('wishlisted');
        button.textContent = '♥';
        button.title = 'Remove from wishlist';

        // small bounce effect when you add it
        button.style.transform = 'scale(1.3)';

        // reset after a bit using setTimeout
        setTimeout(function() {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}


// run this once the page loads
// just adds the smooth transform transition to wishlist buttons
document.addEventListener('DOMContentLoaded', function() {
    var wishlistBtns = document.querySelectorAll('.wishlist-btn');

    for (var i = 0; i < wishlistBtns.length; i++) {
        wishlistBtns[i].style.transition = 'transform 0.2s, color 0.2s, border-color 0.2s, background 0.2s';
    }
});
