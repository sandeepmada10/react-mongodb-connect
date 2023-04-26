import React, { useEffect, useState } from 'react';
import "../App.css";
import {  useParams,useNavigate } from 'react-router-dom';

const UpdateProductComponent = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    // const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const getDetails = async () => {
        
        let result = await fetch(`http://localhost:4002/product/${params.id}`)
        result = await result.json();
        // console.log(result)
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);


    }


    useEffect(()=>{
        getDetails();
    },[])

   
    const updateProduct = async ()=>{
        let result = await fetch(`http://localhost:4002/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        result = await result.json();
        if(result){
            navigate('/')
        }
    }


    return (
        <div className='register'>
            <h1>Update Product </h1>
            <div>

                <input
                    className='addproductinput'
                    value={name}
                    placeholder='Enter Name'
                    onChange={(e) => {setName(e.target.value)}}

                />
                {/* {error && !name ? <span className='error-text'>Name is required</span> : ''} */}
            </div>
            <div>

                <input
                    className='addproductinput'
                    value={price}
                    placeholder='Enter Price'
                    onChange={(e) => {setPrice(e.target.value)}} 
                    />
                {/* {error && !price ? <span className='error-text'>Price is required</span> : ''} */}
            </div>
            <div>

                <input
                    className='addproductinput'
                    value={category}
                    placeholder='Enter Category'
                    onChange={(e) => {setCategory(e.target.value)}} 
                    />
                {/* {error && !category ? <span className='error-text'>Category is required</span> : ''} */}
            </div>

            <div>

                <input
                    className='addproductinput'
                    value={company}
                    placeholder='Enter Company'
                    onChange={(e) => {setCompany(e.target.value)}} 
                    />
                {/* {error && !company ? <span className='error-text'>Company is required</span> : ''} */}
            </div>
            <button
                onClick={updateProduct}
                className='signupbutton'
                type='submit'>Update Product</button>
        </div>
    )
}

export default UpdateProductComponent;