import React, { useEffect, useState } from 'react'
import ProductFilter from './Filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../../../config/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProduct } from '@/store/shop/product-slice'
import ShoppingProductTitle from './Product-tile'

const ShoppingListing = () => {
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.shopProducts)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)


  function handleSort(value) {
    // console.log(value)
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getSectionId,getCurrentOption);
    // get the value of filter
    let cpyFilters = { ...filters } //filter destructure value
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] }
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)
      if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption)
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }
    setFilters(cpyFilters)
    sessionStorage.setItem('filterData', JSON.stringify(cpyFilters))
    // console.log(cpyFilters)
  }

  useEffect(() => {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filterData')) || {})
  }, [])

  // console.log(productList)
  // fetch list of product
  useEffect(() => {
    dispatch(fetchAllFilteredProduct())
  }, [dispatch])

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='px-4 py-3 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold mr-2'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length > 0 ? productList.length : 0} Products</span>
            {/* this part for sorting */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='flex items-center gap-1' variant='outline' size='sm'>
                    <ArrowUpDownIcon className='h-4 w-4' />
                    <span className='text-sm font-normal'>Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[200px]'>
                  <DropdownMenuRadioGroup onValueChange={handleSort}>
                    {
                      sortOptions.map((items) => {
                        return <DropdownMenuRadioItem key={items.id} value={items.id}>
                          {items.label}
                        </DropdownMenuRadioItem>
                      })
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            productList && productList.length > 0 ? productList.map((items) => <ShoppingProductTitle product={items} />) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing
