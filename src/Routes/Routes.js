import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../components/AddTask/AddTask';
import CompletedTasks from '../components/CompletedTasks/CompletedTasks';
import Home from '../components/Home/Home';
import Login from '../components/LogIn/Login';
import MyTasks from '../components/MyTasks/MyTasks';
import Register from '../components/Register/Register';
import Main from '../Main/Main';
import PrivateRoute from '../Routes/PrivateRoute'


export const router = createBrowserRouter([
        {
            path: '/',
            element: <Main/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/addtask',
                    element:
                    <PrivateRoute>
                     <AddTask/>
                     </PrivateRoute>
                },
                {
                    path: '/mytasks',
                    element: <PrivateRoute>
                        <MyTasks/>
                    </PrivateRoute>
                },
                {
                    path: '/completedtasks',
                    element: <PrivateRoute>
                        <CompletedTasks/>
                    </PrivateRoute>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/register',
                    element: <Register/>
                }
            ]
        }
    ])




