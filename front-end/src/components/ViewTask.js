import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const { projectId } = useParams();
    

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch(`http://localhost:5000/tasks?userId=${userId}&projectId=${projectId}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });

        result = await result.json();
        setTasks(Array.isArray(result) ? result : []);
    };

    const deleteTask = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (!confirm) return;
      
        try {
          let result = await fetch(`http://localhost:5000/task/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          });
      
          result = await result.json();
          console.log("Delete response:", result);
      
          if (result.result === "Task deleted successfully") {
            alert("Task deleted");
            getTasks(); // Refresh task list
          } else {
            alert("Failed to delete task");
          }
        } catch (err) {
          console.error("Error deleting task:", err);
          alert("Something went wrong while deleting");
        }
      };



    return (
        <div className="product-list">
            <h2>Task List</h2>
            <ul>
                <li>Sl. No.</li>
                <li>Title</li>
                <li>Description</li>
                <li>Status</li>
                <li>Date of Creation</li>
                <li>Date of Completion</li>
                <li>Update</li>
                <li>Delete</li>
            </ul>

            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <ul key={task._id}>
                        <li>{index + 1}</li>
                        <li>{task.title}</li>
                        <li>{task.description}</li>
                        <li>{task.status}</li>
                        <li>{task.createdAt}</li>
                        <li>{task.completeOn}</li>
                        <li ><Link to={"/update-task/" + task._id}><button className="prj-btn">Update</button></Link></li>
                        <li><button className="prj-btn" onClick={() => deleteTask(task._id)}>Delete</button></li>
                    </ul>
                ))
            ) : (
                <h3 style={{ color: "red" }}>No task found</h3>
            )}

            <div className="new-project">
                <Link to={`/add-task/${projectId}`}>
                    <button className="project-btn">Create Task</button>
                </Link>
            </div>
        </div>
    );
};

export default ViewTask;
