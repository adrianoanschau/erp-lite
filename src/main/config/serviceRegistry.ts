import { SupabaseProductRepository } from "../app/repositories";
import { AuthService } from "../app/services/auth.service";

export const serviceRegistry = {
  auth: new AuthService(),
  products: new SupabaseProductRepository(),
} as const;