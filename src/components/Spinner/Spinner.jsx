import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
// import style from 'Spinner.module.css'
export default function Spinner() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
        
    },[])
  return <>
  <div className="py-10 flex justify-center items-center h-screen">
  <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
</div>
  </>
}
