"use client";

import { ChangeEvent, useState } from "react";

export default function FormularioDinamico() {
  const [formularios, setFormularios] = useState([
    { id: 1, fecha: "", consumo: "", sucursal: "" },
  ]);

  // Lista de sucursales
  const sucursales = ["Sucursal A", "Sucursal B", "Sucursal C", "Sucursal D"];

  // Manejar cambios en los campos de un formulario específico
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setFormularios((prev) =>
      prev.map((form) => (form.id === id ? { ...form, [name]: value } : form))
    );
  };

  // Enviar datos al backend
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/guardar-datos", {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {formularios.map((formulario) => (
          <div
            key={formulario.id}
            className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Botón para eliminar formulario */}
            <button
              type="button"
              onClick={() => eliminarFormulario(formulario.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              aria-label="Eliminar formulario"
            >
              X
            </button>

            {/* Sucursal */}
            <div className="mb-4">
              <label
                htmlFor={`sucursal-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Sucursal
              </label>
              <select
                id={`sucursal-${formulario.id}`}
                name="sucursal"
                value={formulario.sucursal}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha
              </label>
              <input
                type="date"
                id={`fecha-${formulario.id}`}
                name="fecha"
                value={formulario.fecha}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Consumo */}
            <div className="mb-4">
              <label
                htmlFor={`consumo-${formulario.id}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Consumo
              </label>
              <input
                type="number"
                id={`consumo-${formulario.id}`}
                name="consumo"
                value={formulario.consumo}
                onChange={(e) => handleInputChange(e, formulario.id)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            New
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
