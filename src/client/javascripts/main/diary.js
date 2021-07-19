class Diary {
  constructor() {
    this.detailDiaryModal = new DetailDiary();
    this.writeDiaryModal = new WriteDiary();

    this.byTime = $('byTime');
    this.byGroups = $('byGroups');

    this.byTime.onclick = this.sortDiariesByTime.bind(this);
    this.byGroups.onclick = this.sortDiariesByGroups.bind(this);

    this.diaryList = [];
    this.diaryGroupNameCache = [];
    this.getMyDiary();
  }

  // NOTE : 형식을 고민하다 보니 이렇게 됐는데, HTML을 head, body로 구분짓는 것은 좋은 생각 같다.
  makeCardsGroup(name) {
    const cardGroup = document.createElement('div');
    cardGroup.id = name;

    const cardHead = document.createElement('h2');
    cardHead.innerText = name;

    const cardBody = document.createElement('div');

    cardGroup.append(cardHead, cardBody);
    return cardGroup;
  }

  makeCard(diary) {
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

    return card;
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
      const card = this.makeCard(diary);
      cardLine.appendChild(card);
    }
    return cardLine;
  }

  sortDiariesByGroups() {
    // NOTE : 그룹 별로 가져온 경우에는 중복을 제거하지 않는다.
    const note = $('note');
    while (note.firstChild) {
      note.removeChild(note.firstChild);
    }

    for (const a of this.diaryList) {
      if (!this.diaryGroupNameCache.includes(a.NAME)) {
        const cardsGroup = this.makeCardsGroup(a.NAME);
        note.appendChild(cardsGroup);
      }

      const card = this.makeCard(a);
      $(a.NAME).appendChild(card);
    }
  }

  sortDiariesByTime() {
    const note = $('note');
    while (note.firstChild) {
      note.removeChild(note.firstChild);
    }

    // NOTE : 그룹 별로 가져온 다이어리를 시간 순으로 정렬하기 위해, 중복된 일기를 제거한다.
    const diariesData = this.diaryList.reduce(deduplicate, []);
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
