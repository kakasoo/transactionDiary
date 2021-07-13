function changeOpacity(element) {
  const opacity = element.style.opacity;
  element.style.opacity = opacity ? '' : 1;
}

function changeZIndex(element) {
  const zIndex = element.style.zIndex;
  const VISIBLE = 10;
  const INVISIBLE = -10;
  const invisible = (value) => !value || value < 0;

  element.style.zIndex = invisible(zIndex) ? VISIBLE : INVISIBLE;
}

function getLoginModal() {
  const loginModal = document.getElementById('loginModal');
  changeOpacity(loginModal);
  changeZIndex(loginModal);
}

// TODO : password에서 enter 누를 시에 동작하게 해야 한다.
async function localLogin() {
  const adress = document.getElementById('inputOfAdress').value;
  const password = document.getElementById('inputOfPassword').value;
  if (!adress || !password) {
    // TODO : 경고 문구를 loginModal에서 보여주면 좋을 것 같다.
    // throw new Error('아이디나 비밀번호를 다시 확인해주세요!');
    return;
  }

  const loginResponse = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      adress: adress,
      password: password,
    }),
  });

  if (loginResponse.ok) {
    const { access_token } = await loginResponse.json();
    document.cookie = `auth=${access_token}`;
    window.location.href = '/main';
    return true;
  }

  alert('로그인에 실패하였습니다.');
  return false;
}
