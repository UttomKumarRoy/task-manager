import { createBrowserRouter } from "react-router-dom";
import AddTask from "../components/AddTask";
import CompletedTask from "../components/CompletedTask";
import Error from "../components/Error";
import Home from "../components/Home";
import Login from "../components/Login";
import Main from "../components/Main";
import MyTask from "../components/MyTask";
import Register from "../components/Register";

//import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main> ,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            
            {
                path: '/addTask',
                element: <AddTask></AddTask>
            },
            {
                path: '/myTask',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedTask',
                element: <CompletedTask></CompletedTask>
            },{
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            
        ]
    },
    
    
])

export default router;