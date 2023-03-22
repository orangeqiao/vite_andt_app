import { useEffect } from 'react'
import './App.css'
import User from '@/pages/user'

function App() {
	useEffect(() => {
		console.log(import.meta.env.VITE_ENV);

	}, [])

	return (
		<div className="App">
			<User />

		</div>
	)
}

export default App
