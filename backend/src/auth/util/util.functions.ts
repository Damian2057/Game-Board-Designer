const bcrypt = require('bcrypt');

export function comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(newPassword, passwordHash);
}