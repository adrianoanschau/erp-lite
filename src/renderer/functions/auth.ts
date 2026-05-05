export async function login(email: string, password: string) {
    return await window.api.invoke('auth', 'login', email, password);
}
