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
            <button
    onClick={handleRedirect}
    style={{ width: "20%", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "1rem", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer", transition: "0.3s ease-in-out" }}
>
    Regresar al inicio
</button>

        </div>
    );
}   