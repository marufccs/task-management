import { Button, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/UserContext';
import { FaGoogle } from "react-icons/fa";

const Register = () => {

    const {signInNewUser, updateUser, signInWithGoogle} = useContext(AuthContext);

    const { register, handleSubmit, watch, formState, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || '/';


  const onSubmit = data =>{
    signInNewUser(data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = {
            displayName : data.name
        }
        updateUser(userInfo)
        .then(() => {
          console.log(user);
        })
        .catch(err => console.log(err));
        Swal.fire(
            'Great',
            "You've been registered successfully!",
            'success'
          );
          navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '' , email: '', password: ''});
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
              htmlFor="name"
              value="Your Full Name"
            />
          </div>
          <TextInput
            id="name"
            type="name"
            placeholder="Your name here"
            {...register("name", { required: true })} 
          />
                      {errors.name?.type === 'required' && <p 
                      className='text-red-700' role="alert">Your full name is required</p>}
        </div>
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
            {errors.password?.type === 'minLength' && <p 
                      className='text-red-700' role="alert">Your password should be at least 8 characters long</p>}
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="remember">
            Already registered?
           <Link to='/login'><span className='text-purple-600'> Click Here</span> </Link> to sign in
          </Label>
        </div>
        <Button type="submit" 
        gradientDuoTone="purpleToPink"
        >
          Submit
        </Button>
        <Button  onClick={handleGoogleSignIn} 
  gradientDuoTone="purpleToPink"
  >
    <FaGoogle  className='mr-3'></FaGoogle>
  Register with Google instead
  </Button>
      </form>
    );
};

export default Register;