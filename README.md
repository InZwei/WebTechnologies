# WebTechnologies Food Delivery Website

This project is a simple food delivery website built using HTML, CSS, and JavaScript

* **Homepage:** Displays featured dishes, weather information (using the OpenWeatherMap API).
* **Order Page:** Allows users to select food and drinks, calculate the total price, and submit their order. Includes form validation for user input and pre-fills the user's phone number if they're logged in.
* **Contact Page:** A contact form with validation for users to send messages or feedback.
* **Profile Page:** Displays user profile information (username, email, phone number, profile picture). Allows users to upload a profile picture, which is stored per user.  Accessible only after login.
* **Login/Signup:** Users can create accounts and log in to access their profile. Includes form validation for password complexity, email format, phone number, and required fields.
* **Light/Dark Mode Toggle:** Users can switch between light and dark mode.
* **Animated Button Effects:** Enhanced user interaction 

## Technologies Used

* HTML
* CSS
* JavaScript
* OpenWeatherMap API (for weather information)
* Local Storage (for user data and preferences)

## Setup and Usage

1. **Clone the repository:** `git clone https://github.com/InZwei/WebTechnologies.git`
2. **Open `index.html`:** Open the `index.html` file in your web browser to view the website.
3. **Navigation:** Use the navigation bar to access different pages.
4. **Login/Signup:** Create an account or log in to access the profile page and order features.
5. **Order Food:** Use the Order page to select items and submit your order.
6. **Contact Us:** Use the contact form to provide feedback.
7. **Profile:** View your profile information, order history, and upload a profile picture after logging in.


## Live Demo

[https://inzwei.github.io/WebTechnologies/](https://inzwei.github.io/WebTechnologies/)

## Future Improvements

* Enhanced search and filtering with local storage persistence.
* More advanced form validation, including server-side validation.
* Implementing actual order processing and a database.
* Implementing a shopping cart.
* More advanced UI/UX features.

## Known errors

* Profile picture doesn't save after uploading one
* Profile picture might be shared across other accounts in one device (due to local storage)
