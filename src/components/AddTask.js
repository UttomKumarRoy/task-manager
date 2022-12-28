import React, { useContext} from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import Loading from './Loading';

const AddTask = () => {
   const {user, loading, setLoading}= useContext(AuthContext)
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
       fetch('http://localhost:8000/addTask',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
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
        console.log("loading done");
        <Loading></Loading>
       }
    return (
             <div className='text-center border-pink-900 rounded-md border-4 mt-7'>
      
                <div>
                    <h4 className='bg-green-500 text-3xl p-2'>Add Task</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='text'>Enter Your Task : </label>
                        <input type='text'name='text'id='text'placeholder='Enter Your Task Title' />
                    </div>
                    
                    <div>
                    <button className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md' type='submit' >Submit </button>
                    </div>
                </form>
        </div>
    );
};

export default AddTask;