import CommonForm from '@/components/common/Form'
import { registerFormControls } from '../../../config'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SignupUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
import { Variable } from 'lucide-react'


const initialState={
  userName:'',
  email:'',
  password:'',
}

const Signup = () => {

  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const { toast } = useToast()
  // const {}
  function onSubmit(){
    console.log(formData)
    dispatch(SignupUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
         toast({
          title: data?.payload?.message
        })
        navigate('/auth/login')
      }
      toast({
          title: data?.payload?.message,
          variant: "destructive"
        })
    })
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