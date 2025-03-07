import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Slider from 'react-slick';

export default function Productdetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // تهيئة الحالة ككائن لتخزين تفاصيل المنتج
  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();
  console.log("Product id:", id);

  // دالة لجلب تفاصيل المنتج
  async function getProductsDetails(productId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProductDetails(data.data);
      console.log("Fetched product details:", data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  // دالة لإضافة المنتج إلى العربة
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log("Response from addToCart:", data);
      if (data.status === "success") {
        toast.success('Added to cart successfully');
      } else {
        toast.error("This didn't work.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart");
    }
  }

  // استخدام useEffect لجلب تفاصيل المنتج عند تغيير id
  useEffect(() => {
    if (id) {
      getProductsDetails(id);
    }
  }, [id]);

  return (
    <>
      <section className="relative">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
            <div className="img">
              <div className="img-box h-full w-[75%] mx-auto max-lg:mx-auto">
              <Slider {...settings}>
              {productDetails.images?.map((elm) => (
  <img
    key={elm}
    src={elm}
    alt="Product image"
    className="max-lg:mx-auto w-[75%] mx-auto lg:ml-auto h-full object-cover"/>
))}

</Slider>

              </div>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  {productDetails.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    $ {productDetails.price}
                  </h6>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {/* يمكن هنا وضع أيقونات النجوم */}
                      {productDetails.ratingsAverage}
                    </div>
                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm">
                      {productDetails.ratingsQuantity} review
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  {productDetails.description}
                </p>

                <div className="flex gap-3 py-8">
                  <button
                    onClick={() => addToCart(id)}
                    className="group w-full py-4 px-5 rounded-full bg-emerald-50 text-emerald-600 font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-500 hover:bg-emerald-100"
                  >
                    <svg
                      className="stroke-emerald-600"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                {/* بقية المكون ... */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
