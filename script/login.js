// ============================================
// STACK — login.js
// Handles login/register form toggle and validation
//
// Kept the jQuery toggle from the original login,signup.js
// just cleaned it up and added some basic validation
// ============================================


// toggle between login and register forms
// this was in the original file — same concept just cleaner
$('.switch-link').click(function() {
    $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
});


// basic validation before create account
$('#createBtn').click(function(e) {
    e.preventDefault();

    var name  = $('#regName').val().trim();
    var user  = $('#regUser').val().trim();
    var email = $('#regEmail').val().trim();
    var pass  = $('#regPass').val().trim();
    var err   = $('#regErr');

    // check all fields are filled
    if (name === '' || user === '' || email === '' || pass === '') {
        err.text('All fields are required fr');
        return;
    }

    // basic email check
    if (!email.includes('@') || email.indexOf('.', email.indexOf('@')) < 0) {
        err.text('That doesn\'t look like a valid email');
        return;
    }

    // password length
    if (pass.length < 8) {
        err.text('Password needs to be at least 8 characters');
        return;
    }

    // if all good — go to create success page
    err.text('');
    window.location.href = 'create.html';
});
