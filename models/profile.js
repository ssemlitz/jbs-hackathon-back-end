import mongoose from 'mongoose'

const Schema = mongoose.Schema

const affirmationSchema = new Schema({
  thankful1: {type: String, required: true},
  thankful2: {type: String, required: true},
  thankful3: {type: String, required: true},
  thingsIDidWell: {type: String, required: true},
  selfComp: {type: String, required: true},
  selfComp2: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const profileSchema = new Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  photo: { type: String },
  affirmations: [affirmationSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
