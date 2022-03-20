interface User {
  id: string,
  email: string,
  password: string,
  fullname: string,
  isActive: boolean,
  isDeleted: boolean,
  createdDate: Date,
  token: string,
}

export default User
