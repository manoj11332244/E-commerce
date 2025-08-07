import CommonForm from '@/components/common/Form'
import { registerFormControls } from '../../../config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const initialState={
  userName:'',
  email:'',
  password:'',
}

const Signup = () => {

  const [formData,setFormData]=useState(initialState)

  function onSubmit(){
    console.log(formData)
  }
  return (
    <div className='mx-auto max-w-md w-full space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
        <p>Already have an Account
          <Link className='font-medium text-primary hover:underline ml-2' to={'/auth/login'}>Login</Link>
        </p>
      </div>
      <CommonForm  formControl={registerFormControls} buttonText={'Sign Up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
    </div>
  )
}

export default Signup