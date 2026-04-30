import mongoose from "mongoose";



const taskSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["PENDING","IN_PROGRESS","COMPLETED"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

taskSchema.index(
    { title: 1, userId: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

export default mongoose.model("Task",taskSchema);