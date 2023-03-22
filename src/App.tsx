import { useEffect } from 'react'
import './App.css'

function App() {
	useEffect(() => {
		console.log(import.meta.env.VITE_ENV);

	}, [])

	return (
		<div className="App">

		</div>
	)
}

export default App
