import CommonForm from '@/components/common/Form'
import { loginFormControls } from '../../../config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'

const initialState={
  email:'',
  password:''
}

const Login = () => {
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch()
  const {toast} = useToast()

  const onSubmit=()=>{
    console.log(formData)
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
        })
      }else{
        toast({
          title:data?.payload?.message,
          variant: "destructive"
        })
      }
    })
  }
  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      <div className='text-center'>
        <h1 className='font-bold text-3xl tracking-tight text-foreground'>Sign in to your account</h1>
        <p>Don`t have an account <Link className='ml-2 font-medium text-primary hover:underline' to={'/auth/signup'}>Signup</Link></p>
      </div>
      <CommonForm formControl={loginFormControls} formData={formData} onSubmit={onSubmit} setFormData={setFormData} />
    </div>
  )
}

export default Login