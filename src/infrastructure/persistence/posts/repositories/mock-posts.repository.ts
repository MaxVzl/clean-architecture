import { UUID } from "@/domain/common/value-objects/uuid.vo";
import { Post } from "@/domain/posts/entities/post.entity";
import type { PostsRepository } from "@/domain/posts/repositories/posts.repository";

export class MockPostsRepository implements PostsRepository {
  private posts: Post[] = [
    Post.create('Title 1', 'Content 1', UUID.generate()),
    Post.create('Title 2', 'Content 2', UUID.generate()),
    Post.create('Title 3', 'Content 3', UUID.generate()),
  ]

  async findAll(): Promise<Post[]> {
    return this.posts
  }

  async findById(id: string): Promise<Post | null> {
    return this.posts.find((post) => post.id.value === id) || null
  }

  async create(post: Post): Promise<Post> {
    this.posts.push(post)
    return post
  }

  async update(post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id.equals(post.id))
    if (index === -1) {
      throw new Error('Post not found')
    }
    this.posts[index] = post
    return post
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id.value !== id)
  }
}