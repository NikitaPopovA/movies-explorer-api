const router = require('express').Router();
const { getProfileInfo, updateProfileInfo } = require('../controllers/users');
const { updateProfileInfoValidationSchema } = require('../middlewares/validators');

router.get('/me', getProfileInfo);
router.patch('/me', updateProfileInfoValidationSchema, updateProfileInfo);

module.exports = router;
