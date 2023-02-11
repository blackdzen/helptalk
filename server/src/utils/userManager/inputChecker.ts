function isExist(input: string): boolean {
  return !!input.trim();
}

function isInOneWord(input: string): boolean {
  return input.trim().split(" ").length == 1 ? true : false;
}

export default {
  isExist,
  isInOneWord,
};
