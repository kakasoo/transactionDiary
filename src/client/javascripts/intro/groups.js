class GroupSection {
  constructor() {
    this.groupIntro = $('groupIntro');
    this.groupList = [];

    this.getGroups();
  }

  joinGroup(groupId) {
    return async function () {
      const returned = confirm('해당 그룹에 가입하시겠습니까?');

      if (returned) {
        await postDataByUrl('/api/groups/join', {
          groupId,
        });
      }
    };
  }

  makeGroupLine(groups) {
    const cardLine = document.createElement('section');
    cardLine.style.display = 'flex';

    while (groups.length < 5) {
      groups.push({
        id: null,
        name: '',
      });
    }

    for (const group of groups) {
      const { id, name } = group;

      const card = document.createElement('div');
      card.onclick = this.joinGroup(id);

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
    const GROUP_NUM = 4;
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
