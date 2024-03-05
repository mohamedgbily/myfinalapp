import axios from 'axios';
import React, { createContext } from 'react'

export const wishListContext =  createContext();
export default function WishListContextProvider( {children} ) {

  async function addProductToWishList(productId){
    try{
    const { data } = await axios.post( `https://ecommerce.routemisr.com/api/v1/wishlist` , {
      "productId": productId
    } ,{ headers: {token: localStorage.getItem('tkn') }} )
  
    console.log(data);
    return data
   
  }
    catch(err){
  
  
      console.log( 'in case of error' , err);
      return err
    }
  
  
   }

  return   <wishListContext.Provider value={{  addProductToWishList }} >
  {  children }  
  
  </wishListContext.Provider>
}
