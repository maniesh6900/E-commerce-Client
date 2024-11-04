import styled from 'styled-components'
import {popularProducts} from '../data'
import ProductList  from './productsList';
import { useState, useEffect  } from 'react';
import axios from 'axios';


const Containter = styled.div`
padding: 10px;
display : flex;
flex-wrap: wrap;
justify-content : space-between;
`;

const products = ({cat, filters, sort}) => {

  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])

  console.log({sort});
  
  
useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get( cat ? 
          `http://localhost:4000/products?categories=${cat}` : "http://localhost:4000/products");
        setProducts(res.data); 
      } catch (error) {
      }
    }
 getProducts()
},[cat])


useEffect(()=>{
  cat && 
  setFilterProducts(
    products.filter((item=> 
    Object.entries(filters).every(([key, value]) =>
    item[key].includes(value)
    )
  )
  ))
},[products,cat, filters]);

useEffect(()=>{
  if((sort === "newest")){
    setFilterProducts((prev)=>
    [...prev].sort((a,b) => a.createdAt - b.createdAt)
    )
  }else if((sort === "des")){
    setFilterProducts((prev)=>
    [...prev].sort((a,b) => a.price - b.price)
    )
  }else{
    setFilterProducts((prev)=>
    [...prev].sort((a,b) => b.price - a.price)
    )
  } 

},[sort])



  return (
    <Containter>
     {cat 
     ? filterProducts.map((item)=> <ProductList item={item} key={item._id} /> ) 
      : products.slice(0,8).map((item)=> <ProductList item={item} key={item._id}/>)
    }
    </Containter>
  )
}

export default products