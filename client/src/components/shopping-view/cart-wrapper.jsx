import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemContent from './cart-items-content'

const UserCartWrapper = ({ cartitems }) => {
    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader className={''}>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>
                {
                    cartitems && cartitems.length > 0 ? cartitems.map((items) => {
                       return  <UserCartItemContent cartItem={items} />
                    }) : null
                }
            </div>
            <div className='mt-8 space-y-4'>
                <div className='flex justify-between'>
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>$1000</span>
                </div>
            </div>
            <Button className={'w-full mt-6'}>CheckOut</Button>
        </SheetContent>
    )
}

export default UserCartWrapper