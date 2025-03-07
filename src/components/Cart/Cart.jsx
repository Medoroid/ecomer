import  { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext/CartContext'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'

export default function Cart() {
  let{totalPrice , CartId ,numberOfCartItems,allProducts,UpdateCardItems,DeleteCardItem,ClearCart}=useContext(CartContext)
  return <>
<div className="container mx-auto mt-6">
  <Link to='/Payment' className="text-white text-xl bg-sky-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Pay Naw</Link>
  <div className="relative overflow-x-auto  mt-5 shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {allProducts?allProducts.map((elm )=>{
        // console.log(elm.product._id)
        return <><tr key={elm.product._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
        <td className="p-4">
          <img src={elm.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {elm.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{UpdateCardItems(elm.product._id,elm.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1" placeholder={elm.count} required />
            </div>
            <button  onClick={()=>{UpdateCardItems(elm.product._id ,elm.count + 1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {elm.price} L.E
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>{DeleteCardItem(elm.product._id)}} className="font-medium text-red-600  hover:underline">Remove</button>
        </td>
      </tr>
      </>}):<Spinner></Spinner>}
      
    </tbody>
  </table>
</div>
<div className="final-informations text-center">
  <div className="flex bg-green-300 p-4 mt-4 justify-around">
    <h3 className='text-xl font-medium '>Count of items: {numberOfCartItems}</h3>
    <h3 className='text-xl font-medium '>Total price: {totalPrice}EGP</h3>
  </div>
  <button className=' mt-5 border-red-600 rounded-md border-2 p-2 font-semibold transition text-xl text-red-600 hover:bg-red-600 hover:text-white ' onClick={()=>{ClearCart()}}>clear cart</button>
</div>
</div>


  </>
}
   