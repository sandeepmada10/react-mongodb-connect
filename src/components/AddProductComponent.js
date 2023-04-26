import React, {  useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError]=useState(false);
  const [errors,setErrors]=useState({});
  const navigate = useNavigate();
  

//   useEffect(()=>{
//     const auth = localStorage.getItem('product')
//     if(auth){
//         navigate("/");
//     }
// },[navigate])

  const addData = async () => {

    if(!name || !price || !category || !company){
      
      setError(true);
      return false;

    }
    
    let result = await (fetch("http://localhost:4002/addproduct", {
      method: 'post',
      body: JSON.stringify({ name, price, category,  company }),
      headers: {
        'Content-Type': 'application/json'
      }
    }));
    result = await result.json();
    console.log(result);
    if(result.name){
      localStorage.setItem("product",JSON.stringify(result));
      navigate("/");
    }
    else {
      
      console.log(errors)
    }
  }

  
  return (
    <div className='register'>
      <h1>Add Product </h1>
      <div >

        <input
          className='addproductinput'
          value={name}
          placeholder='Enter Name'
          onChange={(e) => setName(e.target.value)}

        />
        {error && !name ? <span className='error-text'>Name is required</span>: ''}
      </div>
      <div>

        <input
          className='addproductinput'
          value={price}
          placeholder='Enter Price'
          onChange={(e) => setPrice(e.target.value)} />
          {error && !price ? <span className='error-text'>Price is required</span>: ''}
      </div>
      <div>

        <input
          className='addproductinput'
          value={category}
          placeholder='Enter Category'
          onChange={(e) => setCategory(e.target.value)} />
          {error && !category ? <span className='error-text'>Category is required</span>: ''}
      </div>
     
      <div>

        <input
          className='addproductinput'
          value={company}
          placeholder='Enter Company'
          onChange={(e) => setCompany(e.target.value)} />
          {error && !company ? <span className='error-text'>Company is required</span>: ''}
      </div>
      <button
        onClick={addData}
        className='signupbutton'
        type='submit'>Add Product</button>






    </div>
  )
}

export default AddProductComponent;