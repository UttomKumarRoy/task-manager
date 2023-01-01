import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
//import Loading from './Loading';

const CompletedTask = () => {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask]=useState('')
    const [taskId, setTaskId]=useState()
    const [reload, setReload]=useState(false)
    const [loading, setLoading]=useState(false)



    const [tasks, setTasks]=useState([])
    const {user, logout}=useContext(AuthContext);
    const status="completed";
    const navigate=useNavigate()



    useEffect(()=>{
        setLoading(true)
        fetch(`https://task-manager-server-three.vercel.app/completedTask?email=${user?.email}&status=${status}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=> { 
            if (res.status === 401 || res.status === 403) {
            return logout();
        }
        return res.json()}
        )
        .then(data=>{
            setTasks(data)
            setLoading(false)

        })
        .catch(err=>{
            console.log(err);
            setLoading(false)

        })
    },[user?.email,logout, reload])
    

    const handleIncompleteTask=(task)=>{
        fetch(`https://task-manager-server-three.vercel.app/completedTask/${task._id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                setReload(!reload)
                toast.success(`Task Not Completed successfully`)
            }
            navigate('/myTask')

        })
        .catch(err=>{
            console.log(err);

        })
    }

   

    const handleDeleteTask=(task)=>{
        fetch(`https://task-manager-server-three.vercel.app/myTask/${task._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                setReload(!reload)

                toast.success(`Task deleted successfully`)
            }
        })
        .catch(err=>{
            console.log(err);

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
       fetch(`https://task-manager-server-three.vercel.app/comment/${taskId}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(task)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log(data);
        if(data.modifiedCount>0){
            setReload(!reload)

            toast.success("Comment added / updated successfully");
            setShowModal(false);
        }

       })
       .catch(err=>{
        setReload(!reload)

        toast.success("Comment not added / updated")
       })
    }
    if(loading){
        return <div>Loading...</div>
    }
    
    return (
        <div className='text-center border-pink-900 p-1 rounded-md border-4 mt-7'>
        <h2 className="bg-green-500 text-3xl p-2">Completed Tasks</h2>
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
                    <td><button onClick={()=>handleIncompleteTask(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Not Completed</button></td>
                    <td><button onClick={()=>handleDeleteTask(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Delete</button></td>
                    <td><button onClick={()=>handleComment(task)} className='border-black border-2 bg-red-400 p-1  hover:bg-slate-500 hover:text-white rounded-md'>Add / Update Comment</button></td>
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