
function dateTime() {
    document.getElementById("current-time").textContent = new Date().toLocaleString();
}
setInterval(dateTime, 1000);

function playClickSound() {
    const clickSound = document.getElementById('clickSound'); 
    if (clickSound) {
        clickSound.currentTime = 0; 
        clickSound.play();
    }
}

function animateButton(button) {
    button.addEventListener('click', playClickSound);

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
}


document.addEventListener('DOMContentLoaded', () => {

    const logoutButton = document.querySelector('.btn.btn-primary:not(#login-button):not(#signup-button)'); // Select logout button, excluding login/signup
    if (logoutButton) {
        animateButton(logoutButton);
    }

    const toggleModeButton = document.getElementById('mode-toggle');
    if (toggleModeButton) {
        animateButton(toggleModeButton);
    }

    const contactSubmitButton = document.getElementById('Submit');
    if (contactSubmitButton) {
        animateButton(contactSubmitButton);
    }

    const orderSubmitButton = document.querySelector('.submit-button');
    if(orderSubmitButton) {
        animateButton(orderSubmitButton);
    }

     const imageUpload = document.getElementById('image-upload');
     if (imageUpload) {
        imageUpload.addEventListener('change', playClickSound); 
     }
});


//Toggle + button sound
document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    function getSavedMode() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? localStorage.getItem(`mode_${currentUser}`) : null;
    }

    function saveMode(mode) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(`mode_${currentUser}`, mode);
        }
    }

    const savedMode = getSavedMode();
    if (savedMode) {
        body.classList.add(savedMode); 
        updateNavbar(savedMode);
    }


    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        saveMode(currentMode);
        updateNavbar(currentMode);
    });


    function updateNavbar(mode) {
        if (mode === 'dark-mode') {
            navbar.classList.remove('navbar-light', 'bg-light');
            navbar.classList.add('navbar-dark', 'bg-dark');
            modeToggle.classList.remove('btn-outline-secondary');
            modeToggle.classList.add('btn-outline-light');

        } else {
            navbar.classList.remove('navbar-dark', 'bg-dark');
            navbar.classList.add('navbar-light', 'bg-light');
            modeToggle.classList.remove('btn-outline-light');
            modeToggle.classList.add('btn-outline-secondary');
        }
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm){
        const errorMessage = document.getElementById("error-message");
        const submitButton = document.getElementById("Submit");
        const clickSound = document.getElementById("clickSound");

        submitButton.addEventListener('click', function (event) {
            clickSound.currentTime = 0; 
            clickSound.play();

            errorMessage.textContent = ""; 

            if (document.getElementById("phone").value.trim() === "") {
                errorMessage.textContent = "Please enter a phone number."; 
                event.preventDefault();
            } else if (document.getElementById("comment").value.trim() === "") {
                errorMessage.textContent = "Please enter a comment."; 
                event.preventDefault(); 
            } else {
                alert('Your message has been sent successfully!')
            }
        });

        contactForm.addEventListener('keydown', function(event) { 
            if (event.key === 'Enter') {
                submitButton.click();
            }
        });
    }
});


//Content validator
document.addEventListener("DOMContentLoaded", function () {
    const errorMessage = document.getElementById("error-message");
    const submitButton = document.getElementById("Submit");
    const clickSound = document.getElementById("clickSound");

    submitButton.addEventListener('click', function (event) {
        clickSound.currentTime = 0; 
        clickSound.play();

        errorMessage.textContent = ""; 

        if (document.getElementById("phone").value.trim() === "") {
            errorMessage.textContent = "Please enter a phone number."; 
            event.preventDefault();
        } else if (document.getElementById("comment").value.trim() === "") {
            errorMessage.textContent = "Please enter a comment."; 
            event.preventDefault(); 
        } else {
            alert('Your message has been sent successfully!')
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });
});



//fade animation
document.addEventListener("DOMContentLoaded", () => {
    document.body.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 500, fill: 'forwards' }
    );
});


//rating
document.addEventListener('DOMContentLoaded', function () {
    const rating = document.getElementById('rating');

    rating.addEventListener('change', function () {
        const ratingValue = rating.value;
        alert(`Thank you for rating us: ${ratingValue} stars!`);
    });
})


//Price
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('order-form');
    const totalPriceSpan = document.getElementById('total-price');
    const foodItems = document.querySelectorAll('.food-item');
    const drinkItems = document.querySelectorAll('.drink-item');


    function updateTotalPrice() {
        let total = 0;

        foodItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const quantityInput = item.querySelector('.quantity');
            if (checkbox.checked) {
                const price = parseInt(checkbox.nextElementSibling.textContent.match(/\$(\d+)/)[1]);
                const quantity = parseInt(quantityInput.value) || 0;
                if (quantity > 0){
                    total += price * quantity;
                }
            }
        });


        drinkItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const quantityInput = item.querySelector('.quantity');
            if (checkbox.checked) {
                const price = parseInt(checkbox.nextElementSibling.textContent.match(/\$(\d+)/)[1]);
                const quantity = parseInt(quantityInput.value) || 0;
                if (quantity > 0){
                    total += price * quantity;
                }
                
            }
        });

        totalPriceSpan.textContent = `$${total}`;
    }

    foodItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantityInput = item.querySelector('.quantity');
        checkbox.addEventListener('change', updateTotalPrice);
        quantityInput.addEventListener('input', updateTotalPrice); 
    });

    drinkItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const quantityInput = item.querySelector('.quantity');
        checkbox.addEventListener('change', updateTotalPrice);
        quantityInput.addEventListener('input', updateTotalPrice);
    });
});
