async function fetchDiary(diaryId) {
  const authCookie = getAuthCookie();

  const response = await fetch(`/api/diaries/${diaryId}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${authCookie.value}`,
    },
  });
  const diary = await response.json();
  return diary;
}

async function renderDiaryContent(diaryId) {
  const diary = await fetchDiary(diaryId);
  console.log(diary);
}

function getDetailDiaryModal() {
  const diaryModal = document.getElementById('diaryModal');
  const zIndex = diaryModal.style.zIndex;

  // functions of util.js
  changeOpacity(diaryModal);
  changeZIndex(diaryModal);

  // NOTE : modal이 켜지는 경우에 한하여 렌더링 시작.
  if (zIndex === -10 || !zIndex) {
    const diaryId = this.id.split('').slice(4).join('');
    renderDiaryContent(diaryId);
    return;
  }
}
