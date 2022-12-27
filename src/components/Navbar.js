import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li><Link to="/home">Home</Link></li>
        {user?.uid ?
            <>
                <li><Link to="/addTask">Add Task</Link></li>
                <li><Link to="/myTask">My Task</Link></li>
                <li><Link to="/completedTask">Completed Task</Link></li>
                <li><button onClick={handleLogOut}>Sign out</button></li>
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