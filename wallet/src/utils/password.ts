import bcrypt from 'bcryptjs'

const generatePassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password)
}

const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export {
  comparePassword,
  generatePassword,
}
