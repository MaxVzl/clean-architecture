import { Hono } from "hono"
import { baseController } from "@/presentation/base/base.factory"

export const baseRoutes = new Hono()

baseRoutes.get('/', baseController.handle)