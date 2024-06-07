import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoint'
import ProductCard from '../../components/Product/ProductCard'


function Results() {
  const [result, setResult] = useState([])
  const {categoryName}= useParams()
  // console.log(categoryName)
  useEffect(()=>{
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      // console.log(res.data)
      setResult(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <LayOut>
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <hr/>
        <div className={classes.product__container}>
          {result?.map((product)=>(
            <ProductCard key={product.id} product={product} renderAdd={true}/>
          ))}
          
        </div>
      </section>
    </LayOut>
  )
}

export default Results
