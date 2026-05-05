import { supabase } from "./supabase";

export class AuthService {
  async login(email: string, password: string) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw new Error(authError.message);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, role, status')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (profileError || profile?.status !== 'active') {
      throw new Error('Usuário inativo ou perfil não encontrado.');
    }

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: profile.full_name,
        role: profile.role,
      },
      session: authData.session,
    };
  }
}
