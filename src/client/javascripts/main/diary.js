function makeCardLine(partOfDiaries) {
  const cardLine = document.createElement('section');
  for (const diary of partOfDiaries) {
    const { DIARY_ID, GROUP_ID, TITLE, CONTENT, UPDATED_AT } = diary;

    const card = document.createElement('div');
    // function of detailDiary.js
    card.onclick = getDetailDiaryModal;
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

function sortDiariesByTime(diaries) {
  const note = document.getElementById('note');
  const CARD_NUM = 5;

  while (diaries.length) {
    const cardLine = makeCardLine(diaries.splice(0, CARD_NUM));
    note.appendChild(cardLine);
  }
}

async function getMyDiary() {
  // function of util.js
  const authCookie = getAuthCookie();

  const response = await fetch('/api/diaries', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${authCookie.value}`,
    },
  });
  const diaries = await response.json();

  if (diaries[Symbol.iterator]) {
    sortDiariesByTime(diaries);
  }
}

getMyDiary();
