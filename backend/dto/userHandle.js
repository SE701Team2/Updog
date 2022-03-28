export default class UserHandleDTO {
  static convertToDto(user) {
    return {
      userId: user.id,
      username: user.username,
    }
  }
}
