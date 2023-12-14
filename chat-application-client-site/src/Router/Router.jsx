import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";
import Error from "../Pages/Error";
import Home from "../Pages/Home";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement: <Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
    ]

    }
])
export default Router;