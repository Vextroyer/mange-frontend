import Link from 'next/link'

export default function Home(){
	return (
		<div className="flex m-4 h-screen flex-row text-black">
			{/*Sidebar*/}
			<div className="flex flex-col flex-auto basis-1/4 mx-4 bg-blue-100 gap-4">
				<p className="m-4 basis-1/4 bg-red-300">Editar info de usuario</p>
				<p className="m-4 basis-1/4 bg-red-300">Ajustes</p>
				<p className="m-4 basis-2/4 bg-red-300">Notificaciones</p>
			</div>
			
			{/*Mainbar*/}
			<div className="flex-auto flex flex-col basis-3/4 mx-4 bg-red-100">
				
				{/*Presentation*/}
				<div className="flex-auto basis-3/4 m-4 bg-red-200">
					<h1>Welcome User</h1>
				</div>
				
				<div className="flex flex-row flex-auto basis-1/4 bg-red-200 m-4 gap-4">
					<Link href="/analisis_de_datos">
						<p className="basis-1/4 bg-red-300">Ver Datos</p>
					</Link>
					<p className="basis-1/4 bg-red-300">Registrar Consumo</p>
					<p className="basis-1/4 bg-red-300">Gestionar Sucursales</p>
					<p className="basis-1/4 bg-red-300">Hello World</p>
				</div>
				
			</div>
		</div>
	)
}