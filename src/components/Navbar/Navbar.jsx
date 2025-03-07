import  { useContext} from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'
import { CartContext } from '../../Context/CartContext/CartContext'

export default function Navbar() {
  let {numberOfCartItems} = useContext(CartContext)
  let  navigate = useNavigate()
  let {userLogin ,setUserLogin} = useContext(UserContext)

  return <>

<nav className="bg-white  w-full z-20 border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <NavLink to='' className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8" alt="Flowbite Logo" />
    </NavLink>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <div className="butons flex items-center gap-2">
    {userLogin == null ? (
  <>
    <Link 
      to="SignUp" 
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      Sign Up
    </Link>
    <Link
      to="SignIn" 
      className="text-white bg-sky-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      Sign In
    </Link>
  </>
) : (
  <>

<Link 
      to="Cart" 
      className="text-white bg-sky-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      <i className="fas fa-cart-shopping"></i> 

      <span className='m-1 p-1 rounded-full bg-white text-black'>{numberOfCartItems}</span>
    </Link>
{/* لعمل logout */}
    <button 
      onClick={() => {
        localStorage.removeItem("userToken");
        setUserLogin(null);
        navigate("/SignIn");
      }} 
      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
      Logout
    </button>

  </>
)}
</div>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
        <li>
        <NavLink to='' className="block py-2 px-3 md:p-0 bg-green-700 rounded-sm md:bg-transparent md:text-green-700 " aria-current="page">Home</NavLink>
        </li>
        <li>
        <NavLink to='Products' className="block py-2 px-3 md:p-0 bg-green-700 rounded-sm md:bg-transparent md:text-green-700 " aria-current="page">Products</NavLink>
        </li>
        <li>
        <NavLink to='categories' className="block py-2 px-3 md:p-0 bg-green-700 rounded-sm md:bg-transparent md:text-green-700 " aria-current="page">Categories</NavLink>
        </li>
        <li>
        <NavLink to='Brands' className="block py-2 px-3 md:p-0 bg-green-700 rounded-sm md:bg-transparent md:text-green-700 " aria-current="page">Brands</NavLink>
        </li>
   
      </ul>
    </div>
  </div>
</nav>



  </>
}
