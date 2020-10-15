// 存储cookie
function setCookie(cName, cValue) {
  sessionStorage.setItem(cName, JSON.stringify(cValue));
}
// 获取cookie
function getCookie(cName) {
  return JSON.parse(sessionStorage.getItem(cName));
}

function clearCookie() {
  sessionStorage.clear();
}
export default {
  setCookie: setCookie,
  getCookie: getCookie,
  clearCookie: clearCookie
};
