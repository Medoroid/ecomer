import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import img1 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-c0pisp30chjc1.jpg'
import img2 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-jxi5ts30chjc1.jpg'
import img3 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-nd8fjq30chjc1.jpg'
import img4 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-p6lfnq30chjc1.jpg'
import img5 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-ploayq30chjc1.jpg'
import img6 from '../../assets/images/i-uploaded-this-couple-days-ago-but-the-images-got-deleted-v0-ydro8s30chjc1.jpg'
// import style from 'MainSlider.module.css'
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
    const [count, setcount] = useState(0)
    useEffect(()=>{
        
    },[])
  return <>
<div className="max-w-[100%]">
<div className="flex flex-col md:flex-row ">
<div className="sliderd w-full md:w-3/4">
    <Slider {...settings}>
      <div>
        <img src={img1} alt="" className='w-full h-96' />
      </div>
      <div>
        <img src={img2} alt="" className='w-full h-96' />
      </div>
      <div>
        <img src={img3} alt="" className='w-full h-96' />
      </div>
      <div>
        <img src={img4} alt="" className='w-full h-96' />
      </div>
      <div>
        <img src={img5} alt="" className='w-full h-96' />
      </div>
      <div>
        <img src={img6} alt="" className='w-full h-96' />
      </div>
    </Slider>
    </div>
    <div className="side-offer w-full md:w-1/4 flex md:block ">
      <img src={img5} alt="" className=' w-full h-48' />
      <img src={img6} alt="" className='w-full h-48' />
    </div>
</div>
  </div>

  </>
}
