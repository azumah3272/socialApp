// Get references to the HTML elements
const menuToggle = document.querySelector('.menu-toggle'); 
const sidebar = document.querySelector('aside');

// Add an event listener to the menu button
menuToggle.addEventListener('click', function () {
    // Toggles the 'show-aside' class on the sidebar
    sidebar.classList.toggle('show-aside');
});