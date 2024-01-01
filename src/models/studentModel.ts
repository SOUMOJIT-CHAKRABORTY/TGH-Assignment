import { Document, Schema, model } from "mongoose";

// interface Task {
//     task: string;
//     dueTime: Date;
//     status: string;
// }

// interface Student extends Document {
//     name: string;
//     email: string;
//     department: string;
//     password: string;
//     tasks: Task[];
// }

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: String,
    tasks: [
      {
        task: String,
        dueTime: Date,
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);

export default Student;
