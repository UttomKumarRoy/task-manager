import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import Loading from './Loading';

const MyTask = () => {
    const [tasks, setTasks]=useState([])
    const {user, loading, setLoading}=useContext(AuthContext);
    const status="incomplete";
    const navigate=useNavigate()

    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:8000/myTask?email=${user?.email}&status=${status}`)
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
        fetch(`http://localhost:8000/myTask/${task._id}`, {
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

    const handleUpdateTask=()=>{

    }

    const handleDeleteTask=(task)=>{
        fetch(`http://localhost:8000/myTask/${task._id}`, {
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
    return (
        <div className='text-center'>
        <h2 className="text-3xl">All Tasks</h2>
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
                    <td>{task.taskTitle}</td>
                    <td><button onClick={()=>handleCompletedTask(task)} className='btn btn-xs btn-danger'>Completed</button></td>
                    <td><button onClick={()=>handleUpdateTask(task)} className='btn btn-xs btn-danger'>Update</button></td>
                    <td><button onClick={()=>handleDeleteTask(task)} className='btn btn-xs btn-danger'>Delete</button></td>
                </tr>)
            }
            
            </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyTask;