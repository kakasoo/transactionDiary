class GroupSection {
  constructor() {
    this.groupIntro = document.getElementById('groupIntro');
    this.getGroups();
  }

  async getGroups() {
    const groups = await getResourceByUrl('/api/groups/visible');
    console.log(groups);
  }
}
