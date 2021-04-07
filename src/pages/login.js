import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom"
import FirebaseContext from '../context/FirebaseContext'

import * as ROUTES from '../constants/routes'
import instagram from '../images/instagram.png'
import logo from '../images/iglogo.jpg'


const Login = () => {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        document.title = 'Log in';
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
        } catch (error) {
            console.log(error.message)
            setEmailAddress('')
            setPassword('')
            setError(error.message)
        }
    }

    const isInvalid = password === '' || emailAddress === ''

    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
                <img src={instagram} alt="iPhone with instagram app" />
            </div>
            <div className='flex flex-col ml-5 w-2/5'>
                <div className="flex flex-col bg-white items-center p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src={logo} alt="logo" className="mt-2 w-6/12 mb-4 bg-white" />
                    </h1>
                    <p className='mb-4 text-sm text-red-500'>{error}</p>
                    <form onSubmit={handleLogin} method='POST'>
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full py-5 px-2 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full py-5 px-2 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50 cursor-not-allowed'}`}>
                            Login
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className='text-sm'>
                        Dont have an account?{' '}
                        <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
