import { User } from "@/domain/users/entities/user.entity";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class MockUsersRepository implements UsersRepository {
  // private users: User[] = []
  private users: User[] = [
    new User('1', 'John Doe', 'john.doe@example.com', 'password', new Date(), new Date()),
    new User('2', 'Jane Doe', 'jane.doe@example.com', 'password', new Date(), new Date()),
    new User('3', 'Jim Doe', 'jim.doe@example.com', 'password', new Date(), new Date()),
  ]

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id)
    if (index === -1) {
      throw new Error('User not found')
    }
    this.users[index] = user
    return user
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}