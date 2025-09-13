import { filterOptions } from '../../../config/index'
import React from 'react'

const ProductFilter = () => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
            <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map((keyItems)=>{
                    <>
                    <div>
                        <h3 key={keyItems}>{keyItems}</h3>
                    </div>
                    </>
                })
            }
        </div>
    </div>
  )
}

export default ProductFilter