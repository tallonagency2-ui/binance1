document.addEventListener('DOMContentLoaded', function () {
  const historyBtn = document.getElementById('history-btn');
  const bottomSheet = document.getElementById('bottom-sheet');
  const overlay = document.getElementById('sheet-overlay');

  historyBtn.addEventListener('click', function () {
    bottomSheet.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  overlay.addEventListener('click', function () {
    bottomSheet.classList.remove('active');
    document.body.style.overflow = '';
  });
});
// const bottomSheet = document.getElementById("bottom-sheet");
// const overlay = document.getElementById("sheet-overlay");

// // click ra ngoài để đóng
// overlay.addEventListener("click", () => {
//   bottomSheet.classList.remove("active");
// });
document.querySelectorAll(".sheet-menu-item[href]").forEach(item => {

    item.addEventListener("touchstart", function () {
        this.classList.add("pressed");
    });

    item.addEventListener("touchend", function (e) {
        e.preventDefault();

        const href = this.href;

        setTimeout(() => {
            window.location.href = href;
        }, 180);
    });

    item.addEventListener("touchcancel", function () {
        this.classList.remove("pressed");
    });

});
const cryptoTab = document.querySelector(".crypto-tab");
const accountTab = document.querySelector(".account-tab");

const cryptoList = document.querySelector(".crypto-list");
const accountList = document.querySelector(".account-list");

cryptoTab.addEventListener("click", () => {
    cryptoTab.classList.add("active");
    accountTab.classList.remove("active");

    cryptoList.classList.add("active");
    accountList.classList.remove("active");
});

accountTab.addEventListener("click", () => {
    accountTab.classList.add("active");
    cryptoTab.classList.remove("active");

    accountList.classList.add("active");
    cryptoList.classList.remove("active");
});