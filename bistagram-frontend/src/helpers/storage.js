const storage = {};

storage.set = (key, object) => {
    sessionStorage[key] = JSON.stringify(object);
}

storage.get = (key) => {
    if(!sessionStorage[key]) {
        return undefined;
    }
    return JSON.parse(sessionStorage[key]);
}

storage.remove = (key) => {
    if(localStorage[key]) {
        sessionStorage.removeItem(key);
    }
}

export default storage;
