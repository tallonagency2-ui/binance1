document.querySelectorAll(".transaction-item[data-href]").forEach(item => {
    item.addEventListener("click", function () {
        this.classList.add("pressed");

        setTimeout(() => {
            window.location.href = this.dataset.href;
        }, 150);
    });
});
