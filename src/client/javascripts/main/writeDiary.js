class WriteDiary {
  constructor() {
    this.writeButton = document.getElementById('write');
    this.completeButton = document.getElementById('completeWriting');

    this.writeButton.onclick = this.getWriteDiaryModal();
    this.completeButton.onclick = this.postDiary();
  }

  getWriteDiaryModal() {
    return function () {
      const writeDiaryModal = document.getElementById('writeDiaryModal');
      const zIndex = writeDiaryModal.style.zIndex;

      // functions of util.js
      changeOpacity(writeDiaryModal);
      changeZIndex(writeDiaryModal);

      const modalBackground = document.getElementById('modalBackground');
      const modalBackgroundColor = modalBackground.style.background;
      if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
        modalBackground.style.background = 'black';
        modalBackground.style.zIndex = 5;
      } else {
        modalBackground.style.background = 'transparent';
        modalBackground.style.zIndex = -10;
      }
    };
  }

  postDiary() {
    return async function () {
      const title = document.getElementById('writeTitle').value;
      const createdAt = document.getElementById('writeDate').value;
      const content = document.getElementById('writeContent').value;

      if (!title && !createdAt && !content) {
        alert('빈칸을 모두 채워주세요!');
        return;
      }

      const authCookie = getAuthCookie();

      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authCookie.value}`,
        },
        body: JSON.stringify({
          title: title,
          createdAt: createdAt,
          content: content,
          hashtag: '',
          groupIds: [],
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    };
  }
}
