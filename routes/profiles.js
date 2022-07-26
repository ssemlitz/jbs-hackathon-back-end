import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)


router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.post('/:id/affirmations', checkAuth, profilesCtrl.create)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.delete('/affirmation/:affirmationId', checkAuth, profilesCtrl.delete)

export { router }
