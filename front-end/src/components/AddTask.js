import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddTask = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [completeOn, setCompleteOn] = useState('');
    const [error, setError] = useState(false);

    const add = async () => {
        if (!title || !description || !status || !createdAt || !completeOn) {
            setError(true);
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        console.log("projectId", projectId);

        if (!user || !token) {
            alert("User not authenticated.");
            return;
        }

        try {
            let result = await fetch("http://localhost:5000/add-task", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    createdAt,
                    completeOn,
                    userId: user._id,
                    projectId
                }),
            });

            result = await result.json();
            console.log("Server response:", result);

            if (result._id) {
                alert("Task added successfully");
                setTitle('');
                setDescription('');
                setStatus('');
                setCreatedAt('');
                setCompleteOn('');
                setError(false);
                navigate(`/view-task/${projectId}`);
                
            } else {
                alert("Failed to add task");
            }
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Failed to add task");
        }
    }

    return (
        <div className="add-product">
            <h2>Add Task</h2>
            <input className="inputBox" type="text" placeholder="Enter Task Title"
                value={title} onChange={(e) => setTitle(e.target.value)} />
            {error && !title && <span>Please enter the task title</span>}

            <input className="inputBox" type="text" placeholder="Enter Task Description"
                value={description} onChange={(e) => setDescription(e.target.value)} />
            {error && !description && <span>Please enter the task description</span>}

            <select className="inputBox" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {error && !status && <span>Please select the status</span>}

            <label className="inputLabel">Date of Creation</label>
            <input className="inputBox" type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)} />
            {error && !createdAt && <span>Please select the date of creation</span>}

            <label className="inputLabel">Date of Completion</label>
            <input className="inputBox" type="date"
                value={completeOn}
                onChange={(e) => setCompleteOn(e.target.value)} />
            {error && !completeOn && <span>Please select the date of completion</span>}

            <button className="btn" onClick={add}>Add</button>
        </div>
    );
};

export default AddTask;
