import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../components/AddTask/AddTask';
import CompletedTasks from '../components/CompletedTasks/CompletedTasks';
import Home from '../components/Home/Home';
import MyTasks from '../components/MyTasks/MyTasks';
import Main from '../Main/Main';


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
                    element: <AddTask/>
                },
                {
                    path: '/mytasks',
                    element: <MyTasks/>
                },
                {
                    path: '/completedtasks',
                    element: <CompletedTasks/>
                }
            ]
        }
    ])



