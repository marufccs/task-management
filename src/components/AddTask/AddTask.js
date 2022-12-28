import React from 'react';
import { Helmet } from 'react-helmet';
import AddTaskForm from './AddTaskForm';
import './AddTask.css';

const AddTask = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Add a Task
                </title>
            </Helmet>
            <div>
                <h1 className='text-3xl lg:text-4xl'>Add a Task down here</h1>
            </div>
            <div className='task-form mt-6'>
                <AddTaskForm/>
            </div>
            <div>
            </div>
            <div>
  </div>
        </div>
    );
};

export default AddTask;