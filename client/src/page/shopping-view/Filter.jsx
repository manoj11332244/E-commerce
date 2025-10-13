
import { filterOptions } from '../../../config/index'
import React, { Fragment } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const ProductFilter = ({filters,handleFilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
            <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className='p-4 space-y-4'>
           {
            Object.keys(filterOptions).map((items)=>{
               return <Fragment key={items.id}>
                    <div>
                        <h3 className='text-base font-bold'>{items}</h3>
                        <div className='grid mt-2 gap-2'>
                            {
                                filterOptions[items].map((option)=>{
                                   return <Label className='flex items-center gap-2 font-medium'>
                                        <Checkbox checked={
                                            filters && Object.keys(filters).length > 0 &&
                                            filters[items] && filters[items].indexOf(option.id)>-1

                                        }
                                         onCheckedChange={()=>{handleFilter(items,option.id)}} />
                                        {option.label}
                                    </Label>
                                })
                            }
                        </div>
                    </div>
                    <Separator />
                </Fragment>
            })
           }
        </div>
    </div>
  )
}

export default ProductFilter