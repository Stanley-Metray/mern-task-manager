import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Task"]
        },

        completed: {
            type: Boolean,
            required: true,
            default: false
        },
        timestamp : {
            type : Date,
            default : new Date()
        }
    }
);


const TaskDbModel = new mongoose.model("tasks", Schema);

export default TaskDbModel;