import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Error from '../components/Error'
import { logIn } from '../hooks/fetchUser'

function logInOrError(logInData, setErrorMessage, navigate) {
  logIn(logInData).then(response => {
    if (response.isOk) {
      localStorage.setItem("token", response.data.token)
      navigate("/")
      window.location.reload()
    } else {
      setErrorMessage(response.data.message)
    }
  })
}

const LogIn = () => {
  const navigate = useNavigate()
  const [logInData, setLogInData] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState(null)

  const setEmail = (newEmail) => setLogInData({ ...logInData, email: newEmail })
  const setPassword = (newPassword) => setLogInData({ ...logInData, password: newPassword })

  return (
    <div className="flex flex-col w-96 h-screen justify-center text-start mx-auto gap-4">
      <p className='text-3xl text-center font-medium mb-4'>Login</p>
      {errorMessage ? (
        <Error
          errorMessage={errorMessage}
          dismissError={() => setErrorMessage(null)}/>
      ) : (<></>)}
      <TextField
        label="Email"
        type="email"
        placeholder="johndoe@gmail.com"
        value={logInData.email}
        onValueChange={setEmail} />
      <TextField
        label="Password"
        type="password"
        placeholder="Secret123!"
        value={logInData.password}
        onValueChange={setPassword} />
      <Button
        label="Sign up"
        color="bg-green-500"
        action={() => logInOrError(logInData, setErrorMessage, navigate)} />
      <div className='flex flex-row gap-4 justify-center'>
        Do not have account yet? 
        <Link to="/signup" className='font-bold'>Sign up</Link>
      </div>
    </div>
  )
}

export default LogIn