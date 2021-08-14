class HistorySection {
  constructor() {
    this.body = $('userHistory');
    this.history = [];
    this.render();
    this.setColor();
  }

  async getMyDiary() {
    // function of util.js
    const diaries = await getResourceByUrl('/api/diaries');
    return diaries;
  }

  async setColor() {
    const diaries = await this.getMyDiary();
    for (const a of diaries) {
      const date = new Date(a.createdAt);

      const className = `${date.getFullYear()}${numPad(
        date.getMonth() + 1,
      )}${numPad(date.getDate())}`;

      const element = document.getElementById(`${className}`);
      element.style.backgroundColor = 'yellowgreen';
    }
  }

  /**
   *
   * @param {Date} date
   */
  createDateBlock = (date) => {
    const id = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    const dateBlock = createElement({ tag: 'div', id });
    return dateBlock;
  };

  render = (curDate = new Date()) => {
    let i = 0;
    while (++i < 52) {
      const week = createElement({ tag: 'div', className: 'week' });
      for (let j = 0; j < 7; j++) {
        const beforeOneYear = new Date(
          curDate.getFullYear() - 1,
          curDate.getMonth(),
          curDate.getDate() + (i * 7 + j) + 2,
        );
        const thatDay = `${beforeOneYear.getFullYear()}${numPad(
          beforeOneYear.getMonth() + 1,
        )}${numPad(beforeOneYear.getDate())}`;

        const date = createElement({
          tag: 'div',
          className: 'date',
          id: thatDay,
        });

        if (i === 51 && j === 6) {
          date.className += ' today';
        }
        week.appendChild(date);
      }

      this.body.appendChild(week);
    }
  };
}
