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
    return true;
  }
  return false;
}
