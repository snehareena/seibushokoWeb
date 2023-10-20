export function removeNulls(obj) {
  if (obj === null) {
      return "";
  }
  if (typeof obj === 'object') {
      for (let key in obj) {
          obj[key] = removeNulls(obj[key]);
      }
  }
  return obj;
}