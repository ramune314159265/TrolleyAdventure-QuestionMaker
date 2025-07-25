import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider>
			<App />
		</Provider>
	</StrictMode>,
)
