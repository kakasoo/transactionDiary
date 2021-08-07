class WriteDiary {
  constructor() {
    this.writeButton = $('write');
    this.completeButton = $('completeWriting');

    this.closebutton = $('closeWriteDiaryModal');
    this.selectGroup = $('selectGroup');
    this.closebutton.onclick = this.getWriteDiaryModal();

    this.writeButton.onclick = this.getWriteDiaryModal();
    this.completeButton.onclick = this.postDiary();

    this.getUserGroups();

    this.selectedGroups = [];
  }

  async getUserGroups() {
    const userGroups = await getResourceByUrl('/api/groups');

    userGroups
      .filter((el) => el.name !== '내게쓰기')
      .forEach((el) => {
        const button = CE({ tag: 'button', className: 'groupSelectButton' });
        button.textContent = el.name;
        button.onclick = () => {
          if (this.selectedGroups.includes(el.groupId)) {
            button.style.border = 'none';
            button.style.background = 'aquamarine';
            this.selectedGroups = [
              ...this.selectedGroups.filter(
                (selectGroup) => selectGroup !== el.groupId,
              ),
            ];
            return;
          }

          button.style.border = '1px solid red';
          button.style.background = 'pink';
          this.selectedGroups.push(el.groupId);
        };

        this.selectGroup.appendChild(button);
      });
  }

  getWriteDiaryModal() {
    return function () {
      const writeDiaryModal = $('writeDiaryModal');
      // const zIndex = writeDiaryModal.style.zIndex;

      // functions of util.js
      changeOpacity(writeDiaryModal);
      changeZIndex(writeDiaryModal);

      const modalBackground = $('modalBackground');
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
    return async () => {
      const title = $('writeTitle').value;
      const createdAt = $('writeDate').value;
      const content = $('writeContent').value;
      const selectedGroups = this.selectedGroups || [];

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
          groupIds: selectedGroups,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    };
  }
}
