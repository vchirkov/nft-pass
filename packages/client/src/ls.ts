export const ls = {
    set(key, val) {
        if (!window.localStorage) return;
        try {
            return window.localStorage.setItem(key, JSON.stringify(val));
        } catch {
        }
    },
    get(key) {
        if (!window.localStorage) return;
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch {
        }
    }
}
