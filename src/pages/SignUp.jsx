import React, { useState } from 'react'
import TextField from '../components/TextField'
import { signUp } from '../hooks/fetchUser'
import Button from '../components/Button'
import { useNavigate, Link } from 'react-router-dom'
import Error from '../components/Error'

function signUpOrError(signUpData, setErrorMessage, navigate) {
  signUp(signUpData).then(response => {
    if (response.isOk) {
      localStorage.setItem("token", response.data.token)
      window.location.reload()
      navigate("/")
    } else {
      setErrorMessage(response.data.message)
    }
  })
}

const SignUp = () => { 
  const navigate = useNavigate()
  const [signUpData, setSignUpData] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState(null)

  const setFirstName = (newFirstName) => setSignUpData({ ...signUpData, firstName: newFirstName })
  const setLastName = (newLastName) => setSignUpData({ ...signUpData, lastName: newLastName })
  const setEmail = (newEmail) => setSignUpData({ ...signUpData, email: newEmail })
  const setPassword = (newPassword) => setSignUpData({ ...signUpData, password: newPassword })

  return (
    <div className="flex flex-col w-96 h-screen justify-center text-start mx-auto gap-4">
      <p className='text-3xl text-center font-medium mb-4'>Sign up</p>
      {errorMessage ? (
        <Error
          errorMessage={errorMessage}
          dismissError={() => setErrorMessage(null)}/>
      ) : (<></>)}
      <TextField
        label="First name"
        type="text"
        placeholder="John"
        value={signUpData.firstName}
        onValueChange={setFirstName} />
      <TextField
        label="Last name"
        type="text"
        placeholder="Doe"
        value={signUpData.lastName}
        onValueChange={setLastName} />
      <TextField
        label="Email"
        type="email"
        placeholder="johndoe@gmail.com"
        value={signUpData.email}
        onValueChange={setEmail} />
      <TextField
        label="Password"
        type="password"
        placeholder="Secret123!"
        value={signUpData.password}
        onValueChange={setPassword} />
      <Button
        label="Sign up"
        color="bg-green-500"
        action={() => signUpOrError(signUpData, setErrorMessage, navigate)} />
      <div className='flex flex-row gap-4 justify-center'>
        Have an account? 
        <Link to="/login" className='font-bold'>Log in</Link>
      </div>
    </div>
  )
}

export default SignUp