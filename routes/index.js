import { Router } from 'express'
import Controllers from '../controllers/index.js'
import Middlewares from '../middlewares/index.js'

const router = Router()

router.get('/', (req, res) => {
	res.send('Hello World')
})

router.get(
	'/which-telco',
	Middlewares.numberValidator,
	Middlewares.mtnValidator,
	Middlewares.gloValidator,
	Middlewares.airtelValidator,
	Middlewares.nMobileValidator,
	Controllers.whichTelco
)

router.get('/auto-complete', Controllers.autoComplete)

export default router
