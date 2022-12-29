import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import Loading from './Loading';

const MyTask = () => {
    const [tasks, setTasks]=useState([])
    const [task, setTask]=useState('')
    const [taskId, setTaskId]=useState()


    const [showModal, setShowModal] = useState(false);
    const {user, loading, setLoading}=useContext(AuthContext);
    const status="incomplete";
    const navigate=useNavigate()

    useEffect(()=>{
        setLoading(true)
        fetch(`https://task-manager-server-three.vercel.app/myTask?email=${user?.email}&status=${status}`)
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            setTasks(data)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
        })
    },[user?.email,setLoading,tasks])
    if(loading){
        console.log("Loading fetch");
        <Loading></Loading>
    }

    const handleCompletedTask=(task)=>{
        fetch(`https://task-manager-server-three.vercel.app/myTask/${task._id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`Task completed successfully`)
            }
            navigate('/completedTask')
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
        })
    }

    const handleUpdateTask=(task)=>{
        setShowModal(true);
        setTask(task.taskTitle)
        setTaskId(task._id)

    }

    const handleDeleteTask=(task)=>{
        fetch(`https://task-manager-server-three.vercel.app/myTask/${task._id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`Task deleted successfully`)
            }
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
        })
    }

    const handleModalSubmit= (e) =>{
        e.preventDefault();
        const taskTitle=e.target.text.value;
        const task={
            taskTitle
        }
        console.log(task);
        setLoading(true);
       fetch(`https://task-manager-server-three.vercel.app/myTaskModal/${taskId}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
       })
       .then(res=>{
        console.log(res);
        setLoading(false)
        toast.success("Task updated successfully");
        setShowModal(false);

        navigate("/myTask");
       })
       .catch(err=>{
        console.log(err);
        setLoading(false)
        toast.success("Task not updated")
       })

       
       
    }
    return (
        <div className='text-center border-pink-900 p-1 rounded-md border-4 mt-7'>
        <h2 className="bg-green-500 text-3xl p-2">All Tasks</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
            <thead>
            <tr>
                <th></th>
                <th>Task Title</th>
                <th>Completed</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {
                tasks.map((task, i) =><tr key={task._id}>
                    <th>{i+1}</th>
                    <td>{task?.taskTitle}</td>
                    <td><button onClick={()=>handleCompletedTask(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Completed</button></td>
                    <td><button  onClick={() => handleUpdateTask(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Update</button></td>
                    <td><button onClick={()=>handleDeleteTask(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Delete</button></td>
                </tr>)
            }
            
            </tbody>
            </table>
            
            <>
     
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Update Task
                  </h3>
                 
                </div>
                {/*body*/}
                <>
                        <form onSubmit={handleModalSubmit}>
                        <div>
                            <label htmlFor='text'>Enter Your Task : </label>
                            <input type='text'name='text'id='text'placeholder='Enter Your Task Title' defaultValue={task} />
                        </div>
                        
                        <div>
                        <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        onClick={() => setShowModal(false)}> Close</button>
                        <button className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md' type='submit' >Update</button>
                        </div>
                    </form>
                </>
               
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
       
        
      ) : null}
    </>
        </div>
    </div>
    );
};

export default MyTask;