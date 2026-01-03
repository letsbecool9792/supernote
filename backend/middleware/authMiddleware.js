import { clerkClient } from '@clerk/express';

/**
 * JWT-based protection middleware for cross-domain requests
 * Works with Bearer tokens sent from frontend
 */
export const protect = async (req, res, next) => {
  try {
    // clerkMiddleware should have already verified the token and populated req.auth
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: 'Unauthorized - not authenticated' });
    }
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

/**
 * Optional: Middleware to attach user object to request
 * Use this after protect middleware if you need full user details
 */
export const attachUserDetails = async (req, res, next) => {
  try {
    if (req.auth?.userId) {
      const user = await clerkClient.users.getUser(req.auth.userId);
      req.user = {
        id: req.auth.userId,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        imageUrl: user.imageUrl
      };
    }
    next();
  } catch (error) {
    console.error('Error fetching user details:', error);
    next();
  }
};