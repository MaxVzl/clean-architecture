import type { Context } from "hono";
import type { HTTPResponseError } from "hono/types";
import { NotFoundException } from "@/domain/common/exceptions/not-found.exception";
import { ConflictException } from "@/domain/common/exceptions/conflict.exception";
import { InvalidArgumentException } from "@/domain/common/exceptions/invalid-argument.exception";
import { UnauthorizedException } from "@/domain/common/exceptions/unauthorized.exception";
import { InternalException } from "@/domain/common/exceptions/internal.exception";

export const globalErrorHandler = (err: Error | HTTPResponseError, c: Context) => {
  // 1. Est-ce une erreur de type "Introuvable" ?
  if (err instanceof NotFoundException) {
    return c.json({ error: err.name, message: err.message }, 404);
  }

  // 2. Est-ce une erreur de type "Conflit" ?
  if (err instanceof ConflictException) {
    return c.json({ error: err.name, message: err.message }, 409);
  }

  // 3. Est-ce une erreur de type "Validation" ?
  if (err instanceof InvalidArgumentException) {
    return c.json({ error: err.name, message: err.message }, 400);
  }

  // 4. Est-ce une erreur de type "Non Autorisé" ?
  if (err instanceof UnauthorizedException) {
    return c.json({ error: err.name, message: err.message }, 403);
  }

  // 5. Est-ce une erreur de type "Interne" ?
  if (err instanceof InternalException) {
    return c.json({ error: err.name, message: err.message }, 500);
  }

  // Fallback
  return c.json({ error: "InternalException", message: "Internal Server Error" }, 500);
};