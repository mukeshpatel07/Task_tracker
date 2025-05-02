import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProject = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProjectDetail();
    }, []);

    const getProjectDetail = async () => {
        let result = await fetch(`http://localhost:5000/projects/${params.id}`);
        result = await result.json();
        setName(result.name);
        setOwner(result.owner);
        setLoading(false);
    };
    if (loading) return <h3>Loading...</h3>;

    const updateProject = async () => {
        let result = await fetch(`http://localhost:5000/update-project/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, owner }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        result = await result.json();
        console.log(result);
        navigate('/');
    };

    return (
        <div className="add-product">
            <h2>Update Project</h2>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Owner Name"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />

            <button className="btn" onClick={updateProject}>Update</button>
        </div>
    );
};

export default UpdateProject;
