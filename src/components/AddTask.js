import React, { useContext, useState} from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const AddTask = () => {
   const {user}= useContext(AuthContext)
   const [loading, setLoading]=useState(false)
  const navigate= useNavigate()
    const handleSubmit= (e) =>{
        e.preventDefault();
        const taskTitle=e.target.text.value;
        
         const task={
            taskTitle,
            status:"incomplete",
            email:user?.email
        }
        console.log(task);
        setLoading(true);
       fetch('https://task-manager-server-three.vercel.app/addTask',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(task)
       })
       .then(res=>{
        console.log(res);
        setLoading(false)
        toast.success("Task added successfully");
        navigate("/myTask");
       })
       .catch(err=>{
        console.log(err);
        setLoading(false)
        toast.success("Task not added")
       })

    
       
    }
    if(loading){
        return <div>Loading...</div>
       }
    return (
             <div className='text-center border-pink-900 rounded-md border-4 p-1 mt-7'>
      
                <div>
                    <h4 className='bg-green-500 text-3xl p-2'>Add Task</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='text'>Enter Your Task : </label>
                        <input type='text'name='text'id='text'placeholder='Enter Your Task Title' required/>
                    </div>
                    <div>
                    <button className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md' type='submit' >Submit </button>
                    </div>
                </form>
        </div>
    );
};

export default AddTask;