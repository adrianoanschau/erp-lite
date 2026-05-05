export async function login(email: string, password: string) {
    const response = await window.api.invoke('auth', 'login', email, password);
    window.electron.send('auth-success', response.session);
    
    return response;
}

export async function logout() {
    await window.api.invoke('auth', 'logout');
    window.electron.send('logout');
}
