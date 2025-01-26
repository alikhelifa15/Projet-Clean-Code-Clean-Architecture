export const API_KEY = process.env.API_KEY || 'tm_lclel4r_XxYy-qQ_P3k8mNpL-dW7vB9_Aa2Bb3Cc';

export const validateApiKey = (apiKey: string | undefined): boolean => {
  return apiKey === API_KEY;
};