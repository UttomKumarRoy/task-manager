import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'

//import { toast } from 'react-toastify'
import { AuthContext } from '../contexts/UserContext'
//import useTitle from './useTitle'

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { createUser, updateName,  signInWithGoogle } =
    useContext(AuthContext)

  // Signup using Email & Pass
  const handleSubmit = event => {
    event.preventDefault()

    const name = event.target.name.value
    const photo = event.target.photo.value
    const email = event.target.email.value
    const password = event.target.password.value

    //1. Create Account
    createUser(email, password)
      .then(result => {
        

        //2. Update Name
        updateName(name, photo)
          .then((result) => {
            toast.success('Name and Photo Updated')
            

          })
          .catch(error => {
          console.log(error);
          })
          event.target.reset();
      })
      .catch(error => console.log(error))
  }

  // Google Signin
  const handleGoogleSignin = () => {
    signInWithGoogle().then(result => {
      console.log(result.user)
      toast.success('SignIn Successfully')


      navigate(from, { replace: true })
    })
  }

  
//useTitle('Register')
  return (
    <div className='text-center border-pink-900 rounded-md border-4 mt-7'>
      
      
          <h4 className='bg-green-500 text-3xl p-2'>Register</h4>
        
        <form
          onSubmit={handleSubmit}
        >
          <div className=''>
            <div>
              <label htmlFor='email' className=''>
                Name :
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name'
              />
            </div>
            <div>
              <label htmlFor='email' className=''>
                Photo URL :
              </label>
              <input
                type='text'
                name='photo'
                id='photo'
                placeholder='Enter Your photo URL'
              />
            </div>

            <div>
              <label htmlFor='email' className=''>
                Email Address :
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter Your Email'
              />
            </div>
            <div>
              <div className=''>
                <label htmlFor='password' className=''>
                  Password :
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
              />
            </div>
          </div>
            <div>
              <button className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md'
                type='submit'
              >
                Sign Up
              </button>
            </div>
          
        </form>
    
          <p>
            Signup with social accounts
          </p>
        
          <button
            onClick={handleGoogleSignin}
            aria-label='Log in with Google'
            className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md'
          >
            Google
          </button> 
          
         
        
        <p className=''>
          Already have an account yet?{' '}
          <Link to='/login' className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md'>
            Login Now
          </Link>
        </p>
      
    </div>
  )
}

export default Register