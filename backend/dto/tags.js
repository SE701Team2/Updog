export default class TagDTO {
  static convertToDTO(tag) {
    return {
      id: tag.id,
      tagName: tag.tagName,
    }
  }
}
