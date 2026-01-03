import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

/**
 * Custom hook to create an authenticated axios instance
 * Uses Clerk JWT tokens instead of session cookies for cross-domain auth
 */
export const useAuthenticatedAxios = () => {
  const { getToken } = useAuth();

  const createAuthHeaders = async () => {
    const token = await getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const authenticatedGet = async (url: string) => {
    const headers = await createAuthHeaders();
    return axios.get(url, { headers });
  };

  const authenticatedPost = async (url: string, data: any) => {
    const headers = await createAuthHeaders();
    return axios.post(url, data, { headers });
  };

  const authenticatedPatch = async (url: string, data: any) => {
    const headers = await createAuthHeaders();
    return axios.patch(url, data, { headers });
  };

  const authenticatedDelete = async (url: string) => {
    const headers = await createAuthHeaders();
    return axios.delete(url, { headers });
  };

  return {
    authenticatedGet,
    authenticatedPost,
    authenticatedPatch,
    authenticatedDelete,
  };
};
