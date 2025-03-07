import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishContext = createContext()


export function WishProvider(props){
let [totalPrice , setTotalPrice] = useState([])
let [numberOfWishItems , setNumberOfCartItems] = useState(0)
let [WishId , setWishId] = useState(0)
let [allProducts , setAllProducts] = useState(null)
function addToWish(id){
    //لستقبال الناتج انكان تم ام لا الان funcتقوم بالاضافه فقط 
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
    //body
        {
        productId:id
    },{
    // headers
    //لتاكد من ان المستحدم مسجل و اضافة المنتج للعربه الخاصه به
    headers:{
        token:localStorage.getItem('userToken')
    }
    }
)
//فى حالة نجاح الrequst
.then((resp)=>{console.log(totalPrice , CartId ,numberOfCartItems,allProducts)
    //الان funcتقوم بالاضافه فقط 
    //هنضيف البيانات الى هنحتجها تتحدث عند نجاع العمليه
    //شلنا states وبد لناها ب function عرض المنتجات على شان نح مشكله اختفاء الصور عند اضافة منتج ()
    //دى مشكلة api
getWishItems()
    return resp
})
//error
.catch((error)=>{console.log(error)
        //الان funcتقوم بالاضافه فقط 
    return error
})
}
//عرض المنتجان فى الcart
function getWishItems(){
    axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            // headers
    //لتاكد من ان المستحدم مسجل و اضافة المنتج للعربه الخاصه به
    headers:{
        token:localStorage.getItem('userToken')
    }
    })
    //فى حالة الدنيا حلوه
    .then((resp)=>{console.log(resp)
        setTotalPrice(resp.data.data.totalCartPrice)
        setNumberOfCartItems(resp.data.numOfCartItems)
        setWishId(resp.data.cartId)
        setAllProducts(resp.data.data.products)
    })
    //فى مشكله
    .catch((error)=>{console.log(error)})
}
//تحديث كمية منتج
function UpdateWishItems(id , count){
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
        //عدد العناصر المطلوبه
        count:count
    }
    ,    {
            // headers
    //لتاكد من ان المستحدم مسجل و اضافة المنتج للعربه الخاصه به
    headers:{
        token:localStorage.getItem('userToken')
    }
    })
    //فى حالة الدنيا حلوه
    .then((resp)=>{console.log(resp)
        setTotalPrice(resp.data.data.totalCartPrice)
        setNumberOfWishItems(resp.data.numOfCartItems)
        setWishId(resp.data.cartId)
        setAllProducts(resp.data.data.products)
    })
    //فى مشكله
    .catch((error)=>{console.log(error)})
}
// حذف عنصر من العربه
function DeleteWishItem(id){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,   {
            // headers
    //لتاكد من ان المستحدم مسجل و اضافة المنتج للعربه الخاصه به
    headers:{
        token:localStorage.getItem('userToken')
    }
    })
    //فى حالة الدنيا حلوه
    .then((resp)=>{console.log(resp)
        setTotalPrice(resp.data.data.totalCartPrice)
        setNumberOfWishItems(resp.data.numOfCartItems)
        setWishId(resp.data.cartId)
        setAllProducts(resp.data.data.products)
    })
    //فى مشكله
    .catch((error)=>{console.log(error)})
}
// حذف جميع محتوى العربه
function ClearWish(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,   {
            // headers
    //لتاكد من ان المستحدم مسجل و اضافة المنتج للعربه الخاصه به
    headers:{
        token:localStorage.getItem('userToken')
    }
    })
    //مبتحتجش حاجه غير التوكن
    //فى حالة الدنيا حلوه
    // .then((resp)=>{console.log(resp)
    //     setTotalPrice(resp.data.data.totalCartPrice)
    //     setNumberOfCartItems(resp.data.numOfCartItems)
    //     setCartId(resp.data.cartId)
    //     setAllProducts(resp.data.data.products)
    // })
    //فى مشكله
    // .catch((error)=>{console.log(error)})
}
useEffect(()=>{
    getWishItems()
},[])
    return <WishContext.Provider value={{addToCart ,totalPrice , CartId ,numberOfCartItems,allProducts ,ClearCart ,UpdateCardItems ,DeleteCardItem}}>
        {props.children}
    </WishContext.Provider>
}
