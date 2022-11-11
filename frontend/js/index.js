const solutionsBtn = document.querySelector('#solutionsBtn');
const solutionsSubmenu = document.querySelector('#solutionsSubmenu');

solutionsBtn.addEventListener('click', () => {
    solutionsSubmenu.classList.toggle('hidden');
    // solutionsSubmenu.classList.toggle('opacity-0');
});

const moreBtn = document.querySelector('#moreBtn');
const moreSubmenu = document.querySelector('#moreSubmenu');

moreBtn.addEventListener('click', () => {
    moreSubmenu.classList.toggle('hidden');
    // solutionsSubmenu.classList.toggle('opacity-0');
});