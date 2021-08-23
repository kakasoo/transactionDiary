class LoginModal {
  constructor() {
    this.loginButton = $('loginButton');
    this.localLoginButton = $('localLogin');
    this.closeButton = $('closeLoginModal');

    this.mainButton = $('mainButton');
    this.signUpButton = $('signUpButton');

    this.authCookie = getAuthCookie();
    if (this.authCookie && this.authCookie.value) {
      this.loginButton.innerText = 'logout';
      this.loginButton.onclick = deleteAuthCookie;
      this.mainButton.hidden = false;
      this.signUpButton.hidden = true;
    } else {
      this.loginButton.onclick = this.getLoginModal;
      this.mainButton.hidden = true;
      this.signUpButton.hidden = false;
    }
    this.localLoginButton.onclick = this.localLogin;
    this.closeButton.onclick = this.getLoginModal;

    $('loginModalBackground').onclick = this.getLoginModal;
  }

  getLoginModal() {
    const authCookie = getAuthCookie();
    if (authCookie && authCookie.value) {
      // NOTE : 이미 로그인된 상태에서 로그인 모달을 켜지 못하게 한다.
      return;
    }

    const loginModal = $('loginModal');

    // functions of util.js
    changeOpacity(loginModal);
    changeZIndex(loginModal);

    const loginModalBackground = $('loginModalBackground');
    const modalBackgroundColor = loginModalBackground.style.background;
    if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
      loginModalBackground.style.background = 'black';
      loginModalBackground.style.zIndex = 5;
    } else {
      loginModalBackground.style.background = 'transparent';
      loginModalBackground.style.zIndex = -10;
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
      const { data } = await loginResponse.json();
      const { access_token } = data;
      document.cookie = `auth=${access_token}`;
      window.location.href = '/main';
      return true;
    }

    alert('로그인에 실패하였습니다.');
    return false;
  }
}
