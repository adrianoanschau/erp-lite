import { supabase } from "./supabase";

export class SessionService {
  async getInitialSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
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
};