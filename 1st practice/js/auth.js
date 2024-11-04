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
            alert("Login successful!");
            window.location.href = "main.html"; 
        } else {
            alert("Incorrect username or password.");
        }
    });

    signupButton.addEventListener('click', () => {
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (storedUsers.find(user => user.username === username)) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

        const newUser = { username, password }; 
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        alert("Signup successful! You can now log in.");
        showLogin(); 

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

    showLogin();
});
