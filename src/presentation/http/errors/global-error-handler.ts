import type { Context } from "hono";
import type { HTTPResponseError } from "hono/types";
import { DomainException } from "@/domain/common/exceptions/domain.exception";
import { DomainErrorType } from "@/domain/common/exceptions/error-types";

// Table de correspondance (Mapping) simple
const statusMap: Record<DomainErrorType, number> = {
  [DomainErrorType.NOT_FOUND]: 404,
  [DomainErrorType.CONFLICT]: 409,
  [DomainErrorType.INVALID_ARGUMENT]: 400,
  [DomainErrorType.UNAUTHORIZED]: 403,
  [DomainErrorType.INTERNAL]: 500,
};

export const globalErrorHandler = (err: Error | HTTPResponseError, c: Context) => {
  // Si c'est une exception de notre Domain (Users, Posts, Invoices...)
  if (err instanceof DomainException) {
    const statusCode = statusMap[err.type] || 500;
    
    return c.json({
      error: err.name,    // Ex: "UserNotFoundException"
      message: err.message
    }, statusCode as any);
  }

  // Erreurs non gérées (bugs, crash DB...)
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
};