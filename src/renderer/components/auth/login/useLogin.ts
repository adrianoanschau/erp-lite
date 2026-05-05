import { login } from "@/renderer/functions/auth";
import { useState } from "react";

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSetData = (field: 'email' | 'password', value: string) => {
        if (field === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            console.log('Sucesso ao autenticar:', response.user.email);
        } catch (err: { message: string }) {
            setError(err?.message || 'Falha na autenticação. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return {
        data: {
            email,
            password,
        },
        loading,
        error,
        setData: handleSetData,
        onSubmit: handleSubmit,
    }
}