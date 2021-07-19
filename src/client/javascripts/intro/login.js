class LoginModal {
  constructor() {
    this.loginButton = $('loginButton');
    this.localLoginButton = $('localLogin');
    this.closeButton = $('closeLoginModal');

    this.authCookie = getAuthCookie();
    if (this.authCookie) {
      this.loginButton.innerText = 'logout';
      this.loginButton.onclick = deleteAuthCookie;
    } else {
      this.loginButton.onclick = this.getLoginModal;
    }

    this.localLoginButton.onclick = this.localLogin;
    this.closeButton.onclick = this.getLoginModal;
  }

  getLoginModal() {
    const authCookie = getAuthCookie();
    if (authCookie) {
      // NOTE : 이미 로그인된 상태에서 로그인 모달을 켜지 못하게 한다.
      return;
    }

    const loginModal = $('loginModal');

    // functions of util.js
    changeOpacity(loginModal);
    changeZIndex(loginModal);

    const modalBackground = $('modalBackground');
    const modalBackgroundColor = modalBackground.style.background;
    if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
      modalBackground.style.background = 'black';
      modalBackground.style.zIndex = 5;
    } else {
      modalBackground.style.background = 'transparent';
      modalBackground.style.zIndex = -10;
    }
  }

  // TODO : password에서 enter 누를 시에 동작하게 해야 한다.
  async localLogin() {
    const adress = $('inputOfAdress').value;
    const password = $('inputOfPassword').value;
    if (!adress || !password) {
      // TODO : 경고 문구를 loginModal에서 보여주면 좋을 것 같다.
      // throw new Error('아이디나 비밀번호를 다시 확인해주세요!');
      return;
    }

    const loginResponse = await postDataByUrl(
      '/api/users/login',
      { adress, password },
      false,
    );

    if (loginResponse.ok) {
      const { access_token } = await loginResponse.json();
      document.cookie = `auth=${access_token}`;
      window.location.href = '/main';
      return true;
    }

    alert('로그인에 실패하였습니다.');
    return false;
  }
}
