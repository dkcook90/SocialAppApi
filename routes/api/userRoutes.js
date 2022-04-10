const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersControllers');

// localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// localhost:3001/api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

// localhost:3001/api/users/:userId/addFriends/:friendId
router.route('/:userId/addFriends/:friendId')
    .put(addFriend)

// localhost:3001/api/users/:userId/removeFriends/:friendId
router.route('/:userId/removeFriends/:friendId')
    .put(deleteFriend)
    

module.exports = router;