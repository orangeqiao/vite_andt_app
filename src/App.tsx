import { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routes from '@/router/index';
import RouterBeforeEach from './router/RouterBefore';

function App() {
	useEffect(() => {
		console.log(import.meta.env.VITE_ENV);

	}, [])

	return (
		<div className="App">
			<BrowserRouter>
				<RouterBeforeEach>
					<Routes />
				</RouterBeforeEach>
			</BrowserRouter>
		</div>
	)
}

export default App
