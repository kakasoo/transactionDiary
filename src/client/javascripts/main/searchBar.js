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
        const { title, content } = diary;

        if (title.includes(searched)) {
          return true;
        }

        if (content.includes(search)) {
          return true;
        }
      });

      console.log('here');
      diaryInstance.sortDiariesByTime(newArr);
    };
  }
}
