import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products,setProducts]=useState ([])

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async()=>{
         let productslist= await fetch("http://localhost:4002/products");
        productslist = await productslist.json();
        // console.log(productslist);
        setProducts(productslist);
        
    }

    const deleteProduct=async (id)=>{
        console.log(id)
        let result = await fetch(`http://localhost:4002/product/${id}`,{
            method:"Delete"
        })
        result= await result.json()
        if(result){
            getProducts();
        }
    }
  return (
    <div className='register'>
        <h1>Products List</h1>
        {
        products.map((item,index)=>(
            <div key={item._id} className='product-list'>
            <ul key={item.name}>
                
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
                <li><Link to={"/update/"+item._id}>Update</Link></li>


            </ul>
            </div>
        )
        )

        }
    </div>
  )
}

export default ProductList