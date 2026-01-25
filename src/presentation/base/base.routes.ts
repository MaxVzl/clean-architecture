import { Hono } from "hono"
import { baseController } from "@/presentation/base/base.di"

export const baseRoutes = new Hono()

baseRoutes.get('/', baseController.handle)