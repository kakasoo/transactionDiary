async function renderDiaryContent(diaryId, groupId, title, content, updatedAt) {
  document.getElementById('diaryTitle').innerText = title;
  document.getElementById('diaryContent').innerText = content;
  document.getElementById('diaryDate').innerText = updatedAt;
}

function getDetailDiaryModal(diaryId, groupId, title, content, updatedAt) {
  return function () {
    const diaryModal = document.getElementById('diaryModal');
    const zIndex = diaryModal.style.zIndex;

    // functions of util.js
    changeOpacity(diaryModal);
    changeZIndex(diaryModal);

    // NOTE : modal이 켜지는 경우에 한하여 렌더링 시작.
    if (zIndex === -10 || !zIndex) {
      renderDiaryContent(diaryId, groupId, title, content, updatedAt);
      return;
    }
  };
}
