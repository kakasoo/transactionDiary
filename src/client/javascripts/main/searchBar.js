class SearchBar {
  constructor(diary) {
    this.diaryInstance = diary;
    this.search = $('search');
    this.search.oninput = this.searchContent();
  }

  searchContent() {
    const diaryInstance = this.diaryInstance;
    return function () {
      const searched = $('search').value;
      const newArr = diaryInstance.diaryList.filter((diary) => {
        const { TITLE, CONTENT } = diary;

        if (TITLE.includes(searched)) {
          return true;
        }

        if (CONTENT.includes(search)) {
          return true;
        }
      });

      const note = $('note');
      while (note.firstChild) {
        note.removeChild(note.firstChild);
      }
      diaryInstance.sortDiariesByTime(newArr);
    };
  }
}
