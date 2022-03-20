export type RegisterUserResponseDTO = {
  id: string,
  email: string,
  fullname: string,
  isActive: boolean,
  createdDate: Date,
}

export type LoginUserResponseDTO = RegisterUserResponseDTO & {
  token: string,
}

export type LoginUserRequestDTO = {
  email: string,
  password: string,
}

export type RegisterUserRequestDTO = LoginUserRequestDTO & {
  fullname: string,
}
