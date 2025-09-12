import { HousePlug, Menu, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../../../config/index'
import { DropdownMenu, DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'



 function MenuItems(){
    return <nav className='flex flex-col lg:flex-row mb-3 lg:mb-0 lg:items-center gap-6'>
      {
        shoppingViewHeaderMenuItems.map((items,_)=>{
          return(
            <Link className='font-medium text-sm' key={items.id} to={items.path}>
              {items.label}
            </Link>
          )
        })
      }
    </nav>
  }

 function HeaderRightContent(){
  const {user}=useSelector(state=>state.auth)
  console.log(user)
   return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Button size='icons' variant={'outline'}>
      <ShoppingCart className='h-6 w-6' />
      <span className='sr-only'>User cart</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className='bg-black text-white font-extrabold'>{user?.userName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56'>
        <DropdownMenuLabel>Loginned as value</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
 }

const ShoppingHeader = () => {

  const {isAuthenicated}=useSelector(state=>state.auth)


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to={'/shop/home'} className='flex items-center gap-2'>
        <HousePlug className='h-6 w-6' />
        <span className='font-bold'>E-Commerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6'/>
              <span className='sr-only'>Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          {/* small device */}
          <SheetContent side='left' className='w-full max-w-xs'>
               <MenuItems/>
          </SheetContent>
        </Sheet>
        {/* larger device */}
        <div className='hidden lg:block'>
          <MenuItems/>
        </div>
          {
            isAuthenicated ? <div className='hidden lg:block'> 
              <HeaderRightContent/>
               </div> : null
          }
      </div>
    </header>
  )
}

export default ShoppingHeader