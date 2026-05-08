import { supabase } from './supabase';
import { StorageService } from './storage.service';

export class SessionService {
  async getInitialSession() {
    const savedToken = StorageService.getToken();
    if (savedToken) {
      try {
        const parsed = JSON.parse(savedToken);
        if (parsed.access_token && parsed.refresh_token) {
          await supabase.auth.setSession({
            access_token: parsed.access_token,
            refresh_token: parsed.refresh_token,
          });
        }
      } catch (e) {
        console.error('Falha ao analisar o token salvo:', e);
      }
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, status, full_name')
      .eq('id', session.user.id)
      .maybeSingle();

    if (!profile || profile.status !== 'active') {
      await supabase.auth.signOut();
      return null;
    }

    return { user: session.user, profile };
  }
}
