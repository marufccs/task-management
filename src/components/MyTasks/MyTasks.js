import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/UserContext';
import Loader from '../../Default/Loader/Loader';
import MyTask from './MyTask';

const MyTasks = () => {

    const {user} = useContext(AuthContext);

    const { data: mytasks = [], isLoading} = useQuery({
        queryKey: ['mytasks'],
        queryFn: async () => {
            const res = await fetch(`https://task-management-server-psi.vercel.app/mytasks?email=${user.email}`);
            const data = await res.json();
            return data
        }
    })

    if(isLoading){
        return <Loader/>
    }

    return (
        <div>
              <Helmet>
                <title>
                    My Tasks
                </title>
            </Helmet>
            <div>
                <h1 className='text-3xl lg:text-4xl mb-6'>My Tasks</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-8'>
            {
                
                mytasks.map(mytask =>  <MyTask mytask={mytask}></MyTask>)
            }
            </div>
     
        </div>
    );
};

export default MyTasks;