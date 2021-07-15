class DetailDiary {
  constructor() {
    this.detailDiaryModal = document.getElementById('diaryModal');
  }

  getDetailDiaryModal(diaryId, groupId, title, content, updatedAt) {
    return function () {
      const diaryModal = document.getElementById('diaryModal');

      // modalBackground.style.

      // functions of util.js
      changeOpacity(diaryModal);
      changeZIndex(diaryModal);

      const modalBackground = document.getElementById('modalBackground');
      const modalBackgroundColor = modalBackground.style.background;
      if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
        modalBackground.style.background = 'black';
      } else {
        modalBackground.style.background = 'transparent';
      }

      document.getElementById('diaryTitle').innerText = title;
      document.getElementById('diaryContent').innerText = content;
      document.getElementById('diaryDate').innerText = updatedAt;

      return;
    };
  }
}
