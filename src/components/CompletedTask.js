import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import Loading from './Loading';

const CompletedTask = () => {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask]=useState('')
    const [taskId, setTaskId]=useState()

    const [tasks, setTasks]=useState([])
    const {user, loading, setLoading}=useContext(AuthContext);
    const status="completed";
    const navigate=useNavigate()



    useEffect(()=>{
        setLoading(true)
        fetch(`https://task-manager-server-three.vercel.app/completedTask?email=${user?.email}&status=${status}`)
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

    const handleIncompleteTask=(task)=>{
        fetch(`https://task-manager-server-three.vercel.app/completedTask/${task._id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success(`Task Not Completed successfully`)
            }
            navigate('/myTask')

        })
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
    }

    const handleComment=(task)=>{
        setShowModal(true);
        setTask(task.comment)
        setTaskId(task._id)

    }


    const handleModalSubmit= (e) =>{
        e.preventDefault();
        const comment=e.target.text.value;
        const task={
            comment
        }
        console.log(task);
        setLoading(true);
       fetch(`https://task-manager-server-three.vercel.app/comment/${taskId}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
       })
       .then(res=>{
        console.log(res);
        setLoading(false)
        toast.success("Comment added / updated successfully");
        setShowModal(false);

       })
       .catch(err=>{
        console.log(err);
        setLoading(false)
        toast.success("Comment not added / updated")
       })
    }
    return (
        <div className='text-center'>
        <h2 className="text-3xl">Completed Tasks</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
            <thead>
            <tr>
                <th></th>
                <th>Task Title</th>
                <th>Not Completed</th>
                <th>Delete</th>
                <th>Add / Update Comment</th>
                <th> Comment</th>


            </tr>
            </thead>
            <tbody>
            {
                tasks.map((task, i) =><tr key={task._id}>
                    <th>{i+1}</th>
                    <td>{task.taskTitle}</td>
                    <td><button onClick={()=>handleIncompleteTask(task)} className='btn btn-xs btn-danger'>Not Completed</button></td>
                    <td><button onClick={()=>handleDeleteTask(task)} className='btn btn-xs btn-danger'>Delete</button></td>
                    <td><button onClick={()=>handleComment(task)} className='btn btn-xs btn-danger'>Add / Update Comment</button></td>
                    <td>{task?.comment}</td>
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
                   Comment Here
                 </h3>
                
               </div>
               {/*body*/}
               <>
                       <form onSubmit={handleModalSubmit}>
                       <div>
                           <label htmlFor='text'>Enter Your Comment : </label>
                           <input type='text'name='text'id='text'placeholder='Enter Your Task Title' defaultValue={task} />
                       </div>
                       
                       <div>
                       <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                       onClick={() => setShowModal(false)}> Close</button>
                       <button className='border-black border-3 bg-red-400 p-1 hover:bg-green-500 rounded-md' type='submit' >Add/Update Comment</button>
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

export default CompletedTask;