'use strict';
(() => {
  const addressEl = document.querySelector('#depositAddress');
  const address = addressEl.dataset.address;
  const qrSource = document.querySelector('.bsc-qr').src;
  const actionModal = document.querySelector('#actionModal');
  const toast = document.querySelector('#toast');
  let toastTimeout;

  // Có thể thêm ?preview=1 khi test desktop; iOS/PWA sẽ tự có thanh trạng thái thật.
  if (new URLSearchParams(location.search).has('preview')) {
    document.body.classList.add('bsc-show-preview');
  }

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  async function copyAddress() {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
      } else {
        const input = document.createElement('textarea');
        input.value = address;
        input.style.cssText = 'position:fixed;opacity:0;left:-9999px';
        document.body.appendChild(input);
        input.select();
        if (!document.execCommand('copy')) throw new Error('Không sao chép được');
        input.remove();
      }
      notify('Đã sao chép địa chỉ nạp');
    } catch (_) {
      notify('Không thể sao chép. Hãy chọn địa chỉ để sao chép thủ công.');
    }
    closeModal();
  }

  function openModal() { actionModal.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeModal() { actionModal.hidden = true; document.body.style.overflow = ''; }

  async function shareAddress() {
    closeModal();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Địa chỉ nạp USDT (BSC)', text: `Mạng BSC (BEP20)\n${address}` });
      } catch (error) { if (error.name !== 'AbortError') notify('Không thể mở chia sẻ trên thiết bị này'); }
    } else {
      await copyAddress();
      notify('Đã sao chép địa chỉ để chia sẻ');
    }
  }

  function downloadQr() {
    // QR là asset demo tương ứng với địa chỉ mẫu; khi nối API thật, tạo QR từ đúng địa chỉ API trả về.
    const anchor = document.createElement('a');
    anchor.href = qrSource;
    anchor.download = 'usdt-bsc-address-demo.png';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    closeModal();
    notify('Đã yêu cầu lưu mã QR');
  }

  document.querySelector('#copyButton').addEventListener('click', copyAddress);
  document.querySelector('#shareMainButton').addEventListener('click', openModal);
  document.querySelector('#closeModalBackdrop').addEventListener('click', closeModal);
  document.querySelector('#closeModalButton').addEventListener('click', closeModal);
  document.querySelector('#copyAddressSheetButton').addEventListener('click', copyAddress);
  document.querySelector('#shareAddressButton').addEventListener('click', shareAddress);
  document.querySelector('#downloadQrButton').addEventListener('click', downloadQr);
  document.querySelector('#helpButton').addEventListener('click', () => notify('Chỉ nạp USDT qua đúng mạng BSC (BEP20).'));
  document.querySelector('#historyButton').addEventListener('click', () => notify('Chưa kết nối trang lịch sử nạp tiền.'));
  document.querySelector('#moreInfoLink').addEventListener('click', (event) => { event.preventDefault(); notify('Vui lòng tuân thủ quy định giao dịch của nền tảng.'); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape' && !actionModal.hidden) closeModal(); });
})();
