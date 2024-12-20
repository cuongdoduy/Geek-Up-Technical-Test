import * as bcrypt from 'bcryptjs'

export class PasswordUtils {
  // Static method to hash a password
  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
  }

  // Static method to verify a password
  static async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
