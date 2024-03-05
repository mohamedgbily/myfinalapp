import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import SimpleSlider from './../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishListContext } from '../WishListContext/WishListContext';



export default function Products() {
//  const [allProducts, setAllProducts] = useState( null );
const {addProductToWishList} = useContext(wishListContext)
console.log(addProductToWishList);
   const { addProductToMycart } = useContext( cartContext);
// console.log(  'addProductToMycart:....' , addProductToMycart);
   //-------------------------------function to call addProduct to my cart-----
   async function addProductToCartFromProductPage(id){
    const res = await addProductToMycart(id);
    if(res.status === 'success'){
      // console.log('Product add successfuly to your cart' , res);
      toast.success(' prooduct add successfuly.....' , { duration: 1500 , position: 'top-center' })
    }
    else{
      toast.error(' error occurred....' , { duration: 1500 , position: 'top-center' })
    }
   }
   async function addProductToMyWishList(id){
    const res = await addProductToWishList(id);
    if(res.status === 'success'){
      // console.log('Product add successfuly to your cart' , res);
      toast.success(' prooduct add to wish list successfuly.....' , { duration: 1500 , position: 'top-center' })
    }
    else{
      toast.error(' error occurred....' , { duration: 1500 , position: 'top-center' })
    }
   }


  
async function getAllProducts(){
return axios.get(`https://ecommerce.routemisr.com/api/v1/products`) 
 }
// .then((res)=>{
 
//   setAllProducts(res.data.data);
// })
// .catch((err)=>{
//   console.log(err);
// })
// }
// useEffect(()=>{
//   getAllProducts();
// } ,[])



 const { isLoading  ,data  } = useQuery( 'getAllProducts' , getAllProducts );
//  console.log(data);
 if(isLoading){
  return<><div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-50 vh-100">
    
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
  </>

 }



   return<>
 <Helmet>
  <title>Products</title>
 </Helmet>

   <div className="container">

    <div className="row my-4">
      <div className="col-md-9">
      < SimpleSlider/>
      </div>
      <div className="col-md-3">
        <div>
          <img style={{height: '150px'}} className='w-100 mb-1' src={require('../../images/grocery-banner.png')} alt="" />
        </div>
        <div>
          <img style={{height: '150px'}} className='w-100' src={require('../../images/grocery-banner-2.jpeg')} alt="" />
        </div>
    </div>
      </div>
        
 <CategorySlider />


 <div className="row g-3 mt-3 products">
   { data.data.data.map(( product , idx )=> <div key={idx} className="col-md-2 overflow-hidden ">
    <Link to={ `/productDetails/${product.id}` }>
    <div className="product position-relative">
   <img src={product.imageCover} alt={product.title} className='w-100'/>
    <h3 className='h6 text-main'>{product.category.name}</h3>
    <h2 className='h4 text-center'>{product.title.split(' ').slice( 0,2 ).join(' ')}</h2>
    <div className='d-flex justify-content-between'>
      { product.priceAfterDiscount ? <p>  <span className=" text-decoration-line-through textdeco">{product.price}</span>  - {product.priceAfterDiscount}</p> : <p>{product.price}</p> }
 
    <p> <i style={{color: 'yellow'}} className='fa-solid fa-star'></i> {product.ratingsAverage}</p>
    </div>
   {/* <p>{product.id}</p> */}
  </div>
    </Link>

    <i onClick={function(){
      addProductToMyWishList(product.id)
    }} className='fa-regular fa-heart fa-2xl text-danger position-absolute top-25 end-25'></i>

    <button onClick={ ()=> addProductToCartFromProductPage(product.id)} className=' add-btn btn bg-main text-white d-block m-auto'>+</button>
    </div>
    ) }
  
   
   </div>
   </div>

    



</>

}
