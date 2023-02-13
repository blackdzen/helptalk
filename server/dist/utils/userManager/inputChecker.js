// The function accepts a string and returns false if the string is empty or true if not
function isExist(input) {
    return !!input.trim();
}
// The function accepts a string and returns false if string has more than a one word or true if not.
function isInOneWord(input) {
    return input.trim().split(" ").length == 1 ? true : false;
}
export default {
    isExist,
    isInOneWord,
};
