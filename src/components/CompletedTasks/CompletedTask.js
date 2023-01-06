import { useQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/UserContext';

const CompletedTask = ({completedtask}) => {

    const {name, image, description} = completedtask;

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const email = user.email;

    const { data: completedtasks = [], isLoading, refetch} = useQuery({
        queryKey: ['completedtasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/completedtasks?email=${user.email}`);
            const data = await res.json();
            return data
        }
    })

    const [displayTasks, setDisplayTasks] = useState(completedtasks);

    const handleDelete = _id => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:5000/completedtasks/${completedtask._id}`, {
                method: 'DELETE'
              })
              .then(res => res.json())
              .then(data => {
                if(data.deletedCount > 0){
                  Swal.fire(
                    'Great!',
                    'The task has been deleted successfully!',
                    'success'
                  )
                  const remainingTasks = displayTasks.filter(task => task._id !== completedtask._id)
                    setDisplayTasks(remainingTasks);
                    refetch();
                }
              })
            }
          })
         
    }

    const handleMarkAsIncomplete = _id => {
        fetch(`http://localhost:5000/mytasks`, {
            method: "POST",
            headers: {
              "content-type" : "application/json"
            },
            body: JSON.stringify({name, image, description, email})
          })
          .then(res => res.json())
          .then(data => {
            Swal.fire(
              'Great!',
              'The task has been marked as incomplete!',
              'success'
            )
            if(data.acknowledged === true){
                fetch(`http://localhost:5000/completedtasks/${completedtask._id}`, {
               method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          if(data.deletedCount > 0){          
            const remainingTasks = displayTasks.filter(task => task._id !== completedtask._id)
              setDisplayTasks(remainingTasks);
              refetch();
          }
        })
        navigate('/mytasks')
            }
            })

    }

    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

<img className="rounded-t-lg h-60 w-full" src={image} alt="" />
<div className="p-5">
<a href="#">
    <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task Name: {name}</h5>
</a>
<p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Task Description: {description}</p>
<div className='flex justify-between mb-3'>
<Button onClick={handleMarkAsIncomplete}
data-modal-toggle="authentication-modal" type="button"
      className='text-left text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 text-center mr-2 mb-2 '  
    >
      Mark As Incomplete
    </Button>
<Button onClick={handleDelete}
className='text-left  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2  text-center mr-2 mb-2'
>
Delete
</Button>
</div>
</div>

</div>
        </div>
    );
};

export default CompletedTask;