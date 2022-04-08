const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsControllers');

// localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

// localhost:3001/api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// localhost:3001/api/thoughts/:thoughtId/addReaction
router.route('/:thoughtId/addReaction')
    .put(addReaction)

// localhost:3001/api/thoughts/:thoughtId/deleteReaction
router.route('/:thoughtId/deleteReaction')
    .put(deleteReaction)

module.exports = router;