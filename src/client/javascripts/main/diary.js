async function getMyDiary() {
  const cookies = document.cookie.split(';').map((cookie) => {
    const [key, value] = cookie.split('=');
    return { key, value };
  });
  const [authCookie] = cookies.filter((cookie) => cookie.key === 'auth');

  const response = await fetch('/api/diaries', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${authCookie.value}`,
    },
  });
  const diaries = await response.json();

  const note = document.getElementById('note');
  for (const a of diaries) {
    const diary = document.createElement('div');
    note.appendChild(diary);
  }
}
getMyDiary();
