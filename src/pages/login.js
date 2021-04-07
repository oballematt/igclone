import React from 'react'
import instagram from '../images/instagram.png'
import logo from '../images/iglogo.png'

const login = () => {
    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
                <img src={instagram}  alt="iPhone with instagram app" />
            </div>
            <div className='flex flex-col w-2/5'>
                <h1 className="flex justify-center w-full">
                    <img src={logo} alt="logo" className="mt-2 w-6/12 mb-4" />
                </h1>
            <form method='POST'>
                <input
                    aria-label="Enter your email address"
                    className="text-sm w-full ml-3 py-5 px-2 h-2 border rounded mb-2"
                    type="text"
                    placeholder="Email address"
                />
                   <input
                    aria-label="Enter your password"
                    className="text-sm w-full ml-3 py-5 px-2 h-2 border rounded mb-2"
                    type="password"
                    placeholder="Password"
                />
                <button
                 type="submit"
                 className="bg-blue-500 text-white w-full ml-3 rounded h-8 font-bold">
                     Login
                </button>

            </form>
            </div>
        </div>
    )
}

export default login
