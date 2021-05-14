const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  due_date: { type: Date, default: Date.now() },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;