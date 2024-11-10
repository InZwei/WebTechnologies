document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const toggleFormButton = document.getElementById('toggle-form');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    function validateForm(form) {
        let isValid = true;
        const password = form.querySelector('#signup-password').value;
        const email = form.querySelector('#signup-email').value;
        const phone = form.querySelector('#signup-phone').value;

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            alert("Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.");
            isValid = false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        if (!/^8-\d{3}-\d{3}-\d{4}$/.test(phone)) {
            alert("Please enter a valid phone number (format: 8-XXX-XXX-XXXX).");
            isValid = false;
        }

        return isValid;
    }

    loginButton.addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (typeof localStorage !== 'undefined') {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('currentUser', username);
                window.location.href = "main.html";
            } else {
                console.error("Incorrect username or password.");
                const loginError = document.createElement('p');
                loginError.textContent = 'Incorrect username or password.';
                loginError.style.color = 'red';
                loginSection.appendChild(loginError); 
            }
        } else {
            console.error("Local Storage is not supported by this browser.");
        }
    });

    signupButton.addEventListener('click', (event) => {
        const signupForm = document.getElementById('auth-form');
        if (!validateForm(signupForm)) {
            event.preventDefault();
            return;
        }

        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;

        if (typeof localStorage !== 'undefined') {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            if (storedUsers.find(user => user.username === username)) {
                alert('Username already exists.');
                return;
            }

            const newUser = { username, password, email, phone };
            storedUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(storedUsers));
            localStorage.setItem('currentUser', username);
            window.location.href = 'profile.html'; 
        } else {
            console.error("Local Storage is not supported.");
        }
    });

    toggleFormButton.addEventListener('click', () => {
        if (loginSection.style.display === 'none') {
            showLogin();
        } else {
            showSignup();
        }
    });

    function updateAuthLinks() {
        const authLink = document.getElementById('auth-link');
        const currentUser = typeof localStorage !== 'undefined' ? localStorage.getItem('currentUser') : null;

        if (currentUser) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', () => {
               if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('currentUser');
                }
                updateAuthLinks();
                window.location.href = "main.html"; 
            });
        } else {
            authLink.textContent = 'Login/Signup';
            authLink.href = 'index.html';
        }
    }

    updateAuthLinks();


    function showLogin() {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
        toggleFormButton.textContent = 'Switch to Signup';
    }

    function showSignup() {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
        toggleFormButton.textContent = 'Switch to Login';
    }

    showLogin();
});