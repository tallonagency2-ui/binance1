
  const openNetworkSheet = document.getElementById("openNetworkSheet");
  const networkSheet = document.getElementById("networkSheet");
  const networkOverlay = document.getElementById("networkOverlay");

  openNetworkSheet.addEventListener("click", () => {
    networkSheet.classList.add("active");
  });

  networkOverlay.addEventListener("click", () => {
    networkSheet.classList.remove("active");
  });

document.addEventListener("DOMContentLoaded", function () {

  const networkSheet = document.getElementById("networkSheet");
  const networkOverlay = document.getElementById("networkOverlay");

  // đọc URL
  const params = new URLSearchParams(window.location.search);

  // nếu từ wallet chuyển qua
  if (params.get("openNetwork") === "true") {
    networkSheet.classList.add("active");
  }

  // đóng popup
  networkOverlay.addEventListener("click", function () {
    networkSheet.classList.remove("active");
  });

});
