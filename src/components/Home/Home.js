import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
AOS.init();

const Home = () => {
    return (
        <div>
            <div className='text-left text-2xl ml-5 lg:ml-8 lg:text-4xl mt-4 font-medium mb-6 lg:mb-12 '>
          <div data-aos="fade-right"
            data-aos-duration="1500">
            Welcome to My Task Management 
          </div>
          <div className='mt-2' data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="1500">
            Here you can manage your tasks
          </div>
          <div className='mt-2' data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="3000">
            You can <span className='text-purple-600'> Add </span>,
          </div>
          <div className='mt-2 text-purple-600' data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="3000">
            Update, Delete
          </div>
        
          <div className='mt-2' data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="3000">
            Or <span className='text-purple-600'> Complete </span> your tasks
          </div>
          </div>
          <div className='ml-5 lg:ml-8 ' 
          data-aos="fade-right"
          data-aos-duration="1500">
            <img className='rounded-lg' src="https://wallpaperaccess.com/full/1930875.jpg" alt=''/>
          </div>
          <div data-aos="fade-right"
            data-aos-duration="1500"
            className='text-left text-2xl ml-5 lg:ml-8 lg:text-4xl mt-4 font-medium'>
            So Let's Get Started by adding your <span className='text-purple-600'> First Task </span>!
          </div>
          <div className='mt-4'>
            <Link to='/addtask'>
    <Button gradientMonochrome="purple"
    className='text-left ml-5 lg:ml-8'>
      Add a Task
    </Button>
    </Link>
  </div>
        </div>
    );
};

export default Home;