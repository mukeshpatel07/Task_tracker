import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { taskId } = useParams(); // Get the taskId from URL
    const navigate = useNavigate();
   // const {projectId} =useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [completeOn, setCompleteOn] = useState('');
    //const [userId, setUserId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // Get task details when the component mounts
        getTaskDetails();
    }, []);

    const getTaskDetails = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'));
   
        if (!user || !token) {
            alert("User not authenticated.");
            return;
        }
   
        try {
            let result = await fetch(`http://localhost:5000/task/${taskId}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                }
            });
   
            result = await result.json();
   
            if (result._id) {
                setTitle(result.title);
                setDescription(result.description);
                setStatus(result.status);
                setCreatedAt(result.createdAt.split("T")[0]); // Date format YYYY-MM-DD
                setCompleteOn(result.completeOn.split("T")[0]); // Date format YYYY-MM-DD
               // setUserId(result.userId);
                setProjectId(result.projectId);  // Make sure to set projectId
            }
        } catch (err) {
            console.error("Error fetching task details:", err);
        }
        console.log("projectId",projectId);
    };
   

    const updateTask = async () => {
        if (!title || !description || !status || !createdAt || !completeOn) {
            setError(true);
            return;
        }
    
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));

      
    
        if (!user || !token) {
            alert("User not authenticated.");
            return;
        }
    
        try {
            const result = await fetch(`http://localhost:5000/update-task/${taskId}`, {
                method: 'PUT',
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
    
            const response = await result.json();
            console.log("Server response after update:", response); // Debug log
    
            if (response.task && response.task._id) {
                // Ensure projectId is set and valid before navigating
                const updatedProjectId = response.task.projectId;
                if (updatedProjectId) {
                    alert("Task updated successfully");
                    navigate(`/view-task/${updatedProjectId}`); // Redirect to the task view page after update
                } else {
                    alert("Project ID is missing, cannot redirect.");
                }
            } else {
                alert("Failed to update task");
            }
        } catch (err) {
            console.error("Error updating task:", err);
            alert("Failed to update task");
        }
    };
    

    return (
        <div className="add-product">
            <h2>Update Task</h2>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {error && !title && <span>Please enter the task title</span>}

            <input
                className="inputBox"
                type="text"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <span>Please enter the task description</span>}

            <select
                className="inputBox"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {error && !status && <span>Please select the status</span>}

            <label className="inputLabel">Date of Creation</label>
            <input
                className="inputBox"
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
            />
            {error && !createdAt && <span>Please select the date of creation</span>}

            <label className="inputLabel">Date of Completion</label>
            <input
                className="inputBox"
                type="date"
                value={completeOn}
                onChange={(e) => setCompleteOn(e.target.value)}
            />
            {error && !completeOn && <span>Please select the date of completion</span>}

            <button className="btn" onClick={updateTask}>
                Update
            </button>
        </div>
    );
};

export default UpdateTask;
