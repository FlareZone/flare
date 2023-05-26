import "@unocss/reset/tailwind.css"
import "virtual:uno.css"
import "./styles/globals.css"

import "./i18n"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient} contextSharing={true}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
)
