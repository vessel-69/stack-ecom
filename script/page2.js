// ================================================
// STACK - page2.js
// JavaScript for page2.html
//
// Functions:
//   1. toggleDetails()       - shows/hides product detail panels
//   2. validateNewsletter()  - checks email before subscribing
//   3. sortProducts()        - filters products by category
//
// Also includes addToCart and toggleWishlist
// (same as page 1, needed on both pages)
// ================================================


var cartCount = 0;


// ------------------------------------------------
// addToCart - same as page 1
// updating cart badge + toast
// ------------------------------------------------
function addToCart(productName) {
    cartCount = cartCount + 1;

    var badge = document.getElementById('cartBadge');
    badge.textContent = cartCount;

    if (cartCount > 0) {
        badge.classList.add('visible');
    }

    showToast('Added: ' + productName);
}

function showToast(message) {
    var toast = document.getElementById('toastMsg');
    toast.textContent = '✓ ' + message;
    toast.classList.add('show');

    setTimeout(function() {
        toast.classList.remove('show');
    }, 2500);
}


// ------------------------------------------------
// toggleWishlist - same as page 1
// ------------------------------------------------
function toggleWishlist(button) {
    if (button.classList.contains('wishlisted')) {
        button.classList.remove('wishlisted');
        button.textContent = '♡';
        button.title = 'Add to wishlist';
    } else {
        button.classList.add('wishlisted');
        button.textContent = '♥';
        button.title = 'Remove from wishlist';

        button.style.transform = 'scale(1.3)';
        setTimeout(function() {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}


// ------------------------------------------------
// FUNCTION 1: toggleDetails
// When you click "See Details" on a product,
// it shows a hidden panel with extra product info
// Changes something on the page (shows/hides element)
// Uses: if statement, DOM manipulation, style changes
// ------------------------------------------------
function toggleDetails(panelId, button) {

    var panel = document.getElementById(panelId);

    // check if the panel is currently hidden
    if (panel.style.display === 'none' || panel.style.display === '') {
        // show it
        panel.style.display = 'block';
        button.textContent = '− Hide Details';
        button.style.color = '#00c8ff';
    } else {
        // hide it again
        panel.style.display = 'none';
        button.textContent = '+ See Details';
        button.style.color = '';
    }
}


// ------------------------------------------------
// FUNCTION 2: validateNewsletter
// Runs when user clicks Subscribe button
// Checks if the email looks valid before doing anything
// Uses: if statement, string methods, DOM update
// ------------------------------------------------
function validateNewsletter() {

    var emailField = document.getElementById('emailInput');
    var messageBox = document.getElementById('newsletterMsg');

    var emailValue = emailField.value.trim();

    // check if it's empty
    if (emailValue === '') {
        messageBox.textContent = 'Please enter your email first.';
        messageBox.className = 'newsletter-msg error';
        return; // stop here
    }

    // basic check: does it have @ and a dot somewhere after it?
    var hasAt = emailValue.includes('@');
    var hasDot = emailValue.indexOf('.', emailValue.indexOf('@')) > -1;

    if (hasAt === false || hasDot === false) {
        messageBox.textContent = 'That doesn\'t look like a valid email.';
        messageBox.className = 'newsletter-msg error';
        return;
    }

    // if we get here, the email looks fine
    messageBox.textContent = 'You\'re subscribed! 🎉 Expect good stuff in your inbox.';
    messageBox.className = 'newsletter-msg success';

    // clear the input field
    emailField.value = '';

    // hide the message after a few seconds
    setTimeout(function() {
        messageBox.textContent = '';
        messageBox.className = 'newsletter-msg';
    }, 5000);
}


// ------------------------------------------------
// FUNCTION 3: sortProducts
// Filter/sort the product grid by category
// Attached to the filter buttons at the top
// Uses: event listener (onclick), if statements,
//       loop, DOM manipulation
// ------------------------------------------------
function sortProducts(category, clickedButton) {

    // get all products
    var allProducts = document.querySelectorAll('.product');

    // loop through each one
    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];
        var cardCategory = card.getAttribute('data-category');

        // show all if "all" is selected, otherwise match category
        if (category === 'all') {
            card.style.display = 'block';
        } else if (cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }

    // update which filter button looks "active"
    // first remove active from all buttons
    var allFilterBtns = document.querySelectorAll('.filter-btn');
    for (var j = 0; j < allFilterBtns.length; j++) {
        allFilterBtns[j].classList.remove('active');
    }

    // add active to the one that was clicked
    clickedButton.classList.add('active');

    // also update the section title to match
    var titleEl = document.querySelector('.section-title');

    if (category === 'all') {
        titleEl.textContent = 'All Products';
    } else if (category === 'fitness') {
        titleEl.textContent = '💪 Fitness Gear';
    } else if (category === 'tech') {
        titleEl.textContent = '⚙️ Tech & Components';
    } else if (category === 'sports') {
        titleEl.textContent = '⚽ Sports';
    } else if (category === 'coming') {
        titleEl.textContent = '👀 Coming Soon';
    }
}


// filterProducts - for search bar (same as page 1)
function filterProducts() {
    var searchInput = document.getElementById('searchBar');
    var searchText = searchInput.value.toLowerCase();
    var allProducts = document.querySelectorAll('.product');
    var visibleCount = 0;

    for (var i = 0; i < allProducts.length; i++) {
        var card = allProducts[i];
        var productName = card.getAttribute('data-name');

        if (productName.includes(searchText)) {
            card.style.display = 'block';
            visibleCount = visibleCount + 1;
        } else {
            card.style.display = 'none';
        }
    }

    var noResultsMsg = document.getElementById('noResults');
    if (visibleCount === 0) {
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
}


// add transition to wishlist buttons on load
document.addEventListener('DOMContentLoaded', function() {
    var wishlistBtns = document.querySelectorAll('.wishlist-btn');
    for (var i = 0; i < wishlistBtns.length; i++) {
        wishlistBtns[i].style.transition = 'transform 0.2s, color 0.2s, border-color 0.2s, background 0.2s';
    }
});
