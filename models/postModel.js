const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const postSchema = new Schema({
  postedBy: {
    type: ObjectId,
    ref: "authModel",
    required: true,
  },
  postContent: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 150,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  likes: Number,
  comments: [
    {
      body: String,
      date: Date,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("postModel", postSchema);
module.exports = postModel;
