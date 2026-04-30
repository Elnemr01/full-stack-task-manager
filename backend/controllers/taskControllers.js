import Task from "../schemas/taskSchema.js"

export const getAllTasks=async (req,res)=> {
    const {status}=req.query;

    let filter = {userId: req.user.id};
    if(status) {
        filter.status = status;
    }
    // console.log(status)
    let tasks = await Task.find(filter);
    res.json({status: 'success',message: "Tasks retrieved successfully",data: {tasks}});
}


export const createTask=async (req,res)=> {
    const {title,description,status} = req.body;
    // console.log(1)
    const oldTask = await Task.find({title, userId:req.user.id});
    if(oldTask.length > 0) {
        // console.log(2)
        return res.status(400).json({status: 'error',message: "Task with the same title already exists"});
    }
    // console.log(3)
    const newTask = new Task({
        title,
        description,
        status,
        userId: req.user.id
    });
    // console.log(4)
    await newTask.save();
    // console.log(5)
    res.json({status: 'success',message: "Task created successfully",data: {task: newTask}});


}


export const editTask=async (req,res)=> {
    const {title,description,status} = req.body;
    const {id}=req.params;

    const oldTask = await Task.findById(id);

    if (!oldTask) {
        return res.status(404).json({
            status: "error",
            message: "Task not found"
        });
    }

    if(oldTask.userId.toString() !== req.user.id) {
        return res.status(403).json({
            status: "error",
            message: "You are not the owner of this task"
        });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, {title, description, status}, {new: true});

    res.json({status: 'success', message: "Task updated successfully", data: {task: updatedTask}});
}


export const deleteTask=async (req,res)=> {
    const {id}=req.params;

    const oldTask = await Task.findById(id);

    if (!oldTask) {
        return res.status(404).json({
            status: "error",
            message: "Task not found"
        });
    }

    if(oldTask.userId.toString() !== req.user.id) {
        return res.status(403).json({
            status: "error",
            message: "You are not the owner of this task"
        });
    }

    await Task.findByIdAndDelete(id);

    res.json({status: 'success', message: "Task deleted successfully"});
}

