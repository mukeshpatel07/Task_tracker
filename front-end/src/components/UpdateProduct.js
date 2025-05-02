import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

     const params=useParams();

     const navigate=useNavigate();

     useEffect(()=>{
        //console.warn(params);
        getProductDetail();
     },[])

     const getProductDetail=async()=>{
        console.warn(params)
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        //console.warn(result)
        setName(result.name);
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

     }


    const updateProduct = async() => {

        //console.warn(name, price, category, company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{

            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-Type": "application/json"
            }

        });
        result=await result.json();
        console.warn(result);
        navigate('/');
    }



    return (
        <div className="add-product">
            <h2>Update Product</h2>
            <input className="inputBox" type="text" placeholder="Enter Product Name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />

            <input className="inputBox" type="text" placeholder="Enter Product Price"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />

            <input className="inputBox" type="text" placeholder="Enter Product Category"
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />

            <input className="inputBox" type="text" placeholder="Enter Product Company"
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />

            <button className="btn" onClick={updateProduct}>Update</button>


        </div>
    )
}

export default UpdateProduct;