// 年号の自動更新
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('[data-year]');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // お知らせの管理
  const announcementsList = document.getElementById('announcements-list');
  if (announcementsList) {
    loadAnnouncements();
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

// お知らせの読み込みと表示
function loadAnnouncements() {
  const announcementsList = document.getElementById('announcements-list');
  if (!announcementsList) return;

  // お知らせデータ（実際の運用ではサーバーから取得することを推奨）
  const announcements = [
    {
      date: '2025-12-18',
      title: '利用規約の更新',
      content: '第1条の規約変更通知方法を明確にしました。詳細は<a href="terms.html#section1">利用規約</a>をご確認ください。',
      type: 'update'
    }
    // さらにお知らせを追加する場合はここに追加
  ];

  if (announcements.length === 0) {
    announcementsList.innerHTML = '<p style="color:#94a3b8;text-align:center">最新のお知らせはありません</p>';
    return;
  }

  announcementsList.innerHTML = announcements.map(item => `
    <div class="announcement-item ${getAnnouncementClass(item.type)}">
      <div class="date">${formatDate(item.date)}</div>
      <div class="title">${item.title}</div>
      <div class="content">${item.content}</div>
    </div>
  `).join('');
}

// お知らせの種類からクラスを取得
function getAnnouncementClass(type) {
  switch (type) {
    case 'important':
      return 'important';
    case 'success':
      return 'success';
    default:
      return '';
  }
}

// 日付フォーマット
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}