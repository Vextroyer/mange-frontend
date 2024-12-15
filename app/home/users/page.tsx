/* eslint-disable react/jsx-no-undef */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface User {
  id: number;
  Username: string;
  Company: string;
  Type: string;
  Password: string;
}

export default function Page() {

  const [users, setUsers] = useState<User[]>([]);
  const [Username, setNombre] = useState('');
  const [Company, setSucursal] = useState('');
  const [Type, setTipo] = useState('');
  const [Password, setContraseña] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setCurrentUserId] = useState<number | null>(null);
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

    if (!Username || !Company || !Type || !Password) {
      setNotification('Por favor completa todos los campos.');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      const requestOptions = {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username, Company, Type, Password }),
      };

      const url = isEdit ? `http://127.0.0.1:5050/api/users/${id}` : 'http://127.0.0.1:5050/api/users';
      const response = await fetch(url, requestOptions);

      if (!response.ok) throw new Error(isEdit ? 'Error al editar usuario' : 'Error al agregar usuario');

      const user = await response.json();

      if (isEdit) {
        setUsers(users.map((u) => (u.id === id ? user : u)));
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
    setNombre(user.Username);
    setSucursal(user.Company);
    setTipo(user.Type);
    setContraseña(user.Password)
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
    user.Username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 relative bg-[url('http://localhost:3000/images/fondoClaro.png')] dark:bg-[url('http://localhost:3000/images/fondoOscuro.jpg')] bg-cover bg-no-repeat bg-center">
      <div className='flex justify-center items-center'>
        {/* Logo + Mensaje */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="object-contain object-center mr-1"
        />
        <h2 className="text-4xl font-extrabold text-center text-black dark:text-white">
          User management!
        </h2>
      </div>
      {/* Notificación */}
      {notification && (
        <div className="mb-4 p-4 h-10 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}

      {/* Boton para volver a la pagina anterios */}
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
        className="mb-4 bg-blue-500 h-10 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        {isEdit ? 'Edit User' : 'Add User'}
      </button>

      {/* Barra de búsqueda */}
      <div className="max-w-md mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-300 dark:placeholder:text-black dark:text-black"
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto bg-slate-100 shadow-md rounded shadow-zinc-700 dark:shadow">
        <table className="min-w-full border-3">
          <thead className="bg-gray-600 dark:bg-black text-white ">
            <tr>
              <th className="px-4 py-2 border-2 border-zinc-700">Name</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Branch</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Type</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Password</th>
              <th className="px-4 py-2 border-2 border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="bg-slate-100 hover:bg-slate-300 dark:hover:bg-gray-400 text-zinc-700 dark:bg-gray-200">
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.Username}</td>
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.Company}</td>
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.Type}</td>
                  <td className="px-4 py-2 border-2 border-zinc-700">{user.Password}</td>
                  <td className="px-3 py-2 border-2 border-zinc-700 justify-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      🗑️ Delete
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="p-6 w-full max-w-md bg-white dark:bg-black shadow-2xl rounded-2xl overflow-hidden border-4 border-transparent dark:border-zinc-700">
            <h2 className="text-2xl font-semibold mb-4 ">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain object-center mr-1"
              />
              {isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Nombre</label>
                <input
                  type="text"
                  value={Username}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Contraseña</label>
                <input
                  type="text"
                  value={Password}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Sucursal</label>
                <input
                  type="text"
                  value={Company}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Tipo de Usuario</label>
                <select
                  value={Type}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black dark:bg-slate-300"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="1">Analista de datos</option>
                  <option value="2">Gerente de sucursal</option>
                  <option value="3">Administrador</option>
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