// 年号の自動更新
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('[data-year]');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 利用規約同意ボタン
  const agreeCheckbox = document.getElementById('agree-checkbox');
  const agreeButton = document.getElementById('agree-button');
  const storageKey = 'masterbot_terms_agreed';

  // 初期状態の確認
  if (agreeCheckbox) {
    const isAgreed = localStorage.getItem(storageKey) === 'true';
    agreeCheckbox.checked = isAgreed;
    updateButtonState();
  }

  // チェックボックス変更時
  if (agreeCheckbox) {
    agreeCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem(storageKey, 'true');
      } else {
        localStorage.removeItem(storageKey);
      }
      updateButtonState();
    });
  }

  // ボタン状態の更新
  function updateButtonState() {
    if (agreeButton && agreeCheckbox) {
      agreeButton.disabled = !agreeCheckbox.checked;
    }
  }

  // Botを招待ボタンのクリック処理
  if (agreeButton) {
    agreeButton.addEventListener('click', () => {
      // ここにBotの招待URLを設定してください
      const botInviteUrl = 'https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot%20applications.commands';
      window.open(botInviteUrl, '_blank');
    });
  }

  // スムーズなスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});