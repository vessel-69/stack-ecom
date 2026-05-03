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
    window.location.href = 'login,signup.html';
}

document.addEventListener('DOMContentLoaded', initAuth);
