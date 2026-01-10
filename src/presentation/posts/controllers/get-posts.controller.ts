import type { Context } from "hono";
import type { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case";

export class GetPostsController {
  constructor(private readonly getPostsUseCase: GetPostsUseCase) {}
  
  public handle = async (c: Context) => {
    return c.json(await this.getPostsUseCase.execute())
  }
}