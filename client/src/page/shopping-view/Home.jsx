import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProduct, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTitle from './Product-tile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItem } from '@/store/shop/cartSlice'
import ProductDetailsDailog from '@/components/shopping-view/Product-Details'


 const slides=[bannerOne,bannerTwo,bannerThree]
  const categoryWithIcon=[
    {id: 'men', label:'Men', icon : ShirtIcon},
    {id:'women', label:'Women', icon: CloudLightning},
    {id:'kids', label:'Kids', icon: BabyIcon},
    {id:'accessories', label:'Accessories', icon: WatchIcon},
    {id:'footwear', label:'Footer', icon: UmbrellaIcon},
  ]

  const brandwithIcon=[
    {id:'nike', label:'Nike', icon : ShirtIcon},
    {id:'adidas', label:'Adidas', icon: CloudLightning},
    {id:'puma', label:'Puma', icon: BabyIcon},
    {id:'levi', label:'Levi', icon: WatchIcon},
    {id:'zara', label:'Zara', icon: UmbrellaIcon},
    {id:'h&m', label:'H&M', icon: CloudLightning}
  ]

const ShoppingHome = () => {

   const [currentSlide,setCurrentSlide]=useState(0)
   const [openDetailsDailog, setOpenDetailsDailog] = useState(false)
   const dispatch=useDispatch()
   const {productList , productDetails}=useSelector(state=>state.shopProducts)
   const {user}=useSelector(state=>state.auth)
   const navigate=useNavigate()
   const {toast}=useToast()

   const handleNavigateToListingPage=(getCurrentItem,section)=>{
      sessionStorage.removeItem('filterData')
      const currentFilter={
        [section]: [getCurrentItem.id]
      }
      sessionStorage.setItem('filterData',JSON.stringify(currentFilter))
      navigate('/shop/listing')
   }

   function handleAddToCart(getCurrentProductId) {
      // console.log(getCurrentProductId)
      dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
        // console.log(data)
        if (data?.payload?.success) {
          dispatch(fetchCartItem({ userId: user?.id }))
          toast({
            title:"Product is added to cart"
          })
        }
      })
    }

   const handleGetProductDetails=(getCurrentProductId)=>{
     dispatch(fetchProductDetails(getCurrentProductId))
   }

  //  this is auto slide img banner
   useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentSlide(prevSlide=> (prevSlide+1)%slides.length)
    },5000)

    return ()=> clearInterval(timer);
   },[])

  //  all product fetching
  useEffect(()=>{
    dispatch(fetchAllFilteredProduct({filterParams:{}, sortParams:'proce-lowtohigh'}))
  },[dispatch])
   
  // product details popup open
   useEffect(() => {
      if (productDetails !== null) setOpenDetailsDailog(true)
    }, [productDetails])
 
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      {/* banner */}
      <div className='relative w-full h-[600px] overflow-hidden aspect-[16/9] md:'>
        {
            slides.map((slide,index)=>{
               return <img className={`${index===currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} key={index} src={slide}/>
            })
        }
        <Button onClick={()=>{setCurrentSlide(prevSlide=>prevSlide===0 ? slides.length-1  : prevSlide-1)}} className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black' varaint={'outline'} size='icon'>
          <ChevronLeftIcon className='h-4 w-4'/>
        </Button>
         <Button onClick={()=>{setCurrentSlide(prevSlide=>prevSlide===slides.length-1 ? 0 : prevSlide+1)}} className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black' varaint={'outline'} size='icon'>
          <ChevronRightIcon className='h-4 w-4'/>
        </Button>
      </div>
      {/* category */}
      <section className='py-12 bg-gray-50 max-w-7xl mx-auto'>
        <div className='container px-4 '>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {
            categoryWithIcon.map((categoryItem)=>{
              return <Card onClick={()=>handleNavigateToListingPage(categoryItem,'category')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{categoryItem.label}</span>
                </CardContent>
              </Card>
            })
          }
        </div>
      </section>
      {/* product all showing */}
      <section className='py-12 bg-gray-50 max-w-2xl md:max-w-7xl mx-auto'>
        <div className='container px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
             productList.length > 0 && productList ?  productList.map(productItem=>{
              return <ShoppingProductTitle product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart}/>
             }) : null
          }
        </div>
      </section>

      {/* brand section */}
      <section className='py-12 bg-gray-50 mx-auto'>
        <div className='container px-4'>
          <h2 className='text-center mb-8 text-3xl font-bold'> Shop by Brands</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          {
            brandwithIcon.map((brandItem)=>{
              return <Card onClick={()=>handleNavigateToListingPage(brandItem,'brands')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{brandItem.label}</span>
                </CardContent>
              </Card>
            })
          }
        </div>
      </section>
      {/*popup product details */}
       <ProductDetailsDailog open={openDetailsDailog} setOpen={setOpenDetailsDailog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome