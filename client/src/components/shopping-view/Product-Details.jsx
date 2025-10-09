import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/shop/cartSlice'
import { useToast } from '@/hooks/use-toast'

const ProductDetailsDailog = ({ open, setOpen, productDetails }) => {

    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const {toast}=useToast()

     const handleAddtoCart=(productDetails)=>{
        dispatch(addToCart({userId:user?.id,productId:productDetails?.productId}))

      if(data?.payload?.success){
        toast({
            title:'Product is add to cart'
        })
      }
     }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid max-h-[100vh] overflow-y-auto md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover' />
                </div>
                <div className=''>
                    <div>
                        <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                        <p className='text-muted-foreground text-2xl mb-2 mt-4'>{productDetails?.description}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>${productDetails?.price}</p>
                        {productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>${productDetails?.salePrice}</p> : null}
                    </div>
                    {/* Rating */}
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarIcon className='h-5 w-5 fill-primary' />
                            <StarIcon className='h-5 w-5 fill-primary' />
                            <StarIcon className='h-5 w-5 fill-primary' />
                            <StarIcon className='h-5 w-5 fill-primary' />
                            <StarIcon className='h-5 w-5 fill-primary' />
                        </div>
                        <span className='text-muted-foreground'>4.5</span>
                    </div>
                    <div className='my-5'>
                        <Button onClick={()=>handleAddtoCart(productDetails)} className='w-full'>Add to Cart</Button>
                    </div>
                    <Separator />
                    {/* comment Section */}
                    <div className='max-h-[300px] overflow-auto pb-2 px-1'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='h-10 w-10 border'>
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>ANC</h3>
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome Product</p>
                                </div>
                            </div>
                            {/*  */}
                            <div className='flex gap-4'>
                                <Avatar className='h-10 w-10 border'>
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>ANC</h3>
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome Product</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className='h-10 w-10 border'>
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>ANC</h3>
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome Product</p>
                                </div>
                            </div>
                        </div>
                        {/* comment Message */}
                        <div className='mt-6 flex gap-2'>
                            <Input placeholder="write a Review...." />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDailog