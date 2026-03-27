import React from 'react'
import '../index.css'

const Navbar = () => {
    return (
            <ul className='flex justify-between my-1 mx-0.5 bg-blue-800 py-3 px-5 border-black-4  text-white font-medium'>
                <li className='flex gap-10'>
                    <div>Home</div> 
                    <div>About</div>
                    <div>Your Tasks</div>
                </li>
                    <li className='text-xl'>iTask</li>
            </ul>
    )
}

export default Navbar
