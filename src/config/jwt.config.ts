export default {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Token expiration time
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', // Refresh token expiration time
};
