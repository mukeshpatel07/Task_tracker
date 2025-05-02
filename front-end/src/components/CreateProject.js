import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {

    const [name,setName] = useState('');
    const [owner, setOwner]= useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const addProject = async () => {
        //console.log(name,price,category,company);
        if (!name || !owner) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-projects", {
            method: 'post',
            body: JSON.stringify({ name, owner, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        result = await result.json();
        //console.log(result)

        if (result.name && result.owner ) {
            alert("Product added successfully");
            setName('');
            setOwner('');
            setError(false);
            navigate('/');
        } else {
            alert("You can add upto 4 projects only");
        }
    }

    return (
        <div className="add-product">
            <h2>Create Project</h2>
            <input className="inputBox" type="text" placeholder="Enter Project Name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span>Please enter the title of the product</span>}

            <input className="inputBox" type="text" placeholder="Enter Project Owner Name"
                value={owner}
                onChange={(e) => { setOwner(e.target.value) }}
            />
            {error && !owner && <span>Please enter the description of the product</span>}
            

            <button className="btn" onClick={addProject}>Add</button>


        </div>
    )
}

export default CreateProject;