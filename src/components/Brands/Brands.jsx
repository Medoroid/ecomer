import axios from 'axios';
import React, { useContext } from 'react';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';

export default function Brands() {
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

  function getallBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getallBrands'],
    queryFn: getallBrands
  });

  // ✅ عرض `Spinner` أثناء التحميل
  if (isLoading) {
    return <Spinner />;
  }

  // ✅ عرض رسالة خطأ إذا حدث خطأ
  if (isError) {
    return <p className="text-red-500 text-center">❌ حدث خطأ أثناء تحميل البيانات: {error.message}</p>;
  }

  return (
    <>
      <div className="Home overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {data?.data?.data?.map((element) => (
              <div key={element._id} className="card text-center h-[350px] w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
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
      </div>
    </>
  );
}
