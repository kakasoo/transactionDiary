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
    const cardLine = CE('section');
    cardLine.style.display = 'flex';
    cardLine.style.width = '100%';

    while (groups.length < 4) {
      groups.push({
        id: null,
        name: '',
      });
    }

    for (const group of groups) {
      const { id, name } = group;
      const card = CE('div');

      if (id) {
        card.onclick = this.joinGroup(id);

        const cardHead = CE('div');
        cardHead.className = 'groupCardHead';

        const cardBody = CE('div');
        cardBody.className = 'groupCardBody';
        cardBody.innerHTML = `<h2 class ="groupName" style= "font-size : 20px; font-weight : 300;">${name}</h2>`;

        card.id = `card${id}`;
        card.className = 'groupCard';

        card.append(cardHead, cardBody);
      }

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
