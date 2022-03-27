export default class TagDTO {
  static async converToDTO(tag) {
    return {
      id: tag.id,
      tagName: tag.tagName,
    }
  }
}
