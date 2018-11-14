let storageHelper = {
    getItem,
    setItem,
    removeItem,
  };
  
  function getItem(name, prefix) {
    const newName = addPrefix(name, prefix);
    const storeData = JSON.parse(localStorage.getItem(newName));
    if (storeData === null) return null;
    const { value, options } = storeData;
    const { expire, storeTime } = options;
    if (expire === undefined) {
      return value;
    } else {
      if (storeTime - new Date().getTime() > 0) {
        return value;
      } else {
        localStorage.removeItem(newName);
        return null;
      }
    }
  }
  
  function setItem(name, value, options) {
    options = options || {};
    if (options.expire) options.storeTime = new Date().getTime() + options.expire*24*60*60*1000;
    const newName = addPrefix(name, options.prefix);
    localStorage.setItem(newName, JSON.stringify({value,options}));
  }
  
  function removeItem(name, prefix) {
    const newName = addPrefix(name, prefix);
    localStorage.removeItem(newName);
  }
  
  function addPrefix(name, prefix) {
    return prefix ? `${prefix}:${name}` : name;
  }
  
  export default storageHelper;
      