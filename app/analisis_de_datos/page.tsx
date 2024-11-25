"use client"
import { useState } from "react";


export default function AnalisisDeDatos(){
	let idView = 0
	const [views,setViews] = useState([])
	
	function handleNewItem(){
		setViews([...views,idView])
		idView++
	}
	
	return (
		<div className="flex flex-col m-4 h-screen flex-row">
			 {views.map(viewID => (
				<QueryItem key={viewID}/>
				))}
			<button onClick={handleNewItem}>
				New
			</button>
		</div>
	)
}

function QueryItem(){
	return(
		<div className="flex flex-col bg-gray-700">
				<div className="flex flex-row">
					<p className="p-2 m-4 inline bg-red-700">Dropdown list for selecting query</p>
				</div>
				
				<div className="p-2 m-4 flex flex-row bg-red-700 gap-4">
					<p className="p-2 bg-orange-300">Set first parameter</p>
					<p className="p-2 bg-orange-300">Set second parameter</p>
					<p className="p-2 bg-orange-300">Set third parameter</p>
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