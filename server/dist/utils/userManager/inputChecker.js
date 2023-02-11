function isExist(input) {
    return !!input.trim();
}
function isInOneWord(input) {
    return input.trim().split(" ").length == 1 ? true : false;
}
export default {
    isExist,
    isInOneWord,
};
