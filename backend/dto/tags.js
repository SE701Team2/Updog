/**
 * A data-transfer-object representing the information of a Tag
 */
export default class TagDTO {
  static convertToDTO(tag) {
    return {
      id: tag.id,
      tagName: tag.tagName,
    }
  }
}
