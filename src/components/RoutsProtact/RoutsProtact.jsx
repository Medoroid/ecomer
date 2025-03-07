import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
//لحماية الموقع من الوصول بدون تسجيل عن طريق الرابط
export default function RoutsProtact(props) {
if(localStorage.getItem('userToken')!==null){
//فى حالة التسجيل
return props.children
}else{
  //فى حالة عدم التسجيل
  return <Navigate to='/SignIn'></Navigate>
}
}
