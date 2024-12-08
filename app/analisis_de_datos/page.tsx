"use client"
import { useState } from "react";



export default function AnalisisDeDatos() {
	let idView = 0
	const [views, setViews] = useState([])

	function handleNewItem() {
		setViews([...views, idView])
		idView++
	}

	return (
		<div className="flex flex-col m-4 h-screen">
			{views.map(viewID => (
				<QueryItem key={viewID} />
			))}
			<button onClick={handleNewItem}>
				New
			</button>
		</div>
	)
}

function QueryItem() {
	const options = ["A", "B", "C"]
	const [option, setOption] = useState("A")

	return (
		<div className="flex flex-col bg-gray-700">
			<div className="flex flex-row">
				<select className="p-2 m-4 inline bg-red-700" value={option} onChange={e => setOption(e.target.value)}>
					{options.map(option => (
						<option key={option} value={option}>{option}</option>
					))}
				</select>
			</div>

			<div className="p-2 m-4 flex flex-row bg-red-700 gap-4">
				{option == "A" && <p className="p-2 bg-orange-300">Elegiste la opcion A</p>}
				{option == "B" && <p className="p-2 bg-orange-300">Elegiste la opcion B</p>}
				{option == "C" && <p className="p-2 bg-orange-300">Elegiste la opcion C</p>}
				{/*<p className="p-2 bg-orange-300">Set first parameter</p>
					<p className="p-2 bg-orange-300">Set second parameter</p>
					<p className="p-2 bg-orange-300">Set third parameter</p>*/}
			</div>

			<div className="m-4 bg-yellow-700">

				<div className="flex flex-row">
					<p className="p-2 m-4 bg-red-700">Exportar</p>
				</div>

				Graficos
			</div>
		</div>
	)
}