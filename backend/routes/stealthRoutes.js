import express from 'express';
import {
    postStealthPitch,
    getAllStealthPitches,
    likePitch,
    dislikePitch,
    approvePitch,
    rejectPitch,
    addComment,
    deleteComment,
    editPitch,
    deleteStealthPitch,
} from '../controllers/stealthController.js';

const router = express.Router();

// -- Pitch Creation & Retrieval --
// POST a new stealth pitch
router.route('/').post(postStealthPitch);
// GET all stealth pitches
router.route('/').get(getAllStealthPitches);

// -- Pitch Actions (Likes, Dislikes, etc.) --
// PATCH to like a pitch
router.route('/:id/like').patch(likePitch);
// PATCH to dislike a pitch
router.route('/:id/dislike').patch(dislikePitch);
// PATCH to approve a pitch
router.route('/:id/approve').patch(approvePitch);
// PATCH to reject a pitch
router.route('/:id/reject').patch(rejectPitch);

// -- Comments --
// POST to add a comment
router.route('/:id/comment').post(addComment);
// DELETE a specific comment from a pitch
router.route('/:pitchId/comment/:commentId').delete(deleteComment);

// -- Pitch Management --
// PATCH to edit a pitch (title, content)
router.route('/:id').patch(editPitch);
// DELETE a pitch
router.route('/:id').delete(deleteStealthPitch);


export default router;
