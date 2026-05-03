function sortProducts(cat, btn) {
    var cards = document.querySelectorAll('.product');
    for (var i = 0; i < cards.length; i++) {
        var c = cards[i].getAttribute('data-category');
        cards[i].style.display = (cat === 'all' || c === cat) ? 'block' : 'none';
    }

    var btns = document.querySelectorAll('.filter-btn');
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
    btn.classList.add('active');

    var labels = {
        all:     'All Products',
        fitness: 'Fitness Gear',
        tech:    'Tech and Components',
        sports:  'Sports',
        coming:  'Coming Soon'
    };
    var title = document.querySelector('.section-title');
    if (title) title.textContent = labels[cat] || 'All Products';
}

function filterProducts() {
    var q    = document.getElementById('searchBar');
    var text = q ? q.value.toLowerCase() : '';
    var cards = document.querySelectorAll('.product');
    var vis = 0;
    for (var i = 0; i < cards.length; i++) {
        var name = cards[i].getAttribute('data-name') || '';
        if (name.includes(text)) {
            cards[i].style.display = 'block';
            vis++;
        } else {
            cards[i].style.display = 'none';
        }
    }
    var msg = document.getElementById('noResults');
    if (msg) msg.style.display = vis === 0 ? 'block' : 'none';
}

function toggleDetails(id, btn) {
    var panel = document.getElementById(id);
    if (!panel) return;
    var open = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    btn.textContent     = open ? '+ See Details' : '- Hide Details';
    btn.style.color     = open ? '' : '#00c8ff';
}

function validateNewsletter() {
    var field = document.getElementById('emailInput');
    var msg   = document.getElementById('newsletterMsg');
    if (!field || !msg) return;
    var val = field.value.trim();
    if (!val || !val.includes('@')) {
        msg.textContent = 'Enter a valid email';
        msg.className   = 'newsletter-msg error';
        return;
    }
    msg.textContent = 'Subscribed - good stuff incoming';
    msg.className   = 'newsletter-msg success';
    field.value     = '';
    setTimeout(function() { msg.textContent = ''; msg.className = 'newsletter-msg'; }, 4000);
}

function toggleWishlist(btn) {
    if (btn.classList.contains('saved')) {
        btn.classList.remove('saved');
        btn.textContent = '\u2661';
    } else {
        btn.classList.add('saved');
        btn.textContent = '\u2665';
        btn.style.transform = 'scale(1.3)';
        setTimeout(function() { btn.style.transform = ''; }, 200);
    }
}
