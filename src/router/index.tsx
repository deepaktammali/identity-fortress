import { createBrowserRouter } from "react-router-dom"
import type { RouteObject } from "react-router-dom"
import App from "../App"
import HomePage from "../pages/home"

const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }
        ]
    }
]

const router = createBrowserRouter(routes)

export { router }