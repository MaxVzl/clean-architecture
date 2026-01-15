export type CreateUserDto = {
  name: string
  email: string
  emailVerified: boolean
  image: string | null
}