import React from 'react';
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar
        fluid={true}
        rounded={true}
      >
         <Link to='/'>
        <Navbar>
         
          <img
            src="https://img.freepik.com/free-vector/project-management-goal-completion-list-questionnaire-survey-answering-business-organization-tool_335657-3289.jpg?w=2000"
            className="mr-3 h-6 sm:h-9"
            alt="Task Management Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
           <span className='text-purple-600 text-3xl'>Task</span>  
           <span className='text-3xl ml-2'>Management</span>
          </span>
         
        </Navbar>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to='/'>
          <Navbar.Link>
            Home
          </Navbar.Link>
          </Link>
          <Link to='/addtask'>
          <Navbar.Link>
            Add a Task
          </Navbar.Link>
          </Link>
          <Link to='/mytasks'>
          <Navbar.Link>
            My Tasks
          </Navbar.Link>
          </Link>
          <Link to='/completedtasks'>
          <Navbar.Link>
            Completed Tasks
          </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    );
};

export default Header;