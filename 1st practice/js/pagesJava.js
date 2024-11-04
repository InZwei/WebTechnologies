
/*Date function */
function dateTime() {
    document.getElementById("current-time").textContent = new Date().toLocaleString();
}
setInterval(dateTime, 1000);

/*Background color changer*/
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("color-change").addEventListener("click", function () {
        document.body.style.backgroundColor = "lightblue";
    });
    document.getElementById("color-change-default").addEventListener("click", function () {
        document.body.style.backgroundColor = "white";
    });
});

/*Content validator + Sound*/
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


/*FAQ*/
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-question").forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling; 

            if (answer.style.display === "block") {
                answer.style.display = "none"; 
            } else {
                answer.style.display = "block";
            }
        });
    });
});

/*Basic animation*/
document.addEventListener("DOMContentLoaded", () => {
    document.body.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 500, fill: 'forwards' }
    );
});

/*Rating */
document.addEventListener('DOMContentLoaded', function () {
    const rating = document.getElementById('rating');

    rating.addEventListener('change', function () {
        const ratingValue = rating.value;
        alert(`Thank you for rating us: ${ratingValue} stars!`);
    });
})

/*Price calculator*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.order-form');
    const totalPriceSpan = document.getElementById('total-price');

    form.addEventListener('change', updateTotalPrice);

    function updateTotalPrice() {
        let total = 0;
        const selectedFoods = form.querySelectorAll('input[name="food[]"]:checked');
        const selectedDrinks = form.querySelectorAll('input[name="drink[]"]:checked');

        selectedFoods.forEach(function (item) {
            total += parseInt(item.value.match(/\$(\d+)/)[1]);
        });

        selectedDrinks.forEach(function (item) {
            total += parseInt(item.value.match(/\$(\d+)/)[1]);
        });

        totalPriceSpan.textContent = `$${total}`;
    }
});

/*User check*/
document.addEventListener('DOMContentLoaded', () => {
    
     const currentUser = localStorage.getItem('currentUser');
     if (!currentUser) {
         window.location.href = 'authorization.html'; 
     }
 
 
     const logoutButton = document.querySelector('#logout-button'); 
     if (logoutButton) { 
         logoutButton.addEventListener('click', () => {
             localStorage.removeItem('currentUser');
             window.location.href = 'authorization.html'; 
         });
     }
 
 });

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
});