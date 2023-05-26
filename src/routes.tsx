import App from "@/pages"
import Dashboard from "@/pages/dashboard"
import MyEditor from "@/pages/WangEditor"
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
	{
		path: "/post",
		element: <MyEditor />,
	},
])

export default router
