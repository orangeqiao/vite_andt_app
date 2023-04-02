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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
	useEffect(() => {
		console.log(import.meta.env.VITE_ENV);

	}, [])

	return (
		<div className="App">
			   <LocalizationProvider dateAdapter={AdapterDayjs}>
			<BrowserRouter>
				<RouterBeforeEach>
					<Routes />
				</RouterBeforeEach>
			</BrowserRouter>
			</LocalizationProvider>
		</div>
	)
}

export default App
