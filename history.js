
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        displayOrderHistory();
    }
});

function displayOrderHistory() {
    const currentUser = localStorage.getItem('currentUser');
    const orderHistoryContainer = document.getElementById('order-history');

    if (currentUser && orderHistoryContainer) {
        let orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${currentUser}`)) || [];

        if (orderHistory.length === 0) {
            orderHistoryContainer.innerHTML = '<p>No orders yet.</p>';
            return;
        }

        orderHistoryContainer.innerHTML = '';

        orderHistory.forEach(order => {
            const orderDetails = document.createElement('div');
            orderDetails.classList.add('order-details');
            orderDetails.innerHTML = `
                <h3>Order Date: ${order.date}</h3>
                <p>Name: ${order.name}</p>
                <p>Phone: ${order.phone}</p>
                <p>Address: ${order.street}</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x${item.quantity} ($${item.price * item.quantity})</li>`).join('')}
                </ul>
                <p><strong>Total: $${order.total}</strong></p>
                <hr>
            `;
            orderHistoryContainer.appendChild(orderDetails);
        });
    }
}

function saveOrder(orderData) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        let orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${currentUser}`)) || [];
        orderHistory.push(orderData);
        localStorage.setItem(`orderHistory_${currentUser}`, JSON.stringify(orderHistory));
    }
}

const dishes = [
    { name: "Pizza", price: 10 },
    { name: "Burger", price: 8 },
    { name: "Pasta", price: 12 },
    { name: "Salad", price: 7 },
    { name: "Tacos", price: 9 },
    { name: "Quinoa Salad", price: 11 },
    { name: "Tomato Soup", price: 7 },
    { name: "Grilled Salmon", price: 15 },
    { name: "Beef Stir-fry", price: 13 },
    { name: "Caprese Skewers", price: 8 }
];

const drinks = [
    { name: "Cola", price: 2 },
    { name: "Juice", price: 3 },
    { name: "Water", price: 1 }
];


document.getElementById('order-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const street = document.getElementById('street').value.trim();
            let hasItems = false;


            const orderItems = [];
            const foodItems = document.querySelectorAll('.food-item .quantity');
            foodItems.forEach(item => {
                const quantity = parseInt(item.value) || 0;
                if (quantity > 0) {
                    hasItems = true; // Set to true if any item is selected.
                    orderItems.push({
                        name: item.dataset.name,
                        quantity,
                        price: dishes.find(d => d.name === item.dataset.name).price
                    });
                }
            });
    
            const drinkItems = document.querySelectorAll('.drink-item .quantity');
            drinkItems.forEach(item => {
                const quantity = parseInt(item.value) || 0;
                if (quantity > 0) {
                    hasItems = true;
                    orderItems.push({
                        name: item.dataset.name,
                        quantity,
                        price: drinks.find(d => d.name === item.dataset.name).price
                    });
                }
            });

            if (!name || !phone || !street || !hasItems) {
                alert('Please fill in all fields and select at least one item.');
                return; 
            }

            const orderData = {
                date: new Date().toLocaleString(),
                name,
                phone,
                street,
                items: orderItems,
                total: parseFloat(document.getElementById('total-price').textContent.replace('$', ''))
            };

            saveOrder(orderData);
            alert('Order placed successfully!');
            this.reset(); 
            document.getElementById('total-price').textContent = '$0';
});
