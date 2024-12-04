'use client'
import {useState} from 'react'

export default function Home(){
	const options = ["A","B","C"]
	const [option,setOption] = useState("A")
	
	return (
		<div className="m-4 h-screen bg-gray-200 dark:bg-gray-900 shadow-gray-800 rounded-lg p-4">
			<div>
				<h1>Welcome User</h1>
			</div>
			
			<div className="h-5">
			</div>
			
			<div className="flex flex-row gap-4">
				
				{/*Sidebar*/}
				<div className="flex flex-col">
					<div className="flex flex-col gap-4 dark:bg-gray-600 p-2 rounded-lg">
						<p>Seleccionar Sucursal</p>
						<select className="dark:bg-gray-500 rounded-sm p-2" value={option} onChange={e => setOption(e.target.value)}>
							{options.map(option => (
								<option value={option}>{option}</option>
							))}
						</select>
					</div>
				</div>
				
				{/*Mainbar*/}
				<div className="flex-auto flex flex-col dark:bg-gray-600 rounded-lg p-2 gap-4">
					<div className="flex flex-row gap-2">
						<h1>
							Sucursal {option}
						</h1>
						
						<p>Limite</p>
						<p>Formula de costo aqui</p>
						<p>Por ciento Extra aqui</p>
						<p>Aumento aqui</p>
						<p>Direccion</p>
						<p>Tipo</p>
						
					</div>
					
					<p>Detalles de consumo de los ultimos 3 meses</p>
				</div>
			</div>
			
			
		</div>
	)
}