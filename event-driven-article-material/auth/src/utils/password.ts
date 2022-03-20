import bcrypt from 'bcryptjs'

const generatePassword = (password: string): string => {
  return bcrypt.hashSync(password)
}

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}

export {
  comparePassword,
  generatePassword,
}
