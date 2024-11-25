import Link from 'next/link'

export default function Login() {
  return (
	<main>
		<form className="bg-white text-black block p-4 w-96 rounded-lg ">
			<p className="text-xl font-semibold text-center">Sign in to your account</p>
			<div className="relative">
				<input className="p-4 my-2 mx-0 outline-0 border border-solid rounded-lg border-gray-300 text-sm w-80" placeholder="Enter email" type="email"/>
			</div>
			<div className="relative">
				<input className="p-4 my-2 mx-0 outline-0 border border-solid rounded-lg border-gray-300 text-sm w-80" placeholder="Enter password" type="password"/>
			</div>
			<Link href="/home">
			<button className="block px-5 py-3 my-2 bg-blue-600 border rounded-lg text-white text-sm font-medium uppercase text-center w-80" type="submit">
				Sign in
			</button>
			</Link>
		</form>
	</main>
  );
}
