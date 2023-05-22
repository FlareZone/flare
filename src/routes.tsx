import App from "@/pages"
import Dashboard from "@/pages/dashboard"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
])

export default router
