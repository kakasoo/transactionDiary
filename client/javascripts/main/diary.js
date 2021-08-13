class Diary {
  constructor() {
    this.auth = getAuthCookie();
    if (!this.auth || !this.auth.value) {
      window.location.href = '/';
      alert('로그인을 먼저 해주셔야 합니다.');
    }

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
    const cardGroup = CE({ tag: 'div', className: 'noteGroupSection' });
    cardGroup.id = name;

    const cardHead = CE({ tag: 'h2', className: 'groupName' });
    cardHead.innerText = name;

    const cardBody = CE({ tag: 'div', className: 'noteSection' });

    cardGroup.append(cardHead, cardBody);
    return cardGroup;
  }

  makeCard(diary) {
    const { diaryId, groupId, title, content, updatedAt } = diary;

    const card = CE({ tag: 'div' });
    card.id = `card${diaryId}`;
    card.className = 'diaryCard';

    if (!diaryId) {
      card.style.boxShadow = '';
      return card;
    }

    // function of detailDiary.js
    card.onclick = this.detailDiaryModal.getDetailDiaryModal(
      diaryId,
      groupId,
      title,
      content,
      updatedAt,
    );

    const cardHead = CE({ tag: 'div' });
    cardHead.className = 'diaryCardHead';

    const cardBody = CE({ tag: 'div' });
    cardBody.className = 'diaryCardBody';
    cardBody.innerHTML = `<h2 class ="diaryName">${title}</h2>
    <span>${content}</span>`;

    const standardTime = new Date(updatedAt);
    const wroteTime =
      standardTime.getTime() + standardTime.getTimezoneOffset() + 60 * 1000;
    const koreanTime = new Date(wroteTime + 9 * 60 * 60 * 1000);

    const cardFooter = CE({ tag: 'div' });
    cardFooter.className = 'diaryCardFooter';
    cardFooter.innerHTML = `<span>${koreanTime.getFullYear()}년 ${
      koreanTime.getMonth() + 1
    }월 ${
      koreanTime.getDay() + 1
    }일 ${koreanTime.getHours()}시 ${koreanTime.getMinutes()}분</span>`;

    card.append(cardHead, cardBody, cardFooter);

    return card;
  }

  makeCardLine(partOfDiaries) {
    const cardLine = CE({ tag: 'section', className: 'noteSection' });

    while (partOfDiaries.length < 5) {
      partOfDiaries.push({
        diaryId: '',
        title: '',
        content: '',
        updatedAt: '',
      });
    }

    for (const diary of partOfDiaries) {
      const card = this.makeCard(diary);
      cardLine.appendChild(card);
    }
    return cardLine;
  }

  sortDiariesByGroups(event, options) {
    // NOTE : 그룹 별로 가져온 경우에는 중복을 제거하지 않는다.
    const curDiaryList = (options && options.diaryList) || this.diaryList;
    const note = $('note');
    while (note.firstChild) {
      note.removeChild(note.firstChild);
    }

    for (const a of curDiaryList) {
      if (!this.diaryGroupNameCache.includes(a.name)) {
        this.diaryGroupNameCache.push(a.name);
        const cardsGroup = this.makeCardsGroup(a.name);
        note.appendChild(cardsGroup);
      }
      const card = this.makeCard(a);
      $(a.name).lastChild.appendChild(card);
    }
    this.diaryGroupNameCache = [];
  }

  sortDiariesByTime(event, options) {
    const note = $('note');
    while (note.firstChild) {
      note.removeChild(note.firstChild);
    }

    const curDiaryList = (options && options.diaryList) || this.diaryList;
    // NOTE : 그룹 별로 가져온 다이어리를 시간 순으로 정렬하기 위해, 중복된 일기를 제거한다.
    const diariesData = curDiaryList.reduce(deduplicate, []);
    const CARD_NUM = 5;

    while (diariesData.length) {
      const cardLine = this.makeCardLine(diariesData.splice(0, CARD_NUM));
      note.appendChild(cardLine);
    }
  }

  async getMyDiary() {
    // function of util.js
    const diaries = await getResourceByUrl('/api/diaries');

    if (diaries[Symbol.iterator]) {
      this.diaryList.push(...diaries);
      if (!this.diaryList.length) {
        // NOTE : 데이터가 없는 경우
      }
      this.sortDiariesByTime();
    } else {
      // NOTE : get 요청에 실패한 경우.
      document.cookie['auth'] = '';
      window.location.href = '/';
    }
  }
}
