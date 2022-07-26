import { Router } from 'express'
import * as affirmationsCtrl from '../controllers/affirmations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', affirmationsCtrl.index)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, affirmationsCtrl.create)
router.delete('/:id', checkAuth, affirmationsCtrl.delete)
router.put(':/id', checkAuth, affirmationsCtrl.update)
// router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }