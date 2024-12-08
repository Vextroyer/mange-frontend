"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioDinamico() {
  const [formularios, setFormularios] = useState([
    { id: 1, fecha: "", consumo: "", sucursal: "" },
  ]);
  const router = useRouter();

  const handleRedireccion = () => {
    router.push("/home");
  };
  // Lista de sucursales
  const sucursales = ["Sucursal A", "Sucursal B", "Sucursal C", "Sucursal D"];

  // Manejar cambios en los campos de un formulario específico
  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    setFormularios((prev) =>
      prev.map((form) => (form.id === id ? { ...form, [name]: value } : form))
    );
  };

  // Enviar datos al backend
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formularios),
      });

      if (response.ok) {
        alert("Datos enviados correctamente");
        setFormularios([{ id: 1, fecha: "", consumo: "", sucursal: "" }]); // Reiniciar formularios
      } else {
        alert("Hubo un problema al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al conectar con el servidor");
    }
  };

  // Agregar un nuevo formulario
  const agregarFormulario = () => {
    setFormularios((prev) => [
      ...prev,
      { id: prev.length + 1, fecha: "", consumo: "", sucursal: "" },
    ]);
  };

  // Eliminar un formulario
  const eliminarFormulario = (id: number) => {
    setFormularios((prev) => prev.filter((form) => form.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen bg-gray-100 p-4 bg-[url('http://localhost:3000/images/fondoClaro.png')] dark:bg-[url('http://localhost:3000/images/login.png')] bg-cover bg-no-repeat bg-center overflow-auto ">
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
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {formularios.map((formulario) => (
          <div
            key={formulario.id}
            className="relative bg-white shadow-md px-8 pt-6 pb-8 mb-4 dark:border-4 dark:border-zinc-700 rounded-2xl  dark:bg-black "
          >
            {/* Botón para eliminar formulario */}
            <button
              type="button"
              onClick={() => eliminarFormulario(formulario.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 p-1 scale-125 dark:text-white"
              aria-label="Eliminar formulario"
            >
              X
            </button>

            {/* Sucursal */}
            <div className="mb-4">
              <label
                htmlFor={`sucursal-${formulario.id}`}
                className="block text-gray-700 text-sm dark:text-white font-bold mb-2"
              >
                Sucursal:
              </label>
              <select
                id={`sucursal-${formulario.id}`}
                name="sucursal"
                value={formulario.sucursal}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              >
                <option value="">Seleccione una sucursal</option>
                {sucursales.map((sucursal, index) => (
                  <option key={index} value={sucursal}>
                    {sucursal}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div className="mb-4">
              <label
                htmlFor={`fecha-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Fecha:
              </label>
              <input
                type="date"
                id={`fecha-${formulario.id}`}
                name="fecha"
                value={formulario.fecha}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              />
            </div>

            {/* Consumo */}
            <div className="mb-4">
              <label
                htmlFor={`consumo-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              >
                Lectura:
              </label>
              <input
                type="number"
                id={`consumo-${formulario.id}`}
                name="consumo"
                value={formulario.consumo}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:border-zinc-700 dark:border-2 rounded-lg"
                required
              />
            </div>
          </div>
        ))}

        {/* Botones */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={agregarFormulario}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:shadow-slate-900 dark:shadow-lg "
          >
            New
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  dark:shadow-black dark:shadow-lg "
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
