class DetailDiary {
  constructor() {
    this.detailDiaryModal = $('diaryModal');
    this.closebutton = $('closeDetailDiaryModal');
    this.deleteButton = $('deleteDiary');

    this.closebutton.onclick = this.getDetailDiaryModal();
    this.deleteButton.onclick = this.deleteThisDiary();

    $('detailModalBackground').onclick = this.getDetailDiaryModal();
  }

  deleteThisDiary() {
    return function () {
      const diaryId = $('diaryId').value;
      const returned = confirm('정말로 삭제하시겠습니까?');

      if (returned) {
        deleteData(`/api/diaries/${diaryId}`);
        window.location.reload();
      }
    };
  }

  getDetailDiaryModal(diaryId, groupId, title, content, updatedAt) {
    return function () {
      const diaryModal = $('diaryModal');
      // detailModalBackground.style.

      // functions of util.js
      changeOpacity(diaryModal);
      changeZIndex(diaryModal);

      const detailModalBackground = $('detailModalBackground');
      const modalBackgroundColor = detailModalBackground.style.background;
      if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
        detailModalBackground.style.background = 'black';
        detailModalBackground.style.zIndex = 5;
      } else {
        detailModalBackground.style.background = 'transparent';
        detailModalBackground.style.zIndex = -10;
      }

      const diaryDate = new Date(updatedAt);

      $('diaryTitle').innerText = title;
      $('diaryContent').innerText = content;
      $('diaryDate').innerText = `${diaryDate.getFullYear()}년 ${
        diaryDate.getMonth() + 1
      }월 ${diaryDate.getDay()}일`;
      $('diaryId').value = diaryId;

      return;
    };
  }
}
