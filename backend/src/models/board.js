import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", BoardSchema);
export default Board;
