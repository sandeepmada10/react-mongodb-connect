
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import { useState } from 'react';
import AddProductComponent from './components/AddProductComponent';
import ProductList from './components/ProductList';
import UpdateProductComponent from './components/UpdateProductCompany';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<AddProductComponent  />} />
          <Route path="/update/:id" element={<h1><UpdateProductComponent/></h1>} />
          <Route path="/logout" element={<h1>Logout component</h1>} />
          <Route path="/profile" element={<h1>Profile component</h1>} />
          
          </Route>
          <Route path="/signup" element={<SignUp   />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
