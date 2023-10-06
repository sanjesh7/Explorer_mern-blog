import mongoose from "mongoose";


const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    author:{type:Schema.Types.ObjectId, ref:'User'},
    cover:String,
  }, {
    timestamps: true,
  });
  
  const PostModel = mongoose.model('Post', PostSchema);
  
export default PostModel;