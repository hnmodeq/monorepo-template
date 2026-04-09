import { login, logout, readMe, refresh } from '@directus/sdk';
import client from './client.js';

/**
 * Perform login using email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const performLogin = async (email, password) => {
  try {

    const response = await client.login({ email, password });
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed'
    };
  }
};

/**
 * Perform logout
 * @returns {Promise<Object>}
 */
export const performLogout = async () => {
  try {

    await client.logout();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Logout failed'
    };
  }
};

/**
 * Get the current user profile
 * @returns {Promise<Object>}
 */
export const getCurrentUser = async () => {
  try {

    const user = await client.request(readMe({
      fields: ['id', 'email', 'first_name', 'last_name', 'role', 'avatar']
    }));
    return {
      success: true,
      data: user
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch user'
    };
  }
};

/**
 * Refresh the access token
 * @returns {Promise<Object>}
 */
export const refreshToken = async () => {
  try {

    const response = await client.refresh();
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Token refresh failed'
    };
  }
};
