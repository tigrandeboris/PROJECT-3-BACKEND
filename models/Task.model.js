const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  dueDate: { type: Date, default: Date.now() },
  priority: { type: Boolean, default: false },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;