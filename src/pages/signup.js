import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import iglogo from '../images/iglogo.jpg'
import * as ROUTES from '../constants/routes'
import FirebaseContext from '../context/FirebaseContext'
import { doesUsernameExist } from '../services/firebase'

const Signup = () => {

    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()

    useEffect(() => {
        document.title = 'Sign up'
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault()

        const usernameExists = await doesUsernameExist(userName)

        if(!usernameExists.length) {
            try {
                const newUser =  await firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
      
                await newUser.user.updateProfile({
                    displayName: userName
                });
      
                await firebase.firestore().collection('users').add ({
                    userId: newUser.user.uid,
                    username: userName.toLowerCase(),
                    fullName: fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })
                  history.push(ROUTES.DASHBOARD)
              } catch (error) {
                  setEmailAddress('')
                  setPassword('')
                  setFullName('')
                  setUserName('')
                  setError(error.message)
              }
          } else {
            setEmailAddress('')
            setPassword('')
            setFullName('')
            setUserName('')
            setError('Thas username already exists')
          }
        }

    const isInvalid = userName === '' || fullName === '' || emailAddress === '' || password === ''

    return (
        <div className='container flex mx-auto max-w-sm items-center h-screen'>
            <div className='flex flex-col'>
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className='flex justify-center w-4/5'>
                        <img src={iglogo} alt="instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    <p className='mb-4 text-sm text-red-500'>{error}</p>
                    <form onSubmit={handleSignUp} method='POST'>
                        <input
                            aria-label="Enter your user name"
                            className="text-sm w-full py-5 px-2 h-2 border rounded mb-2 bg-gray"
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={({ target }) => setUserName(target.value.toLowerCase())}
                        />
                        <input
                            aria-label="Enter your full name"
                            className="text-sm w-full py-5 px-2 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                        />
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full py-5 px-2 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
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
                            Sign Up
                        </button>
                    </form>
                    <div className="flex justify-center items-center mt-4 flex-col w-full bg-white p-4 border">
                        <p className='text-sm'>
                            Have an account?{' '}
                            <Link to={ROUTES.LOGIN} className="font-bold">
                                Log in
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
