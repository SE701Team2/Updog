export default class UserDTO {
  static async convertToDto(user) {
    return {
      username: user.username,
    }
  }
}
