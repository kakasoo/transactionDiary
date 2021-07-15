class SearchBar {
  constructor(diary) {
    this.diaryInstance = diary;
    this.search = document.getElementById('search');
    this.search.oninput = this.searchContent();
  }

  searchContent() {
    const diaryInstance = this.diaryInstance;
    return function () {
      const searched = document.getElementById('search').value;
      const newArr = diaryInstance.diaryList.filter((diary) => {
        const { TITLE, CONTENT } = diary;

        if (TITLE.includes(searched)) {
          return true;
        }
      });

      const note = document.getElementById('note');
      while (note.firstChild) {
        note.removeChild(note.firstChild);
      }
      diaryInstance.sortDiariesByTime(newArr);
    };
  }
}
