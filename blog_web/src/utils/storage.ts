/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
const prefix = "qbitnet-";

export enum OccupiedKey {
  User = "user",
  NextPage = "next-page"
}

//#region basic

/** 保存本地数据 */
export const saveLocal = (key: string, value: any) => {
  const id = (getUser()?.userId || "0") + "-";
  if (typeof value === "object") value = JSON.stringify(value);
  localStorage.setItem(prefix + id + key, value);
};

/** 读取本地数据 */
export const getLocal = (key: string) => {
  const id = (getUser()?.userId || "0") + "-";
  return localStorage.getItem(prefix + id + key);
};

/** 清除会话数据 */
export const clearLocal = (key?: string) => {
  return key ? localStorage.removeItem(prefix + key) : localStorage.clear();
};

/** 保存会话数据 */
export const saveSession = (key: string, value: any, force?: boolean) => {
  const occupied = Object.keys(OccupiedKey).find(
    key => (OccupiedKey as any)[key] === key
  );
  if (!force && occupied) {
    throw new Error(`${key} 已被使用`);
  }
  if (typeof value === "object") value = JSON.stringify(value);
  sessionStorage.setItem(prefix + key, value);
};
/** 读取会话数据 */
export const getSession = (key: string) => {
  return sessionStorage.getItem(prefix + key);
};

/** 清除会话数据 */
export const clearSession = (key?: string) => {
  return key ? sessionStorage.removeItem(prefix + key) : sessionStorage.clear();
};
//#endregion basic

/** 保存用户信息，用于自动登录 */
export const saveUser = (data: any) => {
  return saveSession(OccupiedKey.User, data, true);
};

/** 读取用户信息 */
export const getUser = () => {
  const userJSON = getSession(OccupiedKey.User);
  if (userJSON) return JSON.parse(userJSON);
  return null;
};

/** 保存被拦截的路径，登陆后跳转 */
export const saveNextPage = (nextPage: string) => {
  return saveSession(OccupiedKey.NextPage, nextPage);
};

/** 读取被拦截的路径并清除 */
export const getNextPage = () => {
  const next = getSession(OccupiedKey.NextPage);
  clearSession(OccupiedKey.NextPage);
  return next;
};
