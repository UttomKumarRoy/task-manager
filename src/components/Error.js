import React from 'react'
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <>      
            <h2 className='text-red-900'>Oops! An Error Occurred</h2>
            <div className=''>
                 <img src='https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png' alt="error" />
            </div>
            <p className='text-red-400'>{error.statusText || error.message}</p>

    </>
  )
}

export default Error