import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElement } from '../../../config';
import React, { Fragment, useState } from 'react'
import ProductImageUpload from '@/components/admin-view/image-upload';

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

  const onSubmit=()=>{

  }
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
            <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
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