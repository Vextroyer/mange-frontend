"use client"; // Marcar como componente de cliente

import { useRouter } from 'next/navigation'; // Para App Router
import { useEffect, useState } from 'react';

export default function RedirectButton() {
  const router = useRouter(); // Hook para redirigir
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado para comprobar permisos

  // Simular una función para verificar permisos
  const checkAccess = async () => {
    try {
      // Aquí se simula una llamada al backend para verificar permisos
      const token = localStorage.getItem('token'); // Verificar si existe un token
      if (token) {
        const response = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setIsAuthorized(data.hasAccess); // Actualiza si el usuario tiene acceso
      } else {
        setIsAuthorized(false); // No hay token, no está autorizado
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      setIsAuthorized(false);
    }
  };

  // Función para redirigir después de comprobar el acceso
  const goToHome = () => {
    if (isAuthorized) {
      router.push('/home'); // Redirige si tiene acceso
    } else {
      alert('No tienes acceso a esta página'); // Muestra un mensaje si no tiene acceso
    }
  };

  // Verifica el acceso cuando se carga el componente
  useEffect(() => {
    checkAccess(); // Llama a la función al cargar
  }, []); // Solo se ejecuta una vez

  return (
    <button
      onClick={goToHome}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Ir a Home
    </button>
  );
}
