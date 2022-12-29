import { Button } from 'flowbite-react';
import React from 'react';
import './MyTask.css';

const MyTask = ({mytask}) => {
    const {name, image, description} = mytask;
    return (
       
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-60 w-full" src={image} alt="" />
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task Name: {name}</h5>
        </a>
        <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Task Description: {description}</p>
        <div className='flex justify-between mb-3'>
        <Button
      className='text-left text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 text-center mr-2 mb-2 '
    >
      Update 
    </Button>
    <Button
      
      className='text-left  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2  text-center mr-2 mb-2'
    >
      Delete
    </Button>
        </div>
        <Button
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