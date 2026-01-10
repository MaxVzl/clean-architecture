import { Post } from "@/domain/posts/entities/post.entity";
import type { PostsRepository } from "@/domain/posts/repositories/posts.repository";

export class MockPostsRepository implements PostsRepository {
  // private posts: Post[] = []
  private posts: Post[] = [
    new Post('1', 'Title 1', 'Content 1', 'user1', new Date(), new Date()),
    new Post('2', 'Title 2', 'Content 2', 'user2', new Date(), new Date()),
    new Post('3', 'Title 3', 'Content 3', 'user3', new Date(), new Date()),
  ]

  async findAll(): Promise<Post[]> {
    return this.posts
  }

  async findById(id: string): Promise<Post | null> {
    return this.posts.find((post) => post.id === id) || null
  }

  async create(post: Post): Promise<Post> {
    this.posts.push(post)
    return post
  }

  async update(post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id === post.id)
    if (index === -1) {
      throw new Error('Post not found')
    }
    this.posts[index] = post
    return post
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id)
  }
}