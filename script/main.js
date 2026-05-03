function filterProducts() {
    var q    = document.getElementById('searchBar');
    var text = q ? q.value.toLowerCase() : '';
    var cards = document.querySelectorAll('.product');
    var visible = 0;

    for (var i = 0; i < cards.length; i++) {
        var name = cards[i].getAttribute('data-name') || '';
        if (name.includes(text)) {
            cards[i].style.display = 'flex';
            visible++;
        } else {
            cards[i].style.display = 'none';
        }
    }

    var msg = document.getElementById('noResults');
    if (msg) msg.style.display = visible === 0 ? 'block' : 'none';
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

function toggleDetails(id, btn) {
    var panel = document.getElementById(id);
    if (!panel) return;
    var open = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    btn.textContent     = open ? '+ See Details' : '- Hide Details';
    btn.style.color     = open ? '' : '#00c8ff';
}
