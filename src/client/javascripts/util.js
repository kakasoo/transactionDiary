function getAuthCookie() {
  const cookies = document.cookie.split(';').map((cookie) => {
    const [key, value] = cookie.split('=');
    return { key, value };
  });
  const [authCookie] = cookies.filter((cookie) => cookie.key === 'auth');

  return authCookie;
}

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
