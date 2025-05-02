import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewProject = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();

    }, [])

    const getProjects = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
    
        let result = await fetch(`http://localhost:5000/projects?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json",
                // Optional: You can keep auth if you're using JWT later
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
    
        result = await result.json();
        setProjects(result);
    };
    
    //console.warn('products', products);


    const deleteProject = async (id) => {
        console.log("Deleting project with ID:", id);
    
        let result = await fetch(`http://localhost:5000/project/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        result = await result.json();
    
        if (result.success) {
            alert("Project deleted successfully");
            setProjects(projects.filter(project => project._id !== id));
        } else {
            alert(result.message || "Failed to delete project");
        }
    };
    

    const searchHandle = async (event) => {

        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProjects(result);
            }
        }else{
            getProjects()
        }
        

    }



    return (
        <div className="product-list">

            <input className="search-input" type="text" placeholder="Search "
                onChange={searchHandle}
            >
            </input>

            <h2>Project list</h2>
            <ul>
                <li>Sl. No.</li>
                <li>Name</li>
                <li>Owner</li>
                <li>View</li>
                <li>Update</li>
                <li>Delete</li>

            </ul>

            {
                projects.length>0?projects.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.owner}</li>
                        <li ><Link to={"/view-task/" + item._id}><button className="prj-btn">View Task</button></Link></li>
                        {/* <li> <Link to={"/add/"+item._id }>Add Task</Link></li> */}
                        <li ><Link to={"/update-project/" + item._id}><button className="prj-btn">Update</button></Link></li>
                        <li><button className="prj-btn" onClick={() => deleteProject(item._id)}>Delete</button></li>

                    </ul>

                ):<h3 style={{color:"red"}}>No result found</h3>
            }


             <div className="new-project">
                   <Link to="/add-project">
                    <button className="project-btn">
                       Create New Project
                    </button>
                   </Link>
             </div>

            

        </div>

    )
}
export default ViewProject;