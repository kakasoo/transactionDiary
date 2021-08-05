class DetailDiary {
  constructor() {
    this.detailDiaryModal = $('diaryModal');
    this.closebutton = $('closeDetailDiaryModal');
    this.deleteButton = $('deleteDiary');

    this.closebutton.onclick = this.getDetailDiaryModal();
    this.deleteButton.onclick = this.deleteThisDiary();
  }

  deleteThisDiary() {
    return function () {
      const diaryId = $('diaryId').value;
      deleteData(`/api/diaries/${diaryId}`);
      // window.location.reload();
    };
  }

  getDetailDiaryModal(diaryId, groupId, title, content, updatedAt) {
    return function () {
      const diaryModal = $('diaryModal');

      // modalBackground.style.

      // functions of util.js
      changeOpacity(diaryModal);
      changeZIndex(diaryModal);

      const modalBackground = $('modalBackground');
      const modalBackgroundColor = modalBackground.style.background;
      if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
        modalBackground.style.background = 'black';
        modalBackground.style.zIndex = 5;
      } else {
        modalBackground.style.background = 'transparent';
        modalBackground.style.zIndex = -10;
      }

      $('diaryTitle').innerText = title;
      $('diaryContent').innerText = content;
      $('diaryDate').innerText = updatedAt;
      $('diaryId').value = diaryId;

      return;
    };
  }
}
