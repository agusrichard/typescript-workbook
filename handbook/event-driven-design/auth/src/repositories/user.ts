import mongoosePaginate from 'mongoose-paginate-v2'
import { Connection, Schema, PaginateModel } from 'mongoose'

export interface User {
  id?: string
  email: string
  password?: string
  role: number
  isActive?: boolean
  isDeleted?: boolean
  fullname?: string
  createdDate?: Date
  accessToken?: string
  refreshToken?: string
}

const schema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  fullname: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
  isDeleted: { type: Boolean, required: true, default: false },
  createdDate: { type: Date, required: true, default: Date.now },
})

export interface IUserRepository {
  create(user: User): Promise<User>
  createFromUser(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findAll(skip: number, take: number): Promise<Array<User>>
  update(data: User): Promise<User | null>
  delete(id: string): Promise<User | null>
}

type UserModel = PaginateModel<User>

class UserRepository implements IUserRepository {
  private User: UserModel

  constructor(user: UserModel) {
    this.User = user
  }

  async create(user: User): Promise<User> {
    try {
      const newUser = new this.User({
        email: user.email,
        password: user.password,
        role: user.role,
        fullname: user.fullname,
      })
      return await newUser.save()
    } catch (error) {
      throw Error(`Error creating user: ${error}`)
    }
  }

  async createFromUser(user: User): Promise<User> {
    try {
      const newUser = new this.User({
        _id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        fullname: user.fullname,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
        createdDate: user.createdDate,
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

  async findById(id: string): Promise<User | null> {
    try {
      return await this.User.findOne({ _id: id })
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`)
    }
  }

  async findAll(skip: number, take: number): Promise<Array<User>> {
    try {
      const result = await this.User.paginate({}, { offset: skip, limit: take })
      const { docs } = result
      return docs
    } catch (error) {
      throw Error(`Error finding user by email: ${error}`)
    }
  }

  async update(data: User): Promise<User | null> {
    try {
      console.log('data.id', data.id)
      return await this.User.findByIdAndUpdate(data.id || '', data, { new: true })
    } catch (error) {
      throw Error(`Error creating user: ${error}`)
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      return await this.User.findByIdAndUpdate(id, { isDeleted: true, isActive: false }, { new: true })
    } catch (error) {
      throw Error(`Error creating user: ${error}`)
    }
  }
}

function createUserRepository(conn: Connection): UserRepository {
  schema.plugin(mongoosePaginate)
  const userModel = conn.model<User>('User', schema) as UserModel
  const userRepo = new UserRepository(userModel)
  return userRepo
}

export default createUserRepository
