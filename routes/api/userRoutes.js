const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/usersControllers');

// localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// localhost:3001/api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;