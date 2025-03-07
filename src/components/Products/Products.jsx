import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import CategoureSlider from '../CategoureSlider/CategoureSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';
export default function Products() {
  let {addToCart}= useContext(CartContext)
  //لعمل المهام المطلوبه عند نداء func
 async function addToCartFromBtn(id) {
   try {
     console.log("Adding product ID to cart:", id); // ✅ طباعة الـ id في الكونسول
     let {data} = await addToCart(id);
     console.log("Response from API:", data); // ✅ طباعة الرد من الـ API
     if(data.status=="success"){
       toast.success('Add to cart successfully')//فى حالة النجاح
     }else{
       toast.error("This didn't work.")
     }
   } catch (error) {
     console.error("Error adding to cart:", error); // ✅ طباعة الخطأ إن وجد
   }
 
 }
 
   let [Products, setProducts] = useState(null); // حددنا القيمة الأولية بـ null بدلاً من []
   async function getallproducts() {
     let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
     setProducts(data.data);
 }
 
   useEffect(() => {
     getallproducts();
   }, []);
 
   return <>
     <div className="Home overflow-hidden">

       {Products? 
         <div className="container mx-auto max-w-7xl">
           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
             {Products.map((element, index) => (
               <div key={Products._id} className="card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
               <Link to={`/productdetails/${element._id}`}>
               
               <img className="p-8 rounded-t-lg" src={element.imageCover} alt="product image" />
               </Link>
               
               <div className="px-4 pb-5">
                 <Link to={`/productdetails/${element._id}`}>
                   <h5 className="text-xl font-semibold tracking-tight text-gray-900">{element.title.split(' ').slice(0 , 4).join(' ')}</h5>
                 
                 <div className="flex items-center mt-2.5 mb-5">
                   <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
                     {element.ratingsAverage}
                   </span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-3xl font-bold text-gray-900">{element.price} LE</span>
              
                     {/* Products عباره عن array وليست عنصر بحد زاته */}
                     {/* <button onClick={()=>{addToCartFromBtn(Products._id)}}  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                       Add to cart
                     </button> */}
              
                     <Link className='text-4xl text-red-400'><i class="fa-regular fa-heart"></i></Link>
                   </div>
                   </Link>
                     <button onClick={()=>{addToCartFromBtn(element._id)}} className="text-white w-full mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >
                     Add to cart
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </div>
        : 
         <Spinner></Spinner>
       }
     </div>
   </>;
 }