import { clerkClient, requireAuth } from '@clerk/express';

/**
 * Protection middleware using Clerk.
 * Ensures the user is authenticated before accessing protected routes.
 */
export const protect = requireAuth({
  onError: (error) => {
    console.error('Auth error:', error);
  }
});

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