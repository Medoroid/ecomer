
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import { UserProvider } from './Context/UserContext/UserContext'
import RoutsProtact from './components/RoutsProtact/RoutsProtact'
import Cart from './components/Cart/Cart'
import { CartProvider } from './Context/CartContext/CartContext'
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment'
import Productdetails from './components/Productdetails/Productdetails'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
// Context improts
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import {store} from './lib/redux/store'
//react Query

export default function App() {
let client =new QueryClient()
let routs = createBrowserRouter([
    {path:'' , element:<Layout/> ,children:[
      {index:true , element:<RoutsProtact><Home/></RoutsProtact>},
      {path:'Home' , element:<RoutsProtact><Home/></RoutsProtact>},
      {path:'Products' , element:<RoutsProtact><Products/></RoutsProtact>},
      {path:'Cart' , element:<RoutsProtact><Cart/></RoutsProtact>},
      {path:'Payment' , element:<RoutsProtact><Payment/></RoutsProtact>},
      {path:'Categories' , element:<RoutsProtact><Categories/></RoutsProtact>},
      {path:'Brands' , element:<RoutsProtact><Brands/></RoutsProtact>},
      {path:'productdetails/:id' , element:<RoutsProtact><Productdetails/></RoutsProtact>},
      {path:'SignUp' , element:<SignUp/>},
      {path:'SignIn' , element:<SignIn/>},
      {path:'*' , element:<NotFound/>},
    ] }
])
  return <>
<Provider store={store}>
<QueryClientProvider client={client} >
<CartProvider>
    <UserProvider>
      <RouterProvider router={routs}/>
      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </UserProvider>
  </CartProvider>
</QueryClientProvider>
</Provider>
    </>
}


