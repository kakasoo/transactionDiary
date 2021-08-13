function* getAllChildNodes(parent) {
  for (const a of parent.childNodes) {
    yield a;
    for (const b of getAllChildNodes(a)) {
      yield b;
    }
  }
}

function $(id) {
  return document.getElementById(id);
}

function CE({ tag, id, className }) {
  const element = document.createElement(tag);
  if (id) {
    element.id = id;
  }

  if (className) {
    element.className = className;
  }
  return element;
}

function deduplicate(acc, current) {
  if (acc.findIndex(({ diaryId }) => diaryId === current.diaryId) === -1) {
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
  document.cookie = 'auth=;';
  window.location.reload();
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

async function getResourceByUrlWithoutAuth(url) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
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

async function putDataByUrl(url, data, cookie = true) {
  const headers = { 'Content-type': 'application/json' };

  if (cookie) {
    const authCookie = getAuthCookie();
    headers['Authorization'] = `bearer ${authCookie.value}`;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data),
  });

  return response;
}

async function deleteData(url) {
  const headers = { 'Content-type': 'application/json' };

  const authCookie = getAuthCookie();
  headers['Authorization'] = `bearer ${authCookie.value}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: headers,
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
