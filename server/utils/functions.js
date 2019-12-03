module.exports = capitalizeName = (str) => {
    try {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } catch (e) {
        return str;
    }
};