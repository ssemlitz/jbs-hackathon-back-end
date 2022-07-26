import { Profile } from '../models/profile.js'
// import {AffirmationRef} from '../models/affirmation.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function create(req, res) {
  req.body.owner = req.user.profile
  console.log('reqbody owner', req.body.owner)
  Profile.findById(req.params.id)
  .then(profile => {
    profile.affirmations.push(req.body)
    profile.save()
    .then(() => {
      res.json(profile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
	Profile.findById(req.user.profile)
		.then(profile => {
		profile.affirmations.remove({ _id: req.params.affirmationId })
		profile.save()
			.then(profile => {
				res.json(profile)
			})
		})
		.catch(err => {
      console.log(err)
      res.status(500).json({err: err.errmsg})
    })
	}

function show(req, res) {
  Profile.findById(req.params.id)
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
  deleteOne as delete ,
  show,
  addPhoto
}
