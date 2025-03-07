import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import CategoureSlider from '../CategoureSlider/CategoureSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';

export default function Categories() {
  const { addToCart } = useContext(CartContext);

  async function addToCartFromBtn(id) {
    try {
      console.log("Adding product ID to cart:", id);
      let { data } = await addToCart(id);
      console.log("Response from API:", data);
      if (data.status === "success") {
        toast.success('Add to cart successfully');
      } else {
        toast.error("This didn't work.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  const [Products, setProducts] = useState(null);
  
  async function getallproducts() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setProducts(data.data);
  }

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <>
      <div className="Home overflow-hidden">
        {Products ? (
          <div className="container mx-auto max-w-7xl">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Products.map((element) => (
                <div key={element._id} className="card text-center h-[450px] w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                    <img className="p-8 rounded-t-lg" src={element.image} alt="product image" />
              
                  <div className="px-4 pb-5">
                 
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                        {(element.name || "").split(' ').slice(0, 4).join(' ')}
                      </h5>
               
       
      
          
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
