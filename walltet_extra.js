document.querySelector('.overlay').addEventListener('click', () => {
    sheet.classList.remove('active');
});
const btn = document.getElementById('openHistory');
const sheet = document.getElementById('historySheet');

btn.addEventListener('click', () => {
    sheet.classList.add('active');
});
console.log("click ok");