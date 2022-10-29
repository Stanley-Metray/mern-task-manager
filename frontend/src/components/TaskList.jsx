import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "./Spinner";
import "bootstrap-icons/font/bootstrap-icons.css";
import { URL } from "../App";

const TaskList = () => {

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    });

    const [msg, setMsg] = useState("");
    const [condition, setCondition] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState("");
    const [completedTasks, setCompletedTasks] = useState(0);

    // Using useEffect hook to get all tasks from database

  const getCompletedTasks = ()=>{
    const cTasks = tasks.filter((value)=>{
        return value.completed===true;
    });

    setCompletedTasks(cTasks);
  }

  useEffect(()=>{
    getCompletedTasks();
  }, [tasks])

    const getAllTasks = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/tasks`);
            if (data.length === 0) {
                setLoading(false);
                setMsg("No Tasks Found");
                setTasks([]);
                setFormData({ name: "", completed: false });
                setCondition(false);
            }
            else {
                setLoading(false);
                console.log("Data fecthed...");
                setTasks(Array.from(data));
                console.log(Array.from(data));
            }
        } catch (error) {
            setMsg(error.message);
            setCondition(false);
        }
        
        getCompletedTasks();
    }

    
    useEffect(() => {
        getAllTasks();
    }, []);

    const addTask = async () => {
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            getAllTasks();
        } catch (error) {
            setMsg(error.message);
            setCondition(false);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.name === "") {
            setMsg("Please Provide A Task");
            setCondition(false);
        }
        else {
            try {

                addTask();
                setMsg("Task Added");
                setCondition(true);
            } catch (error) {
                setMsg(error.message);
            }
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    }

    const deleteTask = async (e) => {
        {
            try {
                const taskName = e.target.getAttribute("name");
                const { data } = await axios.delete(`${URL}/api/tasks/${taskName}`);
                setMsg(data);
                setCondition(true);
                setFormData({ ...formData, name: "" });
                setTaskId("");
                getAllTasks();
            
            } catch (error) {
                setMsg(error.message);
                setCondition(false);
            }
        }
    }

    const updateTask = async (e) => {
        e.preventDefault();
        if (formData.name === "") {
            setMsg("Please Provide A Task");
            setCondition(false);
        }
        else {
            try {
                const { data } = await axios.put(`${URL}/api/tasks/${taskId}`, formData);
                setTaskId("");
                setMsg(data);
                setCondition(true);
                setIsEditing(false);
                setFormData({ ...formData, name: "" });
                getAllTasks();
            } catch (error) {
                setMsg(error.message);
                setCondition(false);
            }
        }
    }

    const editing = (e) => {
        try {
            setTaskId(e.target.getAttribute("id"));
            setFormData({ ...formData, name: e.target.getAttribute("name") });
            setIsEditing(true);
        } catch (error) {
            setMsg(error.message);
            setCondition(false);
        }
    }

    const setCompleted = async (task) => {
        try {
            const completedTask = {
                name: task.name,
                completed: true
            }
            await axios.put(`${URL}/api/tasks/${task._id}`, completedTask);
            setMsg("Task Completed...");
            setCondition(true);
            getAllTasks();
        } catch (error) {
            setMsg(error.message);
            setCondition(false);
        }
    }

    return (
        <>
            <div className="card border border-2 border-success py-3">
                <h4 className="card-header bg-success text-white">Task Manager</h4>
                <div className="card-body">
                    <TaskForm handleFormSubmit={isEditing ? updateTask : handleFormSubmit} handleInputChange={handleInputChange} value={formData.name} isEditing={isEditing} />
                </div>
                <div className="card-body row gy-3 d-flex justify-content-between">
                    <span className="col-sm-6 text-center text-sm-start py-1 d-block border border-2 rounded text-dark bg-warning">
                        Total Tasks  <strong className="badge fw-bolder text-bg-primary">{tasks.length}</strong>
                    </span>
                    <span className="col-sm-6 text-center text-sm-end py-1 d-block border border-2 rounded text-dark bg-info">
                        Completed Tasks  <strong className="badge fw-bolder text-bg-warning">{completedTasks.length}</strong>
                    </span>
                </div>
                <div className="card-body">
                    <ol className="list-group list-group-flush">
                        {
                            tasks.map((task, index) => {
                                return (
                                    <Task key={task._id} task={task} index={index} deleteTask={deleteTask} editing={editing} setCompleted={setCompleted} />
                                )
                            })
                        }
                    </ol>
                </div>
                {
                    msg !== "" ? (
                        condition === true ? (
                            <div className="alert alert-success text-center" style={{ borderRadius: "0px" }}>{msg}</div>
                        ) : (
                            <div className="alert alert-danger text-center" style={{ borderRadius: "0px" }}>{msg}</div>
                        )
                    ) : (
                        null
                    )
                }

                {
                    loading ? (
                        <Spinner display="d-flex" />
                    ) : (
                        <Spinner display="d-none" />
                    )
                }
            </div>
        </>
    )
}

export default TaskList;