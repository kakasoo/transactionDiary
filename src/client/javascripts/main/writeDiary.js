class WriteDiary {
  constructor() {
    this.writeButton = document.getElementById('write');
    this.writeButton.onclick = this.getWriteDiaryModal();
  }

  getWriteDiaryModal() {
    return function () {
      const writeDiaryModal = document.getElementById('writeDiaryModal');
      const zIndex = writeDiaryModal.style.zIndex;

      // functions of util.js
      changeOpacity(writeDiaryModal);
      changeZIndex(writeDiaryModal);

      //   // NOTE : modal이 켜지는 경우에 한하여 렌더링 시작.
      //   if (zIndex === -10 || !zIndex) {
      //     // renderDiaryContent(diaryId, groupId, title, content, updatedAt);
      //     return;
      //   }
    };
  }
}

window.onload = () => {
  new WriteDiary();
};
