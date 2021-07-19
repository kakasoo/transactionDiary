function $(id) {
  return document.getElementById(id);
}

function deduplicate(acc, current) {
  if (acc.findIndex(({ DIARY_ID }) => DIARY_ID === current.DIARY_ID) === -1) {
    acc.push(current);
  }
  return acc;
}

function getAuthCookie() {
  const cookies = document.cookie.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=');
    return { key, value };
  });
  const [authCookie] = cookies.filter((cookie) => cookie.key === 'auth');
  return authCookie;
}

function deleteAuthCookie() {
  console.log(document.cookie);
}

async function getResourceByUrl(url) {
  const authCookie = getAuthCookie();

  if (!authCookie) {
    return;
  }
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${authCookie.value}`,
    },
  });
  const resource = await response.json();
  return resource;
}

async function postDataByUrl(url, data, cookie = true) {
  const headers = { 'Content-type': 'application/json' };

  if (cookie) {
    const authCookie = getAuthCookie();
    headers['Authorization'] = `bearer ${authCookie.value}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  return response;
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
