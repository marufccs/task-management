import { Button, FileInput, TextInput } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddTaskForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } =        
     useForm();

     const onSubmit = async (data) => {
      
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