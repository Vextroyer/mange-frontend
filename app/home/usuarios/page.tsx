'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  nombre: string;
  sucursal: string;
  tipo: string;
  contraseña: string;
}

export default function Page() {

  const [users, setUsers] = useState<User[]>([]);
  const [nombre, setNombre] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [tipo, setTipo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');


  //volver a la pagina home
  const handleRedireccion = () => {
    router.back();
  };

  //Cargar usuarios al abrir la página
  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5050/api/users');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();
      // console.log('Usuarios cargados:', data); //Verificar los datos recibidos
      setUsers(data);
    } catch (error) {
      console.error(error);
      setNotification('Error al cargar usuarios.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  //Crear o editar un usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !sucursal || !tipo) {
      setNotification('Por favor completa todos los campos.');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      const requestOptions = {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, sucursal, tipo }),
      };

      const url = isEdit ? `http://127.0.0.1:5050/api/users/${currentUserId}` : 'http://127.0.0.1:5050/api/users';
      const response = await fetch(url, requestOptions);

      if (!response.ok) throw new Error(isEdit ? 'Error al editar usuario' : 'Error al agregar usuario');

      const user = await response.json();

      if (isEdit) {
        setUsers(users.map((u) => (u.id === currentUserId ? user : u)));
      } else {
        setUsers([...users, user]);
      }

      setNotification(isEdit ? 'Usuario actualizado exitosamente.' : 'Usuario agregado exitosamente.');
      setTimeout(() => setNotification(null), 3000);
      resetForm();
    } catch (error) {
      console.error(error);
      setNotification('Error al guardar usuario.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // 3. Eliminar usuario
  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm('¿Está seguro de que quiere eliminar el usuario?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:5050/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      setUsers(users.filter((user) => user.id !== id));
      setNotification('Usuario eliminado exitosamente.');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(error);
      setNotification('Error al eliminar usuario.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Preparar el formulario para editar usuario
  const handleEditUser = (user: User) => {
    setNombre(user.nombre);
    setSucursal(user.sucursal);
    setTipo(user.tipo);
    setContraseña(user.contraseña)
    setCurrentUserId(user.id);
    setIsEdit(true);
    setShowForm(true);
  };

  // Reiniciar formulario
  const resetForm = () => {
    setNombre('');
    setSucursal('');
    setTipo('');
    setContraseña('');
    setCurrentUserId(null);
    setIsEdit(false);
    setShowForm(false);
  };

  // Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 relative bg-slate-50 dark:bg-black">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
      {/* Notificación */}
      {notification && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
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
        onClick={() => {
          setShowForm(true);
          setIsEdit(false);
          setNombre('');
          setSucursal('');
          setTipo('');
          setContraseña('');
        }}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
      </button>
      {/* Barra de búsqueda */}
      <div className="max-w-md mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <th className="px-4 py-2 border-2 border-zinc-700">Contraseña</th>
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
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.contraseña}</td>
                  <td className="px-3 py-2 border-2 border-zinc-700 justify-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️ Editar
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
      {/* Modal para el formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              {isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contraseña</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sucursal</label>
                <input
                  type="text"
                  value={sucursal}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tipo de Usuario</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Analista de datos">Analista de datos</option>
                  <option value="Gerente de sucursal">Gerente de sucursal</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={resetForm}
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
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