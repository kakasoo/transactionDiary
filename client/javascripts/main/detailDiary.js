class DetailDiary {
  constructor() {
    this.detailDiaryModal = $('diaryModal');
    this.closebutton = $('closeDetailDiaryModal');
    this.deleteButton = $('deleteDiary');
    this.updateButton = $('updateDiary');
    this.detailModalBackground = $('detailModalBackground');
    this.cancelUpdateButton = $('cancelUpdate');
    this.completeUpdateButton = $('completeUpdateDiary');

    this.closebutton.onclick = this.getDetailDiaryModal();
    this.deleteButton.onclick = this.deleteThisDiary();
    this.detailModalBackground.onclick = this.getDetailDiaryModal();
    this.updateButton.onclick = this.updateThisDiary();
    this.cancelUpdateButton.onclick = this.updateThisDiary();
    this.completeUpdateButton.onclick = this.completeUpdateThisDiary();
  }

  completeUpdateThisDiary() {
    return async function () {
      const diaryId = $('diaryId').value;
      const titleToUpdate = $('updateTitle').value;
      const dateToUpdate = $('updateDate').value;
      const contentToUpdate = $('updateContent').value;

      const response = await putDataByUrl(`/api/diaries/${diaryId}`, {
        title: titleToUpdate,
        updatedAt: dateToUpdate,
        content: contentToUpdate,
      });

      window.location.reload();
    };
  }

  updateThisDiary() {
    return function () {
      const detailDiaryInfos = document.querySelectorAll('.detailDiaryInfo');
      const updateDiaryInputs = document.querySelectorAll('.updateDiaryInput');

      detailDiaryInfos.forEach((el) => {
        el.hidden = !el.hidden;
      });

      updateDiaryInputs.forEach((el) => {
        el.hidden = !el.hidden;
      });
    };
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

      $('diaryTitle').innerText = $('updateTitle').value = title;
      $('diaryContent').innerText = $('updateContent').value = content;
      $('diaryDate').innerText = `${diaryDate.getFullYear()}년 ${
        diaryDate.getMonth() + 1
      }월 ${diaryDate.getDay() + 1}일`;
      $('updateDate').value = `${diaryDate.getFullYear()}-${(
        '0' +
        (diaryDate.getMonth() + 1)
      ).slice(-2)}-${('0' + (diaryDate.getDay() + 1)).slice(-2)}`;

      // NOTE : return function 바깥 쪽에 값을 저장해서 클로저를 만들어두면 굳이 hidden input을 이용할 필요가 없다.
      $('diaryId').value = diaryId;
      return;
    };
  }
}
