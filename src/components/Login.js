

import { useContext} from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'

 const Login = () => {
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const { signIn,  signInWithGoogle } = useContext(AuthContext)

  const handleSubmit = event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    signIn(email, password)
      .then(result => {
        toast.success('Login Success!');
        navigate(from, { replace: true })
    })
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(result => {
      toast.success('Login Success!');
      navigate(from, { replace: true })
  })
  }
  
 
  return (
    <div className='text-center border-pink-900 rounded-md border-4 mt-7'>
      
        <div>
          <h4 className='bg-green-500 text-3xl p-2'>Login Form</h4>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email Address: </label>
              <input type='email'name='email'id='email'placeholder='Enter Your Email' />
            </div>
            <div>
              <label htmlFor='password'>Password: </label>
              <input type='password'name='password'id='password'placeholder='Enter Your Password' />
            </div>
          <div>
            <button className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md' type='submit' >Sign in </button>
          </div>
        </form>
        
        <div className=''>
          <p>
            Login with social accounts
          </p>
          
        </div>
        <div className=''>
          <button
            onClick={handleGoogleSignIn}
            aria-label='Log in with Google'
            className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md'
          >
           Google
          </button>
          
          
        </div>
        <p className=''>
          Don't have an account yet?{' '}
          <Link to='/register' className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md'>
            Register Now
          </Link>
        </p>
      
    </div>

  );
}

export default Login;