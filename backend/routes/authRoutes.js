import express from 'express';
import { clerkClient, requireAuth } from '@clerk/express';

const router = express.Router();

// Get current user status (protected route)
router.get('/status', requireAuth(), async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth.userId);
        res.status(200).json({
            isLoggedIn: true,
            user: { 
                id: user.id,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                email: user.emailAddresses[0]?.emailAddress,
                walletAddress: user.publicMetadata?.walletAddress || null,
                imageUrl: user.imageUrl
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ isLoggedIn: false, message: 'Server error' });
    }
});

export default router;