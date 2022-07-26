import mongoose from "mongoose";

const Schema = mongoose.Schema

const affirmationSchema = new Schema({
  thankfulFor: {type: String, required: true},
  thingsIDidWell: {type: String, required: true},
  selfComp: {type: String, required: true},
  selfComp2: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const AffirmationRef = mongoose.model('Affirmation', affirmationSchema)

// export AffirmationRef