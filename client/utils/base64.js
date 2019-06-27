export default {
    encode(s) {
        return window.btoa(encodeURIComponent(s));
    },
    decode(s) {
        return decodeURIComponent(window.atob(s));
    }
}