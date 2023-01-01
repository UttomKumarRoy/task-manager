import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate=useNavigate()

    const handleLogOut = () => {
        logout()
            .then(() => {
                toast.success("Log Out Success")
                localStorage.removeItem('token')
                navigate('/')

             })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        {user?.uid ?
            <>
                <li><Link to="/addTask">Add Task</Link></li>
                <li><Link to="/myTask">My Task</Link></li>
                <li><Link to="/completedTask">Completed Task</Link></li>
                <li><button onClick={handleLogOut}>Log out</button></li>
            </>
            : <li><Link to="/login">Login</Link></li>}
    </React.Fragment>

    return (
        <div>
            <ul className='flex justify-between gap-5'>
            {menuItems}

            </ul>
        </div>
    );
};

export default Navbar;