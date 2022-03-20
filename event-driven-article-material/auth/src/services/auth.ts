import { IAuthRepository } from '../repositories'
import { generatePassword, comparePassword, generateToken } from '../utils'
import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from '../dtos'

export interface IAuthService {
  register(user: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>
  login(user: LoginUserRequestDTO): Promise<LoginUserResponseDTO>
}

type publisher = (msg: string) => void

class AuthService implements IAuthService {
  private readonly repository: IAuthRepository

  private readonly publisher: (msg: string) => void

  constructor(repository: IAuthRepository, pub: publisher) {
    this.repository = repository
    this.publisher = pub
  }

  async register(user: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO> {
    const newUser = {
      ...user,
      password: generatePassword(user.password),
    }
    const result = await this.repository.create(newUser)
    const payload = {
      action: 'CREATE',
      data: {
        id: result.id,
        email: result.email,
        fullname: result.fullname,
        isActive: result.isActive,
        createdDate: result.createdDate,
      },
    }
    this.publisher(JSON.stringify(payload))
    return result
  }

  async login(user: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const userFound = await this.repository.findByEmail(user.email)
    if (!user) {
      throw Error('User not found')
    }

    if (!comparePassword(user.password, userFound?.password || '')) {
      throw Error('Wrong email or password')
    }

    const token = generateToken({ id: String(userFound?.id) })
    const loggedInUser: LoginUserResponseDTO = {
      id: String(userFound?.id),
      email: String(userFound?.email),
      fullname: String(userFound?.fullname),
      isActive: Boolean(userFound?.isActive),
      createdDate: userFound?.createdDate || new Date(),
      token,
    }

    return loggedInUser
  }
}

function createAuthService(repository: IAuthRepository, pub: publisher): AuthService {
  return new AuthService(repository, pub)
}

export default createAuthService
