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
                image: "italianPasta.jpg"
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
