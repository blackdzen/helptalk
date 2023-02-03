interface ICommentator {
  commentTypes: Set<string>,
  departureCommentParts: Map<string, { title: string, value: string }>,
  closeCommentParts: Map<string, { title: string, value: string }>,
  setParts: (commentType: string, pairs: Array<[string, string]>) => void,
  getComment: (commentType: string) => string,
  getCommentParts: (commentType: string) => Map<string, { title: string, value: string }>,
}

export default ICommentator
