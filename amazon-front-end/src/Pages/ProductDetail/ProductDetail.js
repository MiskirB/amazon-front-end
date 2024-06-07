import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoint'
import ProductCard from '../../components/Product/ProductCard'
import Loder from '../../components/Loder/Loder'

function ProductDetail() {
  const [product, setProduct] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const {productId} = useParams()
  // console.log(productId)
  useEffect(()=>{
    setisLoading(true)

    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      // console.log(res)
      setProduct(res.data)
      setisLoading(false)
    }).catch((err)=>{
      console.log(err)
      setisLoading(false)
    })
  },[])
  return (
    <LayOut>
      {isLoading? (<Loder/>):(<ProductCard product={product} flex={true} renderDescription={true} renderAdd={true}/>)}
      
    </LayOut>
  )
}

export default ProductDetail
