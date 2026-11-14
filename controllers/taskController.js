const taskController = require("../models/taskSchema")

const taskCreate = async (req,res) => {
  const {title,description,deadline,status,image,assignedpeople,} = req.body
  try {
    const loggedinUserId = req.user.id
    if (title.length>30) {
        restart.satus(401).json({
            success:false,
            message:"max length of task is 30"
        })
    }

   const task = await taskSchema.create({
    title,
    description,
    deadline,
    status,
    image,
    assignedpeople,
    creator: loggedinUserId
   })

    res.status(200).json({
        success: true,
        message: "task created ",
        data: task
    })

  } catch (error) {
    res.status(500).json({
        success: false,
        message: "task creation failed"
    })
  }
}

const getTask = async(req,res) => {
   const task = await taskSchema.find({})
   res.status(200).json({
    success: true,
    message: "task get successfull",
    data: task,
    length: task.length
   })
}

module.exports = { taskCreate,getTask}