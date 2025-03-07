import axios from 'axios';
import { useContext, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import CategoureSlider from '../CategoureSlider/CategoureSlider';
import MainSlider from '../MainSlider/MainSlider';
import {  Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export default function Home() {
  let {jop}= useSelector((x)=>{return x.user})
console.log(jop)
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

  // let [Products, setProducts] = useState(null); // حددنا القيمة الأولية بـ null بدلاً من []
//   async function getallproducts() {
//     let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
//     setProducts(data.data);
// }
function getallproducts(){
  return  axios.get("https://ecommerce.routemisr.com/api/v1/products");
} 


let {data , isLoading,refetch} = useQuery({
  queryKey:['getallproducts' ],
  queryFn:getallproducts,
  //عند فتح تاب اخرى والعوده يقوم بعمل refichمره اخرى
  refetchOnWindowFocus:false,
  //عند فتح صفه اخرى فى نفس الموقع"الدحول فى مرحلة mounting" والعوده يقوم بعمل refichمره اخرى
  refetchOnMount:true,
  //عدد محاولات عمل fich قبل عرض error
  retry:3,
  //المده الزمنيه بين كل محاوله
  retryDelay:2000,
  //الوقت الذى تصبح عنده البيانات قديمه
  staleTime:10000,
  //الوقت بين كل fetch والاخر (لعمل تحديث للبيانات كل فتره)
  refetchInterval:30000,
  //عمل fetch فى الخلفيه
  refetchIntervalInBackground:true,
  //وقت احتفاظ بالبيانات دون تجديدها حتى عند الخروج من الصفحه
  gcTime:30000,
  //عمل اى عمليات على البيانات مثل fillter
  select:(data)=>{return data?.data?.data},
  //ايقاف عمل fetch تلقايا
  enabled:true
})

  useEffect(() => {
    getallproducts();
  }, []);
  if(isLoading){
    return <Spinner/>
  }
  return <>
    <div className="Home overflow-hidden">
      <MainSlider></MainSlider>
      <CategoureSlider></CategoureSlider>
      {/* عمل fetch  */}
      {jop}
      <button className='bg-emerald-400 p-2' onClick={()=>{refetch()}}>fetch your data</button>
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {data?.map((element) => (
              <div key={element._id} className="card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
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
             
        
             
                    <Link className='text-4xl text-red-400'><i className="fa-regular fa-heart"></i></Link>
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
   
    </div> 
  </>;
  // ///////////////////////////////////
}
