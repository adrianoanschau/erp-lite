import { SupabaseProductRepository } from '../app/repositories';
import { AuthService, SessionService } from '../app/services';

export const serviceRegistry = {
  auth: new AuthService(),
  session: new SessionService(),
  products: new SupabaseProductRepository(),
} as const;
