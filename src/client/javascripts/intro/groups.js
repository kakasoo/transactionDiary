class GroupSection {
  constructor() {
    this.groupIntro = $('groupIntro');
    this.groupList = [];

    this.getGroups();
  }

  joinGroup(groupId) {
    return async function () {
      const returned = confirm('해당 그룹에 가입하시겠습니까?');

      const auth = getAuthCookie();
      if (!auth || !auth.value) {
        alert('로그인을 먼저 해주셔야 합니다.');
        return;
      }

      if (returned) {
        await postDataByUrl('/api/groups/join', {
          groupId,
        });
      }
    };
  }

  makeGroupLine(groups) {
    const cardLine = CE({ tag: 'section' });
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
      const card = CE({ tag: 'div' });

      if (id) {
        card.onclick = this.joinGroup(id);

        const cardHead = CE({ tag: 'div' });
        cardHead.className = 'groupCardHead';

        const cardBody = CE({ tag: 'div' });
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
    const groups = await getResourceByUrlWithoutAuth('/api/groups/visible');
    if (groups && groups.length) {
      this.groupList.push(...groups);
    }
    this.render();
  }
}
