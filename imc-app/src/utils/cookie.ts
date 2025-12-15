export function setCookie(name: string, value: unknown, days = 365) {
  const json = JSON.stringify(value);
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${json}; expires=${expires}; path=/`;
}

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (!match) return null;

  try {
    return JSON.parse(match[2]);
  } catch {
    return null;
  }
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

const AUTH_COOKIE = "bmi-auth";

export function setAuthCookie(token: string) {
  setCookie(AUTH_COOKIE, { token });
}

export function getAuthCookie(): { token: string } | null {
  return getCookie(AUTH_COOKIE);
}

export function deleteAuthCookie() {
  deleteCookie(AUTH_COOKIE);
}


