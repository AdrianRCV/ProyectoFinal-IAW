"use client";  

import { useRouter } from "next/navigation";  

export default function NotFound() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/");  
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Página no encontrada</h2>
            <p>La ruta que has intentado acceder no existe.</p>
            <button onClick={handleRedirect} style={{ padding: "10px 10px", cursor: "pointer", marginTop: "10px" }}>
                Regresar al inicio
            </button>
        </div>
    );
}