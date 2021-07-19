class Diary {
  constructor() {
    this.detailDiaryModal = new DetailDiary();
    this.writeDiaryModal = new WriteDiary();

    // [this.byTime, this.byGroups] =
    //   document.getElementsByClassName('sortButton');
    this.diaryList = [];
    this.getMyDiary();
  }

  makeCardLine(partOfDiaries) {
    const cardLine = document.createElement('section');
    cardLine.style.display = 'flex';

    while (partOfDiaries.length < 5) {
      partOfDiaries.push({
        DIARY_ID: null,
        TITLE: '',
        CONTENT: '',
        UPDATED_AT: '',
      });
    }

    for (const diary of partOfDiaries) {
      const { DIARY_ID, GROUP_ID, TITLE, CONTENT, UPDATED_AT } = diary;

      const card = document.createElement('div');
      // function of detailDiary.js
      card.onclick = this.detailDiaryModal.getDetailDiaryModal(
        DIARY_ID,
        GROUP_ID,
        TITLE,
        CONTENT,
        UPDATED_AT,
      );

      card.id = `card${DIARY_ID}`;
      card.className = 'card';
      card.innerHTML = `
      <div class = 'innerCard'>
        <h2>${TITLE}</h2>
        <p>${CONTENT}</p>
      </div>
      `;

      cardLine.appendChild(card);
    }
    return cardLine;
  }

  // sortDiaryByGroups(newDiaryArr) {
  //   const diaries = newDiaryArr ? newDiaryArr : this.diaryList;

  //   // NOTE : 그룹 별로 가져온 경우에는 중복을 제거하지 않는다.
  //   const note = $('note');
  //   const CARD_NUM = 5;

  //   console.log(diaries);
  // }

  sortDiariesByTime(newDiaryArr) {
    const diaries = newDiaryArr ? newDiaryArr : this.diaryList;

    // NOTE : 그룹 별로 가져온 다이어리를 시간 순으로 정렬하기 위해, 중복된 일기를 제거한다.
    const diariesData = diaries.reduce(deduplicate, []);
    const note = $('note');
    const CARD_NUM = 5;

    while (diariesData.length) {
      const cardLine = this.makeCardLine(diariesData.splice(0, CARD_NUM));
      note.appendChild(cardLine);
    }
  }

  async getMyDiary() {
    // function of util.js
    const diaries = await getResourceByUrl('/api/diaries');
    this.diaryList.push(...diaries);

    if (diaries[Symbol.iterator]) {
      this.sortDiariesByTime();
    }
  }
}
