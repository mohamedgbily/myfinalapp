

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';
export default function Login() {

 const { setToken , getUserData } = useContext( authContext );

const navToForgetpass = useNavigate()

const userData = {
email: '',
password: '',
}
const [isSuccess, setIsSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState( null ) 
const [isLoading, setIsLoading] = useState(false)

const navigateToLogin = useNavigate()

async function mySubmit(values){
  console.log(values);
  setIsLoading( true )
  axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signin` , values )
.then(function (res) {
  // console.log('in case of seccuss' , res);
  if(res.data.message == "success"){
    localStorage.setItem( 'tkn' , res.data.token );
    getUserData()
    setToken(res.data.token)
    setIsSuccess( true );
    setIsLoading( false )
    setTimeout(function(){
      setIsSuccess( false ); 
      navigateToLogin( '/products' );
    },2000)
  }

})
.catch(function(err){
  console.log( 'in case of error' ,err);
  setErrorMessage(err.response.data.message);
 
  // console.log(values);
  setIsLoading( false )
  setTimeout(function(){
    setErrorMessage( null );
  },2000)
})
 
}
// 

const myFormik = useFormik(
{

initialValues: userData,

onSubmit: mySubmit,


validate: function (values) {
  const errors = {};
 if( values.email.includes('@') !== true || values.email.includes('.') !== true){
  errors.email = "Email not valid"
 }
if( values.password.length < 6 ||  values.password.length > 15 ){
  errors.password = "Password must be from 6 to 15 charater";
}
  return errors;
}


// validationSchema: mySchema,

}
)

// to change in design after render you must think in state as rerender
  return<>
  
  <Helmet>
  <title>Login</title>
 </Helmet>

  <div className='w-75 m-auto p-5 '>
    { isSuccess ? <div className='alert alert-success text-center'>Welcome Back</div> : ""}
    { errorMessage ? <div className='alert alert-danger text-center'>{errorMessage}</div> : ''}
    <h2>Login Now:</h2>
    <form onSubmit={ myFormik.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.email}  type="email" id='email' className='form-control mb-3' placeholder='email'/>
      {myFormik.errors.email && myFormik.touched.email ?  <div className="alert alert-danger">{myFormik.errors.email}</div> : "" }
      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.password}  type="password" id='password' className='form-control mb-3' placeholder='password'/>
      {myFormik.errors.password && myFormik.touched.password ?  <div className="alert alert-danger">{myFormik.errors.password}</div> : "" }
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Login' }
       
    
        </button>
        <button className='btn btn-success ms-5' onClick={()=>{
  navToForgetpass('/forgetPassword')
    }}>Forget password</button>
    </form>
  
  </div>
  
  </>
}

