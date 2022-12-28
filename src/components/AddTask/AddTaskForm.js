import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AddTaskForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } =        
     useForm();

    const imageHostKey= process.env.REACT_APP_imgbb_key;

     const onSubmit = data => {
      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(imgData => {
        if(imgData.success){
            console.log(imgData.data.url);
            const task = {
                name: data.task,
                image: imgData.data.url,
                description: data.description
            }
            console.log(task);
            fetch('http://localhost:5000/mytasks', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json',
                },
                body:JSON.stringify(task),
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    console.log('success');
                    
                    Swal.fire(
                        'Great!',
                        "You've added your task successfully!",
                        'success'
                      )
                }
            })
        }
      })
     }


    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
  <div>
    <div className="mb-2 block">
        <h3 className='text-left'>Insert your task here </h3>
    </div>
    <TextInput
      id="base"
      type="text"
      sizing="md"
      {...register("task", { required: true })}
    />
  </div>
  <div id="fileUpload">
  <div className="mb-2 block">
  <h3 className='text-left'>Add a Photo if you want</h3>
  </div>
  <FileInput
    id="file"
    {...register("image")}
  />
</div>
  <div>
    <div className="mb-2 block">
    <h3 className='text-left'>Task Description</h3>
    </div>
    <TextInput
      id="large"
      type="text"
      sizing="lg"
      {...register("description")}
    />
  </div>
</div>
<Button type='submit'
outline={true}
gradientDuoTone="purpleToPink"
className='mt-4 ml-32 lg:ml-48'
>
Submit
</Button>
</form>
    );
};

export default AddTaskForm;