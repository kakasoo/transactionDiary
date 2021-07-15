class DetailDiary {
  constructor() {
    this.detailDiaryModal = document.getElementById('diaryModal');
  }

  getDetailDiaryModal(diaryId, groupId, title, content, updatedAt) {
    return function () {
      console.log(diaryId, groupId, title, content);
      const diaryModal = document.getElementById('diaryModal');
      // const zIndex = diaryModal.style.zIndex;

      // functions of util.js
      changeOpacity(diaryModal);
      changeZIndex(diaryModal);

      document.getElementById('diaryTitle').innerText = title;
      document.getElementById('diaryContent').innerText = content;
      document.getElementById('diaryDate').innerText = updatedAt;

      return;
    };
  }
}
