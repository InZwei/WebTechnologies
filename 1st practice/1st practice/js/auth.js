document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const toggleFormButton = document.getElementById('toggle-form');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    loginButton.addEventListener('click', () => { 
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'profile.html';
        } else {
            alert("Incorrect username or password.");
        }
    });

    signupButton.addEventListener('click', () => {  
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const email = document.getElementById('signup-email').value;

        if (!validateEmail(email)) {
            alert("Invalid email format.");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (storedUsers.find(user => user.username === username)) {
            alert('Username already exists.');
            return;
        }

        const newUser = { username, password, email };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        localStorage.setItem('currentUser', username);
        window.location.href = 'profile.html';
    });

    toggleFormButton.addEventListener('click', () => {
        if (loginSection.style.display === 'none') {
            showLogin();
        } else {
            showSignup();
        }
    });

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


    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

     function updateAuthLinks() { 
            const authLink = document.getElementById('auth-link');
            const currentUser = localStorage.getItem('currentUser');
    
            if (currentUser) {
                authLink.textContent = 'Logout';
                authLink.href = '#'; 
                authLink.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    updateAuthLinks(); 
                    window.location.href = "main.html"; 
                });
            } else {
                authLink.textContent = 'Login/Signup';
                authLink.href = 'authorization.html';
            }
        }
    
        updateAuthLinks();

    showLogin(); //Show login form by default
});