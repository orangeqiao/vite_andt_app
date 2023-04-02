import { useEffect } from 'react'
import './App.css'
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from '@/router/index';
import RouterBeforeEach from './router/RouterBefore';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
