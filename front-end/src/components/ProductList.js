import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();

    }, [])

    const getProducts = async () => {

        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))

            }
        });
        result = await result.json();
        setProducts(result);

    }
    //console.warn('products', products);


    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            alert("Deleted Successfully");

            setProducts(products.filter(product => product._id !== id));
        }
    }

    const searchHandle = async (event) => {

        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }else{
            getProducts()
        }
        

    }



    return (
        <div className="product-list">

            <input className="search-input" type="text" placeholder="Search "
                onChange={searchHandle}
            >
            </input>

            <h2>Product lists</h2>
            <ul>
                <li>Sl. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                products.length>0?products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>Rs.{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button className="delete" onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>

                ):<h3 style={{color:"red"}}>No result found</h3>
            }

        </div>

    )
}
export default ProductList;