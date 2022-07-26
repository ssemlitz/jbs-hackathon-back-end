import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .populate('affirmations')
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function create(req, res) {
  req.body.author = req.user.profile
  Profile.findById(req.params.id)
  .then(profile => {
    profile.affirmations.push(req.body)
    profile.save()
    .then(() => {
      res.json(affirmation)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('affirmations')
  .then(profile => {
    res.json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { 
  index, 
  create,
  addPhoto, 
  show
}
