import express from 'express';
import { createTask, getAllTasks, getTask, deleteTask, updateTask } from '../backend/controllers/task-manager-controls.js';

const TaskManagerRouter = express.Router();

TaskManagerRouter.post("/api/tasks", createTask);
TaskManagerRouter.get("/api/tasks", getAllTasks);
TaskManagerRouter.get("/api/tasks/:name", getTask);
TaskManagerRouter.delete("/api/tasks/:name", deleteTask);
TaskManagerRouter.put("/api/tasks/:id", updateTask);

export default TaskManagerRouter;