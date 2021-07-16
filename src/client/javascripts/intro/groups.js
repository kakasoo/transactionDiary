class GroupSection {
  constructor() {
    this.groupIntro = document.getElementById('groupIntro');
    this.groupList = [];

    this.getGroups();
  }

  makeGroupLine(groups) {
    const cardLine = document.createElement('section');
    cardLine.style.display = 'flex';

    for (const group of groups) {
      const { id, name } = group;

      const card = document.createElement('div');

      card.id = `card${id}`;
      card.className = 'card';
      card.innerHTML = `
      <div class = 'innerCard'>
        <h2>${name}</h2>
      </div>
      `;

      cardLine.appendChild(card);
    }
    return cardLine;
  }

  render() {
    const GROUP_NUM = 5;
    const groups = [...this.groupList];

    while (groups.length) {
      const groupLine = this.makeGroupLine(groups.splice(0, GROUP_NUM));
      this.groupIntro.appendChild(groupLine);
    }
  }

  async getGroups() {
    const groups = await getResourceByUrl('/api/groups/visible');
    this.groupList.push(...groups);

    this.render();
  }
}
