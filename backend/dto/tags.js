export default class TagDTO {
  static async convertToDTO(tag) {
    return {
      id: tag.id,
      tagName: tag.tagName,
    }
  }
}
