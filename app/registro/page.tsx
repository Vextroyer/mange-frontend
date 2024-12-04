'use client'

import {useState} from 'react'

export default function Registro(){
	
	const [date,setDate] = useState(new Date().toISOString().substring(0,10))
	const [reading,setReading] = useState(0)
	
	function OnFormSend(formData){
		let response = PostRegistro(formData["date"],formData["reading"])
	}
	
	return(
		<div>
			<form action={OnFormSend} className="bg-slate-200 dark:bg-black shadow-2xl rounded-2xl overflow-hidden border-4 border-transparent dark:border-zinc-700">
			  <div className="px-8 py-10 md:px-10">
				<div className="mt-10">
				  <div className="relative">
					<label
					  className="block mb-3 text-sm font-medium text-black dark:text-zinc-200"
					  form="date"
					>
					  Fecha
					</label>
					<input
					  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400 border-zinc-500"
					  name="date"
					  id="date"
					  type="date"
					  value={date}
					  onChange={e => setDate(e.target.value)}
					  required
					/>
				  </div>
				  <div className="mt-6">
					<label
					  className="block mb-3 text-sm font-medium text-black dark:text-zinc-200"
					  form="reading"
					>
					  Lectura
					</label>
					<input
					  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400 border-zinc-500"
					  name="reading"
					  id="reading"
					  type="number"
					  value={reading}
					  onChange={e => setReading(e.target.value)}
					  min="0"
					/>
				  </div>
				  <div className="mt-10">
					<button
					  className="w-full px-4 py-3 tracking-wide text-white transition-all duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800 hover:scale-105"
					  type="submit"
					>
					  Registrar
					</button>
				  </div>
				</div>
			  </div>
			</form>
		</div>
	)
}

async function PostRegistro(date,reading){
	let request = new Request("http://localhost:5050/api/bill",{"method" : "POST",
		"body" : JSON.stringify({"date":date,"reading":reading,"over_limit":0,"company_id":1}) 
	})
	let response = await fetch(request)
	return response
}