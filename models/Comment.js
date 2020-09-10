import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /*comment의 2가지방법중 models/Video.js에 입력하는 것으로 설정
  video: {
    type: mongoose.Schema.Types.Objectld,
    ref: "Video",
  },*/
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
