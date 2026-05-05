export async function getInitialSession() {
    return await window.api.invoke('session', 'getInitialSession');
}
