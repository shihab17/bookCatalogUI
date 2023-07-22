import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import App from "../App";
import NotFound from "../page/NotFound";
import SignUp from "../page/SignUp";
import Login from "../page/Login";
import BookDetails from "../components/ui/Book/BookDetails";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/book/:id',
                element: <BookDetails/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '*',
        element: <NotFound/>
    },
]);
export default routes;