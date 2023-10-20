export function stringtoNull(obj) {
    if (obj === "") {
        return null;
    }
    if (typeof obj === 'object') {
        for (let key in obj) {
            obj[key] = stringtoNull(obj[key]);
        }
    }
    return obj;
  }