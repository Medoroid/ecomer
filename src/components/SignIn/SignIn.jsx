import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { ColorRing } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext/UserContext'
import { CartContext } from '../../Context/CartContext/CartContext'

export default function SignIn() {
  let { getCardItems } = useContext(CartContext)
  let { setUserLogin } = useContext(UserContext)
  let navigate = useNavigate()

  let [apiError, setApiError] = useState(null)
  let [isLoading, setLoading] = useState(false)

  // التحقق من وجود توكن عند تحميل الصفحة
  useEffect(() => {
    let token = localStorage.getItem("userToken")
    if (token) {
      setUserLogin(token)
    }
  }, [])

  let validation = Yup.object().shape({
    email: Yup.string().required("Enter your email").email("Enter a valid email that includes @"),
    password: Yup.string()
      .required("Enter password")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
  })

  function handleSubmit(values) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((response) => {
        setLoading(false)
        if (response.data.message === "success") {
          console.log("Login successful")
          localStorage.setItem("userToken", response.data.token)
          setUserLogin(response.data.token)
          console.log(response.data.token)
   navigate('/home')
          // التحقق من تحميل بيانات السلة بدون مشاكل
          getCardItems() // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
            .catch(err => console.error("Error in getCardItems:", err))
         
        }
      })
      .catch((error) => {
        setLoading(false)
        setApiError(error?.response?.data?.message)
        console.log("Login Error:", error?.response?.data?.message)
      })
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}

        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}

        <button type="submit" className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading ? <ColorRing visible={true} height="20" width="20" ariaLabel="color-ring-loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /> : 'Submit'}
        </button>
      </form>
    </>
  )
}
