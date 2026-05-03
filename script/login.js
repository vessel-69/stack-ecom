

$(document).ready(function() {

    
    
    
    
    
    $('.switch-link').click(function(e) {
        e.preventDefault();

        var loginForm    = $('#loginForm');
        var registerForm = $('#registerForm');

        if (loginForm.is(':visible')) {
            loginForm.hide();
            registerForm.show();
        } else {
            registerForm.hide();
            loginForm.show();
        }

        
        $('#regErr').text('');
        $('#logErr').text('');
    });

    
    
    
    
    $('#createBtn').click(function(e) {
        e.preventDefault();

        var name  = $('#regName').val().trim();
        var user  = $('#regUser').val().trim();
        var email = $('#regEmail').val().trim();
        var pass  = $('#regPass').val();
        var err   = $('#regErr');

        err.text('');

        if (name === '' || user === '' || email === '' || pass === '') {
            err.text('Fill in all the fields');
            return;
        }

        if (!email.includes('@') || email.indexOf('.', email.indexOf('@')) < 0) {
            err.text('That email does not look right');
            return;
        }

        if (pass.length < 8) {
            err.text('Password needs at least 8 characters');
            return;
        }

        var users = getUsers();

        var usernameTaken = users.find(function(u) {
            return u.username.toLowerCase() === user.toLowerCase();
        });

        if (usernameTaken) {
            err.text('That username is already taken, try another one');
            return;
        }

        var emailTaken = users.find(function(u) {
            return u.email.toLowerCase() === email.toLowerCase();
        });

        if (emailTaken) {
            err.text('An account with that email already exists');
            return;
        }

        users.push({
            name:     name,
            username: user,
            email:    email,
            password: pass
        });

        saveUsers(users);
        localStorage.setItem('stackCurrentUser', user);

        window.location.href = 'create.html';
    });

    
    
    
    $('#signinBtn').click(function(e) {
        e.preventDefault();

        var identifier = $('#logUser').val().trim();
        var pass       = $('#logPass').val();
        var err        = $('#logErr');

        err.text('');

        if (identifier === '' || pass === '') {
            err.text('Enter your username and password');
            return;
        }

        var users = getUsers();

        var match = users.find(function(u) {
            return (
                u.username.toLowerCase() === identifier.toLowerCase() ||
                u.email.toLowerCase()    === identifier.toLowerCase()
            ) && u.password === pass;
        });

        if (!match) {
            err.text('Wrong username or password, try again');
            return;
        }

        localStorage.setItem('stackCurrentUser', match.username);

        window.location.href = '../tit.html';
    });

});

function getUsers() {
    var raw = localStorage.getItem('stackUsers');
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('stackUsers', JSON.stringify(users));
}
