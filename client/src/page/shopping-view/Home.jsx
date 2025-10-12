import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'


 const slides=[bannerOne,bannerTwo,bannerThree]
  const categoryWithIcon=[
    {id: 'men', label:'Men', icon : ShirtIcon},
    {id:'women', label:'Women', icon: CloudLightning},
    {id:'kids', label:'Kids', icon: BabyIcon},
    {id:'accessories', label:'Accessories', icon: WatchIcon},
    {id:'footwear', label:'Footer', icon: UmbrellaIcon},
  ]

const ShoppingHome = () => {

   const [currentSlide,setCurrentSlide]=useState(0)


   useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentSlide(prevSlide=> (prevSlide+1)%slides.length)
    },2000)

    return ()=> clearInterval(timer);
   },[])
 
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
            slides.map((slide,index)=>{
               return <img className={`${index===currentSlide ? 'opacity-100' : 'opacity-0'}absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} key={index} src={slide}/>
            })
        }
        <Button onClick={()=>{setCurrentSlide(prevSlide=>(prevSlide-1 +slides.length)% slides.length)}} className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black' varaint={'outline'} size='icon'>
          <ChevronLeftIcon className='h-4 w-4'/>
        </Button>
         <Button onClick={()=>{setCurrentSlide(prevSlide=>prevSlide===slides.length ? 0 : prevSlide+1)}} className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black' varaint={'outline'} size='icon'>
          <ChevronRightIcon className='h-4 w-4'/>
        </Button>
      </div>
      {/* category */}
      <section className='py-12 bg-gray-50'>
        <div className='container px-4 mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {
            categoryWithIcon.map((categoryItem)=>{
              return <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{categoryItem.label}</span>
                </CardContent>
              </Card>
            })
          }
        </div>
      </section>
    </div>
  )
}

export default ShoppingHome