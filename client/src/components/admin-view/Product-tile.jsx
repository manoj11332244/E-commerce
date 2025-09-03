import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({product}) => {
    console.log(product)
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div>
            <div className='relative'>
                <img className='w-full h-[300px] object-cover rounded-t-lg' src={product?.image} alt={product?.title} />
            </div>
            <CardContent>
                <h2 className='text-xl font-bold my-2'>{product?.title}</h2>
                <div className='flex items-center justify-between mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>$ {product?.price}</span>
                    {
                        product?.salePrice > 0 ? <span className='text-slg font-bold'>$ {product?.salePrice}</span> :" "
                    }
                    
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardFooter>
        </div>
    </Card>
  )
}

export default AdminProductTile