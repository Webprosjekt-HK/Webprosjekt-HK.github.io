
let sidebar = document.querySelector('.sidebar');
let burgerBtn = document.querySelector('.burgerBtn');

burgerBtn.onclick = function() {
    sidebar.classList.toggle('active');
}