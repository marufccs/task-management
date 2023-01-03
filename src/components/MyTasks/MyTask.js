import { useQuery } from '@tanstack/react-query';
import { Button} from 'flowbite-react';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/UserContext';
import Loader from '../../Default/Loader/Loader';
import './MyTask.css';
import MyTaskModal from './MyTaskModal';

const MyTask = ({mytask}) => {
    const {name, image, description} = mytask;
    const {user} = useContext(AuthContext);

    const email = user.email;

    const { data: mytasks = [], isLoading, refetch} = useQuery({
      queryKey: ['mytasks'],
      queryFn: async () => {
          const res = await fetch(`http://localhost:5000/mytasks?email=${user.email}`);
          const data = await res.json();
          return data
      }
  })

  const [displayTasks, setDisplayTasks] = useState(mytasks);
  if(isLoading){
    return <Loader/>
  }

  //To delete the task
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
        fetch(`http://localhost:5000/mytasks/${mytask._id}`, {
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
           
            const remainingTasks = displayTasks.filter(task => task._id !== mytask._id)
              setDisplayTasks(remainingTasks);
              refetch();
          }
        })
      }
    })
   
  }

  // To complete the task
  const handleCompleteTask = _id => {
    fetch(`http://localhost:5000/completedtasks`, {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({name, image, description, email})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      Swal.fire(
        'Great!',
        'The task has been completed successfully!',
        'success'
      )
      if(data.acknowledged === true){
        fetch(`http://localhost:5000/mytasks/${mytask._id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          if(data.deletedCount > 0){          
            const remainingTasks = displayTasks.filter(task => task._id !== mytask._id)
              setDisplayTasks(remainingTasks);
              refetch();
          }
        })
      }
    })
    .catch(err => console.error(err))
  }

    return (
       
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

        <img className="rounded-t-lg h-60 w-full" src={image} alt="" />
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task Name: {name}</h5>
        </a>
        <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Task Description: {description}</p>
        <div className='flex justify-between mb-3'>
        <Button data-modal-toggle="authentication-modal" type="button"
      className='text-left text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 text-center mr-2 mb-2 '  
    >
      Update 
    </Button>
    <MyTaskModal/>

    <Button  onClick={handleDelete}
      className='text-left  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2  text-center mr-2 mb-2'
    >
      Delete
    </Button>
        </div>
        <Button onClick={handleCompleteTask}
      outline={true}
      gradientDuoTone="purpleToPink"
      className='ml-20 lg:ml-24'
    >
      Mark as Completed
    </Button>
    </div>

</div>

    );
};

export default MyTask;