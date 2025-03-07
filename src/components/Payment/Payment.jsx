import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';

export default function Payment() {
  // استدعاء useContext في مستوى المكون فقط
  const { CartId } = useContext(CartContext);

  async function CashOrder(values) {
    console.log(CartId);

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(data);

      if(data.status=="success"){
        toast.success('we will comnning soon........')//فى حالة النجاح
      }else{
        toast.error("This didn't work.")
      }

  }
  async function OnlinOrder(values) {
    console.log(CartId);

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5173/`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(data);

      if(data.status=="success"){
        toast.success('we will comnning soon........')//فى حالة النجاح
        window.open(data.session.url)
      }else{
        toast.error("This didn't work.")
      }

  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    // onSubmit: CashOrder,
    onSubmit: OnlinOrder,
  });

  return (
    <>
      <h2>Pay Now</h2>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Pay Now
        </button>
      </form>
    </>
  );
}

// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useContext } from 'react';
// import { CartContext } from '../../Context/CartContext/CartContext';

// export default function Payment() {
//   const { CartId } = useContext(CartContext);

//   async function CashOrder(values) {
//     // تأكد من أن CartId معرف قبل إرسال الطلب
//     if (!CartId) {
//       console.error("CartId is undefined.");
//       return;
//     }
//     try {
//       const { data } = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
//         {
//           // إرسال عنوان الشحن ككائن يحتوي على التفاصيل والمدينة والهاتف
//           shippingAddress: {
//             details: values.details,
//             phone: values.phone,
//             city: values.city,
//           },
//         },
//         {
//           headers: {
//             token: localStorage.getItem('userToken'),
//           },
//         }
//       );
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const formik = useFormik({
//     initialValues: {
//       details: "",
//       phone: "",
//       city: "",
//     },
//     onSubmit: CashOrder,
//   });

//   // إذا كانت بيانات عربة التسوق لم تُحمَّل بعد
//   if (!CartId) {
//     return <div>Loading cart information...</div>;
//   }

//   return (
//     <>
//       <h2>Pay Now</h2>
//       <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             name="details"
//             value={formik.values.details}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             id="details"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="details"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Details
//           </label>
//         </div>

//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             name="phone"
//             value={formik.values.phone}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             id="phone"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="phone"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Phone
//           </label>
//         </div>

//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             name="city"
//             value={formik.values.city}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             id="city"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="city"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             City
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//         >
//           Pay Now
//         </button>
//       </form>
//     </>
//   );
// }
