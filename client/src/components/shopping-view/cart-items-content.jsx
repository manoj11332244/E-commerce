import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

const UserCartItemContent = ({ cartItem }) => {
  return (
    <div className='flex items-center space-x-4'>
      <img className='w-20 h-20 rounded object-cover' src={cartItem?.image} alt={cartItem?.title} />
      <div className='flex-1'>
        <h3 className='text-xl font-extrabold'>{cartItem?.title}</h3>
        <div className='flex items-center mt-1 gap-2'>
          <Button className='w-8 h-8 rounded-full' variant={'outline'} size={'icon'}><Minus className='w-4 h-4'/><span className='sr-only'>Decrease</span></Button>
           <span>{cartItem?.quantity}</span>
          <Button className='w-8 h-8 rounded-full' variant={'outline'} size={'icon'}><Plus className='w-4 h-4'/><span className='sr-only'>Decrease</span></Button>
        </div>
      </div>
    </div>
  )
}

export default UserCartItemContent