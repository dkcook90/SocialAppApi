const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/usersControllers');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;