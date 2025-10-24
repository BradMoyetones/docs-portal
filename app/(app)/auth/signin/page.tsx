"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams, useRouter, redirect } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // La URL a la que intentó acceder
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            password,
            redirect: false,
            callbackUrl
        });

        if (result?.error) {
            setError("Contraseña incorrecta");
            setLoading(false);
        } else {
            // Redirige a la página que intentó acceder
            router.push(callbackUrl);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8 bg-background rounded-lg">
                <div>
                    <Button 
                        variant={"outline"} 
                        type="button"
                        onClick={() => router.push("/")}
                    >
                        <ArrowLeft /> Ir a Inicio
                    </Button>
                </div>
                <h1 className="text-2xl font-bold">Acceso Restringido</h1>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la contraseña"
                    className="w-full rounded border p-2"
                    disabled={loading}
                />
                {error && <p className="text-destructive">{error}</p>}
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (<><Spinner />Verificando...</>) : (<>Acceder <ArrowRight /></>)}
                </Button>
            </form>
        </div>
    );
}