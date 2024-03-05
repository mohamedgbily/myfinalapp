import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthStore'
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function Profile() {
   const { userData } =  useContext( authContext )
   if( !userData ){
    return <div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-50 vh-100">
    
    <BallTriangle
     height={100}
     width={100}
     radius={5}
     color="#4fa94d"
     ariaLabel="ball-triangle-loading"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
     />
    
    
    
     </div> 


   }



  return <>
  <Helmet>
  <title>UserProfile</title>
 </Helmet>

  <div className="container vh-100 bg-secondary-subtle overflow-hidden ">
    <div style={{width: '100px' , height: "100px" }} className='mainBorder m-auto rounded-circle bg-success d-flex justify-content-center align-items-center my-3'>
      <p style={{fontSize: '45px'}} className='text-white'>{userData.name.slice(0,1)}</p>  
    </div>
    <p className='text-center'>mohamed.ali@gmail.com</p>
    <h5 className=''>Hello mr.{ userData.name }</h5>
  </div>
  
  
  
  </>
}
