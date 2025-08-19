import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElement } from '../../../config';
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addnewProduct, fetchAllProduct } from '@/store/admin/product-slice';

const initialFormData={
  image:null,
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salesPrice:"",
  totalStock:"",
  // averageReview:""
}

const  AdminProduct = () => {
  const [openCreateProductDialog,setOpenCreateProductDialog]=useState(false)
  const [formData,setFormData]=useState(initialFormData)
  const [imageFile,setImageFile]=useState(null)
  const [uploadedImageUrl,setUploadedImageUrl]=useState('')
  const [imageLoadingState,setImageLoadingState]=useState(false)
  const {productList}=useSelector(store=>store.adminProducts)
  const dispatch=useDispatch()

  const onSubmit=(e)=>{
    // console.log(formData)
    e.preventDefault();
    dispatch(addnewProduct({...formData,image:uploadedImageUrl})).then((data)=>{
      console.log(data)
    })
  }

  useEffect(()=>{
    dispatch(fetchAllProduct())
  },[dispatch])

  // just check product

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProductDialog(!openCreateProductDialog)}>Add New Product</Button>
      </div>
      {/* product list */}
      <div className='gird gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductDialog} onOpenChange={()=>setOpenCreateProductDialog(!openCreateProductDialog)}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState}/>
            <div className='py-6'>
              <CommonForm formControl={addProductFormElement} formData={formData} setFormData={setFormData} buttonText={"Add Product"} onSubmit={onSubmit}/>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}

export default  AdminProduct;