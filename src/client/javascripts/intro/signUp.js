class SignUpModal {
  constructor() {
    this.signUpButton = document.getElementById('signUpButton');
    this.localSignUpButton = document.getElementById('localSignUp');
    this.closeButton = document.getElementById('closeSignUpModal');

    this.signUpButton.onclick = this.getSignUpModal;
    this.localSignUpButton.onclick = this.localSignUp;
    this.closeButton.onclick = this.getSignUpModal;
  }

  getSignUpModal() {
    const signUpModal = document.getElementById('signUpModal');

    // functions of util.js
    changeOpacity(signUpModal);
    changeZIndex(signUpModal);

    const modalBackground = document.getElementById('modalBackground');
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
  async localSignUp() {
    const adress = document.getElementById('inputOfSignUpAdress').value;
    const password = document.getElementById('inputOfSignUpPassword').value;
    const nickname = document.getElementById('inputOfSignUpNickname').value;
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
