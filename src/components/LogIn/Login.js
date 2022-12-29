import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/UserContext';
import { FaGoogle } from "react-icons/fa";

const Login = () => {

    const {signInUser, signInWithGoogle} = useContext(AuthContext);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, watch, formState, reset, formState: { errors } } = useForm();

    const onSubmit = data =>{
        signInUser(data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setError('');
            Swal.fire(
                'Great',
                "You've been logged in successfully!",
                'success'
              );
              navigate(from, { replace: true });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError(errorMessage);
          });
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ email: '', password: ''});
        }
      }, [formState, reset]);
    
      const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then((result) => {
          const user = result.user;
          Swal.fire(
            'Congrats!',
            "You've been signed in successfully with Google!",
            'success'
          )
          
            navigate(from, { replace: true });
            
        }).catch((error) => {
          const errorMessage = error.message;
        });
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 task-form mt-6">
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
      placeholder="Your email here"
      {...register("email", { required: true })} 
    />
      {errors.email?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your email is required</p>}
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
      {...register("password", { required: true, minLength: 8  })} 
    />
     {errors.password?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your password is required</p>}
                      {
                        error && <p className='text-red-700'>{error}</p>
                      }
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
  <Button  
  gradientDuoTone="purpleToPink"
  onClick={handleGoogleSignIn} 
  >
    <FaGoogle className='mr-3'></FaGoogle>
  Sign In with Google instead
  </Button>
</form>
    );
};

export default Login;