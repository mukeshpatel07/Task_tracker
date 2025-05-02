const express = require('express');
const cors = require('cors');
require('./db/config');

const User = require("./db/User");
const Projects=require("./db/Projects");
const Task=require("./db/Task");
const mongoose = require("mongoose");


const Jwt =require('jsonwebtoken');
const jwtkey="e-comm";

const app = express();
app.use(express.json());
app.use(cors());

// Sigh up route

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"Something went wrong, Please try again later"});
        }

        res.send({result,auth:token});
    })
})

// Login Route

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"Something went wrong, Please try again later"});
                }

                res.send({user,auth:token});
            })
            

        } else {
            res.send({ result: "No user found" });
        }

    } else {
        res.send({ result: "No user found" });
    }
})

// Add Tast Route



app.post("/add-projects", async (req, res) => {
    const { userId, name, owner } = req.body;

    try {
        // Count how many projects the user already has
        const projectCount = await Projects.countDocuments({ userId });

        if (projectCount >= 4) {
            return res.status(400).send({ error: "Limit reached: You can only create up to 4 projects." });
        }

        // Proceed to save the new project
        const project = new Projects({ userId, name, owner });
        const result = await project.save();
        res.send(result);
    } catch (err) {
        console.error("Error saving project:", err);
        res.status(500).send({ error: "Server error while saving project." });
    }
});

// Getting all projects

app.get("/projects", async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).send({ error: "Missing userId in request." });
    }

    try {
        const projects = await Projects.find({ userId });
        if (projects.length > 0) {
            res.send(projects);
        } else {
            res.send({ result: "No projects found" });
        }
    } catch (err) {
        res.status(500).send({ error: "Error retrieving projects" });
    }
});




// Updating project

app.put("/update-project/:id", async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body  // This updates the fields sent in the request body
            },
            { new: true } // Return the updated document
        );

        if (updatedProject) {
            res.status(200).send(updatedProject);
        } else {
            res.status(404).send({ message: "Project not found" });
        }
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error", details: err.message });
    }
});

// Finding the particular project to update

app.get("/projects/:id", async (req, res) => {
    try {
        const project = await Projects.findById(req.params.id);
        if (project) {
            res.send(project);
        } else {
            res.status(404).send({ result: "Project not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});


// Delete Project

app.delete("/project/:id", async (req, res) => {
    try {
        const result = await Projects.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.send({ success: true, message: "Project deleted successfully" });
        } else {
            res.status(404).send({ success: false, message: "Project not found" });
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
});


app.get("/search/:key",verifyToken, async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex: req.params.key}},
            {price:{$regex: req.params.key}},
            {category:{$regex: req.params.key}},
            {company:{$regex: req.params.key}}
        ]
    });
    res.send(result)

})

// Add task

// Middleware to verify token




// POST route to add a task
app.post("/add-task", async (req, res) => {
    const { title, description, status, createdAt, completeOn, userId, projectId } = req.body;
  
    if (!title || !description || !status || !createdAt || !completeOn || !userId || !projectId) {
      return res.send({ result: "Missing required fields" });
    }
  
    try {
      const task = new Task({
        title,
        description,
        status,
        createdAt,
        completeOn,
        userId: new mongoose.Types.ObjectId(userId),
        projectId: new mongoose.Types.ObjectId(projectId)

      });
  
      const savedTask = await task.save();
      res.send(savedTask);
    } catch (err) {
      res.status(500).send({ result: "Error saving task", error: err.message });
    }
  });



  // To get all the task

  app.get("/tasks", async (req, res) => {
    const { userId, projectId } = req.query;

    try {
        const tasks = await Task.find({ userId, projectId });
        if (tasks.length > 0) {
            res.send(tasks);
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).send({ message: "Error fetching tasks", error: err.message });
    }
});




// Update task
app.put("/update-task/:id", async (req, res) => {
    const { title, description, status, createdAt, completeOn } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, createdAt, completeOn },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send({ result: "Task not found" });
        }

        res.send({ result: "Task updated successfully", task: updatedTask });
    } catch (err) {
        res.status(500).send({ result: "Error updating task", error: err.message });
    }
});



// Delete Task

app.delete("/task/:id", async (req, res) => {
    try {
      const result = await Task.deleteOne({ _id: req.params.id });
      if (result.deletedCount > 0) {
        res.send({ result: "Task deleted successfully" });
      } else {
        res.status(404).send({ result: "Task not found" });
      }
    } catch (err) {
      res.status(500).send({ result: "Error deleting task", error: err.message });
    }
  });
  





function verifyToken(req,res,next){
  // console.warn(req.headers['authorization'])
}
app.listen(5000);