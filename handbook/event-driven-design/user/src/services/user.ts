import { generatePassword } from '../utils'
import { IUserRepository, User } from '../repositories'

export interface IUserService {
  create(user: User): Promise<User>
  createFromAuth(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findAll(skip: number, take: number): Promise<Array<User>>
  update(user: User): Promise<User | null>
  delete(id: string): Promise<User | null>
}

class UserService implements IUserService {
  private userRepo: IUserRepository

  private publisher: (msg: string) => void

  constructor(userRepo: IUserRepository, publisher: (msg: string) => void) {
    this.userRepo = userRepo
    this.publisher = publisher
  }

  async create(user: User): Promise<User> {
    user.password = generatePassword(user.password || '')
    const result = await this.userRepo.create(user)
    const payload = {
      action: 'CREATE',
      data: {
        id: result.id,
        email: result.email,
        password: result.password,
        role: result.role,
        fullname: result.fullname,
        isActive: result.isActive,
        isDeleted: result.isDeleted,
        createdDate: result.createdDate,
      },
    }
    this.publisher(JSON.stringify(payload))
    return result
  }

  async createFromAuth(user: User): Promise<User> {
    return this.userRepo.createFromAuth(user)
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id)
  }

  async findAll(skip: number, take: number): Promise<Array<User>> {
    return this.userRepo.findAll(skip, take)
  }

  async update(user: User): Promise<User | null> {
    const payload = {
      action: 'UPDATE',
      data: user,
    }
    this.publisher(JSON.stringify(payload))
    return this.userRepo.update(user)
  }

  async delete(id: string): Promise<User | null> {
    const payload = {
      action: 'DELETE',
      data: { id },
    }
    this.publisher(JSON.stringify(payload))
    return this.userRepo.delete(id)
  }
}

function createUserService(userRepo: IUserRepository, publisher: (msg: string) => void): IUserService {
  return new UserService(userRepo, publisher)
}

export default createUserService
