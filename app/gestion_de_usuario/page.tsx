'use client'; // Indica que este es un componente de cliente

import { useState } from 'react';
import { useRouter } from "next/navigation";

interface User {
  id: number;
  nombre: string;
  sucursal: string;
  tipo: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, nombre: 'Juan Pérez', sucursal: 'Sucursal A', tipo: 'Administrador' },
    { id: 2, nombre: 'María López', sucursal: 'Sucursal B', tipo: 'Usuario Regular' },
  ]);

  const [nombre, setNombre] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [tipo, setTipo] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  //volver a la pagina home
  const handleRedireccion = () => {
    router.push("/home");
  };
  // Agregar un nuevo usuario
  const handleAddUser = () => {
    if (!nombre || !sucursal || !tipo) {
      setNotification('Por favor completa todos los campos.');
      return;
    }

    const newUser: User = {
      id: Date.now(),
      nombre,
      sucursal,
      tipo,
    };

    setUsers([...users, newUser]);
    setNombre('');
    setSucursal('');
    setTipo('');
    setShowForm(false);
    setNotification('Usuario agregado exitosamente.');

    setTimeout(() => setNotification(null), 3000);
  };

  // Eliminar un usuario con confirmación
  const handleDeleteUser = (id: number) => {
    const confirmed = window.confirm('¿Está seguro de que quiere eliminar el usuario?');
    if (confirmed) {
      setUsers(users.filter(user => user.id !== id));
      setNotification('Usuario eliminado exitosamente.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Filtrar usuarios por nombre
  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 relative bg-sky-600 dark:bg-black">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

      {/* Notificación */}
      {notification && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
      <div className=''>
        <button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group scale-75"
          type="button"
          onClick={handleRedireccion}
        >
          <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
        {/* Botón para mostrar el formulario */}
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-lg shadow-zinc-700"
        >
          Agregar Usuario
        </button>
      </div>
      {/* Barra de búsqueda */}
      <div className="max-w-md mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black shadow-lg shadow-zinc-700"
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto bg-slate-100 shadow-md rounded shadow-zinc-700 dark:shadow">
        <table className="min-w-full border-3">
          <thead className="bg-gray-600 dark:bg-black text-white ">
            <tr>
              <th className="px-4 py-2 border-2 border-zinc-700">Nombre</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Sucursal</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Tipo de Usuario</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-200 text-zinc-700">
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.nombre}</td>
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.sucursal}</td>
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.tipo}</td>
                  <td className="px-3 py-2 border-2 border-zinc-700 justify-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-blue-500 hover:underline">✏️ Editar

                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para el formulario de agregar usuarios */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md rounded-xl">
            <h2 className="text-2xl text-zinc-800 font-semibold mb-4">Agregar Usuario:</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Sucursal</label>
                <input
                  type="text"
                  value={sucursal}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Tipo de Usuario</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Analista de datos">Analista de datos</option>
                  <option value="Gerente de sucursal">Gerente de Sucrsal</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}