import React from 'react';

const Home = () => {
    return (
        <div className='pt-5'>
            <marquee className='text-2xl p-5 bg-slate-700 text-white'>Welcome to task manager application. <span className=' p-2 text-red-900 bg-white'>Please login first</span>  to add task, to see all task and to see completed task.</marquee>
        </div>
    );
};

export default Home;