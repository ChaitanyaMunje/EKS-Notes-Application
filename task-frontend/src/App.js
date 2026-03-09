import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  // const API_URL = "http://localhost:3500/api/tasks";

  const API_URL = process.env.REACT_APP_BACKEND_URL + "/api/tasks";


  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setMessage("");
    } catch (err) {
      setTasks([]);
      setMessage("No data found");
    }
  };

  const addTask = async () => {
    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    await axios.post(API_URL, {
      title,
      description
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h2>Task Manager</h2>

      <div>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Task Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <br/><br/>

        <button onClick={addTask}>Add Task</button>
      </div>

      <hr/>

      <h3>Tasks</h3>

      {message && <p>{message}</p>}

      {tasks.map(task => (
        <div key={task.id} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      ))}

    </div>
  );
}

export default App;