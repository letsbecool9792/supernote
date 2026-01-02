import express from 'express';
import {
    createProject,
    getUserProjects,
    getProjectById,
    converseWithNode,
    synthesizeDocument,
    updateProjectRating,
    regenerateNode,
    generateValidationPitch,
    deleteNode,
    updateNodePositions
} from '../controllers/projectController.js';

const router = express.Router();

// Routes for getting all projects and creating a new one
router.route('/')
    .get(getUserProjects)
    .post(createProject);

// Route for getting a single project by its ID
router.route('/:projectId')
    .get(getProjectById);

// Route for the core conversational research loop
router.route('/:projectId/converse')
    .post(converseWithNode);

// Route for generating the final synthesized document
router.route('/:projectId/synthesize')
    .post(synthesizeDocument);

// Route for AI to rate the current state of the idea
router.route('/:projectId/rate')
    .post(updateProjectRating);

// Route to regenerate a single node's content
router.route('/:projectId/node/:nodeId/regenerate')
    .put(regenerateNode);

// Route to generate a validation stealth pitch
router.route('/:projectId/generate-pitch')
    .post(generateValidationPitch);

router.route('/:projectId/node/:nodeId')
    .delete(deleteNode);

router.route('/:projectId/nodes/positions')
    .patch(updateNodePositions);

router.route('/working').get((req, res) => {
    res.status(200).json({ message: 'Project routes are working!' });
});

export default router;