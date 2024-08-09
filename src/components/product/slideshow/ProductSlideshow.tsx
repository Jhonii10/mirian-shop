'use client'
import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs, Autoplay} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { ProductImage as Image} from '../image/ProductImage';

interface Props {
    images:string[];
    title:string;
    className?:string;
}

export const ProductSlideshow = ({images,title,className}:Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    

  return (
    <>
    <Swiper
    style={{
        '--swiper-navigation-color': '#3b82f6' ,
        '--swiper-pagination-color': '#3b82f6',
      } as React.CSSProperties}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      
      autoplay={{
        delay: 2500,
      }}
      navigation={true}
      
      thumbs={{ swiper: thumbsSwiper}}
      modules={[FreeMode, Navigation, Thumbs , Pagination, Autoplay]}
      className="mySwiper2"
    >
      {
        images.map((image)=>(
            <SwiperSlide key={image} style={{borderRadius:'0.5rem'}}>
                <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={1000}
                    className='rounded-lg'
                />
            </SwiperSlide>
        ))
      }
    </Swiper>
     
     <div className={className}>
    <Swiper
        onSwiper={setThumbsSwiper as any}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{marginBottom:'12px', marginTop:'12px'}}
      >
        {
        images.map((image)=>(
            <SwiperSlide key={image} style={{borderRadius:'0.5rem'}}>
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={500}
                    className='rounded-lg'
                />
            </SwiperSlide>
        ))
      }
      </Swiper>
      </div>
    </>
  )
}
