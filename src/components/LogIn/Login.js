import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <form className="flex flex-col gap-4 task-form mt-6">
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      placeholder="name@flowbite.com"
      required={true}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      type="password"
      required={true}
    />
  </div>
  <div className="flex items-center gap-2">
    <Label htmlFor="remember">
      Not registered yet?  
       <Link to='/register'> <span className='text-purple-600'> Click Here</span> </Link>to register
    </Label>
  </div>
  <Button type="submit" 
  gradientDuoTone="purpleToPink"
  >
    Submit
  </Button>
</form>
    );
};

export default Login;