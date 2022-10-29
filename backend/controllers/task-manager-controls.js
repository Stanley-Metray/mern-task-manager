import TaskDbModel from "../module/task-manager-module.js";

const createTask = async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    try {
        const insertIntoDb = new TaskDbModel({
            name: req.body.name,
            completed: req.body.completed
        });

        const result = await insertIntoDb.save();
        
        res.status(200).send(result);
    } catch (error) {
        res.status(500).res.send({ msg: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const result = await TaskDbModel.find();
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.status(200).send(result);
    } catch (error) {
        res.status(500).res.send({msg : error.message});
    }
}

const getTask = async (req, res)=>{
    try {
        const result = await TaskDbModel.findOne({name : req.params.name});
        if(!result)
           return res.status(404).send("Task not found!");
        res.status(200).send(result);
    } catch (error) {
        res.status(500).res.send({msg : error.message});
    }
}

const deleteTask = async (req, res)=>{
    try {
        const result = await TaskDbModel.deleteOne({name : req.params.name});
        if(result.deletedCount===0)
            return res.status(404).send("Task not found!");
        res.status(200).send("Task Has Been Removed");
    } catch (error) {
        res.status(500).send({msg : error.message});
    }
}

const updateTask = async (req, res)=>{
    try
    {
        const result = await TaskDbModel.updateOne({_id : req.params.id}, req.body);
        if(result.modifiedCount===0 && result.matchedCount===1)
           return res.status(200).send("This Task Is Already Completed");
        else if(result.modifiedCount===0)
            return res.status(404).send("Task not found!");
        res.status(200).send("Task Has Been Updated");
    }
    catch(error){
        res.status(500).send({msg : error.message});
    }
}

export { createTask, getAllTasks, getTask, deleteTask, updateTask }