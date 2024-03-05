

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {

//  const { setToken , getUserData } = useContext( authContext );
const nav = useNavigate()
const userCode={
  resetCode: '',
}
const validateScema = Yup.object({
   resetCode: Yup.string().required().matches(/^[0-9]{5,6}$/),
  
  
  
  })
const userData = {
email: '',

}
const [isSuccess, setIsSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState( null ) 
const [isLoading, setIsLoading] = useState(false)
const [formStatus, setFormStatus] = useState(true)


async function forgetMyPassword(values){
  console.log(values);
  setIsLoading( true )
 const ruslt= await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values )
.then(function (res) {
    console.log('in case of seccuss' , res);
 if(res.data.statusMsg=== "success"){
    
    setIsSuccess( true );
    setIsLoading( false )
    setTimeout(function(){
      setIsSuccess( false ); 
     setFormStatus(false)
    },1000)
 }

})
.catch(function(err){
  // console.log( 'in case of error' ,err);
  setErrorMessage(err.response.data.message);
 
  console.log(values);
  setIsLoading( false )
  setTimeout(function(){
    setErrorMessage( null );
  },2000)
})
 
}
// ------
async function verifyCode(val){
   const res = await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,val )
    .then((res)=>{
        // console.log( 'verfiy res.' ,res.data);
        if(res.data.status == 'Success'){
            nav( '/resetpassword' )

        }
    })
    .catch((err)=>{
    setErrorMessage(err.response.data.message)
        console.log('verify err ', err);
       
        setTimeout(function(){
          setErrorMessage( null );
        },2000)
    })
}

const myFormik = useFormik(
{

initialValues: userData,

onSubmit: forgetMyPassword,


validate: function (values) {
  const errors = {};
 if( values.email.includes('@') !== true || values.email.includes('.') !== true){
  errors.email = "Email not valid"
 }

  return errors;
}


// validationSchema: mySchema,

}
)


const myFormik2= useFormik(
    {
        initialValues: userCode,




   onSubmit: verifyCode,


//    validate: function(values){
//     const errors = {};
//     // const  resetCodeRedux =/^[0-9]{5,6}$/;
//  if( values.resetCode <5 || values.resetCode > 6){
//   errors.resetCode = "patern not valid";
//  }

//   return errors;
// }
validationSchema: validateScema ,

    }
   
   
   
    
)

  return <>
  
  <Helmet>
  <title>Forget password</title>
 </Helmet>

 

  <div className='w-75 m-auto p-5 '>
    { isSuccess ? <div className='alert alert-success text-center'>Welcome Back</div> : ""}
    { errorMessage ? <div className='alert alert-danger text-center'>{errorMessage}</div> : ''}
    <h2>Forget Password:</h2>

    { formStatus ?<form onSubmit={ myFormik.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.email}  type="email" id='email' className='form-control mb-3' placeholder='email'/>
      {myFormik.errors.email && myFormik.touched.email ?  <div className="alert alert-danger">{myFormik.errors.email}</div> : "" }
      
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Send' }
       
    
        </button>
    </form> :   <form onSubmit={myFormik2.handleSubmit} className=' main-bg p-5 bg-form'>
      <label htmlFor="resetCode">Enter code:</label>
      <input  onBlur={myFormik2.handleBlur} onChange={myFormik2.handleChange} value={myFormik2.values.resetCode}  type="text" id='resetCode' className='form-control mb-3 ' placeholder='code'/>
      {myFormik2.errors.resetCode && myFormik2.touched.resetCode ?  <div className="alert alert-danger">{myFormik2.errors.resetCode }</div> : "" }
      
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Verify code' }
       
    
        </button>
    </form>}
    



  
  </div>
  
  </>
  
 
}
