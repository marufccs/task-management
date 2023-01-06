import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/UserContext';
import Loader from '../../Default/Loader/Loader';
import CompletedTask from './CompletedTask';

const CompletedTasks = () => {

    const {user} = useContext(AuthContext);

    const { data: completedtasks = [], isLoading} = useQuery({
        queryKey: ['completedtasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/completedtasks?email=${user.email}`);
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
                    Completed Tasks
                </title>
            </Helmet>
            <div>
                <h1 className='text-3xl lg:text-4xl mb-6'>Completed Tasks</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-8'>
            {
                
                completedtasks.map(completedtask =>  <CompletedTask completedtask={completedtask}></CompletedTask>)
            }
            </div>
        </div>
    );
};

export default CompletedTasks;