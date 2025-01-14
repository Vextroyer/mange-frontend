'use client'
import React, { useEffect, useState } from "react"
import { Branch, BranchProps } from "@/src/components/Branch";
import RouteButtonsPanel from "@/src/components/RoutesButtonsPanel";
import { fetchBranches } from "@/src/api/branchService";
import Cookies from "js-cookie";
import Boton from "@/src/components/Boton";

// eslint-disable-next-line @next/next/no-async-client-component
export default function BranchPage() {

    const cookie: string | undefined = Cookies.get("token");
    const [branches, setBranches] = useState<BranchProps[]>([]); // Lista de sucursales
    const [selectedBranch, setSelectedBranch] = useState<string>(''); // Sucursal seleccionada

    useEffect(() => {
        setBranches(fetchBranches(cookie));
    }, [cookie]);

    const handleSelectBranch = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(event.target.value); // Actualiza la sucursal seleccionada
    };

    return (
        <main className="page">
            {RouteButtonsPanel()}
            <div className="p-4">
                <div className="p-4">


                    <div className="flex flex-col items-center gap-4 p-4">
                        <label htmlFor="branch-selector" className="text-lg font-semibold">
                            Selecciona una sucursal:
                        </label>
                        <select
                            id="branch-selector"
                            value={selectedBranch}
                            onChange={handleSelectBranch}
                            className="border border-gray-300 rounded p-2 text-lg"
                        >
                            <option value="">Selecciona una sucursal</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch.name}>
                                    {branch.name} - {branch.address}
                                </option>
                            ))}
                        </select>
                        {selectedBranch && (
                            <p className="text-green-500 font-medium">
                                Sucursal seleccionada: {selectedBranch}
                            </p>
                        )}
                    </div>
                    <Boton text="New" color="green" onClick={[]}></Boton>
                    <Boton text="Delete" color="red" onClick={[]}></Boton>
                </div>
            </div>
        </main>
    );
}