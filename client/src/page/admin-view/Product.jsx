import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElement } from '../../../config';
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addnewProduct, editProduct, fetchAllProduct } from '@/store/admin/product-slice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin-view/Product-tile';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salesPrice: "",
  totalStock: "",
  // averageReview:""
}

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currenEditedId, setCurrenEditedId] = useState(null)
  const { productList } = useSelector(store => store.adminProducts)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const onSubmit = (e) => {
    // console.log(formData)
    e.preventDefault();
    currenEditedId !== null ? dispatch(editProduct({ id: currenEditedId, formData })).then((data) =>{
      console.log(data, 'edit')
      if(data?.payload?.sucess){
        dispatch(editProduct())
        setCurrenEditedId(null)
        setFormData(initialFormData)
        setOpenCreateProductDialog(false)
      }
    }
  )
      : dispatch(addnewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
        // console.log(data)
        if (data?.payload?.success) {
          dispatch(fetchAllProduct())
          setOpenCreateProductDialog(false)
          setImageFile(null)
          setFormData(initialFormData)
          toast({
            title: "Product added successfully"
          })
        }
      })
  }

  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])


  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductDialog(!openCreateProductDialog)}>Add New Product</Button>
      </div>
      {/* product list */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile setFormData={setFormData} setOpenCreateProductDialog={setOpenCreateProductDialog} setCurrenEditedId={setCurrenEditedId} product={productItem} />) : null
        }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setOpenCreateProductDialog(false)
        setCurrenEditedId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currenEditedId != null ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} isEditMode={currenEditedId !== null} />
          <div className='py-6'>
            <CommonForm formControl={addProductFormElement} formData={formData} setFormData={setFormData} buttonText={currenEditedId != null ? 'Edit' : "Add Product"} onSubmit={onSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProduct;