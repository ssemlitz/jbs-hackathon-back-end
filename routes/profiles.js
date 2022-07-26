import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.delete('/affirmation/:affirmationId', checkAuth, profilesCtrl.delete)
router.post('/:id/affirmations', checkAuth, profilesCtrl.create)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
// router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
