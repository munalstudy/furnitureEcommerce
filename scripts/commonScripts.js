document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../pages/header.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('header-placeholder').innerHTML = xhr.responseText;

            // After loading the header, check the authentication status and update UI
            checkAuthStatus();
            setActiveLink();
            onLoadCartNumbers();
        }
    };
    xhr.send();
});

function checkAuthStatus() {
    var userData = localStorage.getItem('loggedInUser');
    var isAuthenticated = false;
    var userFullName = '';

    if (userData) {
        try {
            var user = JSON.parse(userData);
            isAuthenticated = true;
            userFullName = user.fullName || 'User';
        } catch (error) {
            console.error('Error parsing user data from local storage:', error);
        }
    }

    var loginTrue = document.getElementById('loginTrue');
    var loginFalse = document.getElementById('loginFalse');
    var greeting = document.getElementById('greeting');
    var signOut = document.getElementById('signOut');

    if (isAuthenticated) {
        if (loginTrue) loginTrue.style.display = 'block';
        if (loginFalse) loginFalse.style.display = 'none';
        if (greeting) greeting.innerText = `Hello, ${userFullName}`;
    } else {
        if (loginTrue) loginTrue.style.display = 'none';
        if (loginFalse) loginFalse.style.display = 'block';
    }

    if (signOut) {
        signOut.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = "../index.html";
        });
    }
}

function setActiveLink() {
    // Get the current page URL
    var currentPage = window.location.pathname.split("/").pop();

    // Select all navigation links
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Loop through all nav links and set the active class
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href').split("/").pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function onLoadCartNumbers() {
    updateCartDisplay();
}

function updateCartDisplay() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        let cartNumberElement = document.querySelector('.cartGroup span');
        if (cartNumberElement) {
            cartNumberElement.textContent = productNumbers;
        } else {
            console.error('Cart number element not found.');
        }
    }
}
