// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   role: { type: String, enum: ['Admin', 'Staff','junior','peer'], required: true },
//   // supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   // peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   // juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

//   // make login signup 
//   //  save role in jwt 
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'employee'], required: true },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      validate: {
        validator: (value) => value === null || mongoose.Types.ObjectId.isValid(value),
        message: 'Invalid manager ID',
      },
    },
  },
  { timestamps: true }
);

// Auto-generate manager_id on save
UserSchema.pre('save', async function (next) {
  if (this.role === 'employee' && !this.manager_id) {
    // Example: Auto-assign manager_id for employees if not provided
    const admin = await mongoose.model('User').findOne({ role: 'manager' });
    if (admin) {
      this.manager_id = admin._id;  // Assign the first manager found
    }
  }
  
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);



// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Export the model correctly
module.exports = mongoose.model('User', UserSchema);
