export class UserManagement {
  static isLoggedIn = () => {
    if (typeof window !== "undefined" && localStorage.getItem("token"))
      return true;
    return false;
  };
  static isServer = () => typeof window === "undefined";

  static setItem = (key, value) => {
    return !UserManagement.isServer() && localStorage.setItem(key, value);
  };

  static getItem = (key) => {
    return !UserManagement.isServer() && localStorage.getItem(key);
  };
  static getFilterData = () => {
    if (typeof window !== "undefined" && localStorage.getItem("columnFilter"))
      return JSON.parse(localStorage.getItem("columnFilter"));
    return false;
  };
}
