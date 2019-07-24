import mongoose from "mongoose"
import _commentService from './CommentService'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true })

// insert pre schemas here

export default mongoose.model('Task', _schema)