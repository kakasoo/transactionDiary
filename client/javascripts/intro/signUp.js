class SignUpModal {
  constructor() {
    this.signUpButton = $('signUpButton');
    this.localSignUpButton = $('localSignUp');
    this.closeButton = $('closeSignUpModal');

    this.signUpButton.onclick = this.getSignUpModal;
    this.localSignUpButton.onclick = this.localSignUp;
    this.closeButton.onclick = this.getSignUpModal;
    $('signUpModalBackground').onclick = this.getSignUpModal;
  }

  getSignUpModal() {
    const signUpModal = $('signUpModal');

    // functions of util.js
    changeOpacity(signUpModal);
    changeZIndex(signUpModal);

    const signUpModalBackground = $('signUpModalBackground');
    const modalBackgroundColor = signUpModalBackground.style.background;
    if (modalBackgroundColor === 'transparent' || !modalBackgroundColor) {
      signUpModalBackground.style.background = 'black';
      signUpModalBackground.style.zIndex = 5;
    } else {
      signUpModalBackground.style.background = 'transparent';
      signUpModalBackground.style.zIndex = -10;
    }
  }

  // TODO : password에서 enter 누를 시에 동작하게 해야 한다.
  async localSignUp() {
    const adress = $('inputOfSignUpAdress').value;
    const password = $('inputOfSignUpPassword').value;
    const nickname = $('inputOfSignUpNickname').value;
    if (!adress || !password || !nickname) {
      // TODO : 경고 문구를 signUpModal에서 보여주면 좋을 것 같다.
      // throw new Error('아이디나 비밀번호를 다시 확인해주세요!');
      return;
    }

    const signUpResponse = await postDataByUrl(
      '/api/users/sign-up',
      { adress, password, nickname },
      false,
    );

    if (signUpResponse.ok) {
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
    }

    alert('회원가입에 실패하였습니다.');
    return false;
  }
}
