
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

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        body.classList.add(savedMode);
        updateNavbar(savedMode); 
    }


    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('mode', currentMode);
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





    const orderForm = document.getElementById('order-form');
    if (orderForm){
        const submitOrderButton = orderForm.querySelector('input[type="submit"]');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const streetInput = document.getElementById('street');
        const totalPriceSpan = document.getElementById('total-price');

        submitOrderButton.addEventListener('click', function(event) {
            event.preventDefault();


            const orderItems = [];
            const foodItems = document.querySelectorAll('.food-item .quantity');
            foodItems.forEach(item => {
                const quantity = parseInt(item.value) || 0;
                if (quantity > 0) {
                    orderItems.push({
                        name: item.dataset.name,
                        quantity: quantity,
                        price: dishes.find(dish => dish.name === item.dataset.name).price,
                    });
                }
            });
            const drinkItems = document.querySelectorAll('.drink-item .quantity');
            drinkItems.forEach(item => {
                const quantity = parseInt(item.value) || 0;
                if (quantity > 0) {
                    orderItems.push({
                        name: item.dataset.name,
                        quantity: quantity,
                        price: drinks.find(drink => drink.name === item.dataset.name).price,
                    });
                }
            });


            const orderData = {
                date: new Date().toLocaleString(),
                name: nameInput.value,
                phone: phoneInput.value,
                street: streetInput.value,
                items: orderItems,
                total: parseFloat(totalPriceSpan.textContent.replace('$', '')) 
            };

            saveOrder(orderData);

            alert('Order placed successfully!');
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

//Main-menu bar
const dishes = [
    {
        name: "Pepperoni Pizza",
        image: "pizza.jpg"
    },
    {
        name: "Juicy Burger",
        image: "burger.jpg"
    },
    {
        name: "Italian pasta",
        image: "italianPastA.jpg"
    },
    {
        name: "Spicy Chicken Tacos",
        image: "tacos.jpg"
    },
    {
        name: "Mediterranean Quinoa Salad",
        image: "quinoa_salad.jpg"
    },
    {
        name: "Creamy Tomato Soup",
        image: "tomato_soup.jpg"
    }
];

const dishesContainer = document.querySelector('.main-dishes .row');

dishes.forEach(dish => {
    const dishElement = `
        <div class="col">
            <div class="card h-100">
                <div class="image-container">
                    <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${dish.name}</h5>
                </div>
            </div>
        </div>
    `;
    dishesContainer.innerHTML += dishElement;
});


    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {

            const description = card.querySelector('.dish-description');
            const imageContainer = card.querySelector('.image-container');

            imageContainer.style.display = imageContainer.style.display === 'none' ? 'block' : 'none';
            description.style.display = description.style.display === 'none' ? 'block' : 'none';

            if (description.style.display === 'block') {
                description.textContent = description.dataset.recipe;

            }

        });
    });