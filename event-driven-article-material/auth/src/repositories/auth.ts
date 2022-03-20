import { Connection, Schema, Model } from 'mongoose'

import { User } from '../models'
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from '../dtos'

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
  isDeleted: { type: Boolean, required: true, default: false },
  createdDate: { type: Date, required: true, default: Date.now },
})

export interface IAuthRepository {
  create(user: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>
  findByEmail(email: string): Promise<User | null>
}

class AuthRepository implements IAuthRepository {
  private readonly User: Model<User>

  constructor(user: Model<User>) {
    this.User = user
  }

  async create(user: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO> {
    try {
      const newUser = new this.User({
        email: user.email,
        password: user.password,
        fullname: user.fullname,
      })
      return await newUser.save()
    } catch (error) {
      throw Error(`Error creating user: ${error}`)
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.User.findOne({ email })
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`)
    }
  }
}

function createAuthRepository(conn: Connection): AuthRepository {
  const userModel = conn.model<User>('User', schema)
  return new AuthRepository(userModel)
}

export default createAuthRepository
