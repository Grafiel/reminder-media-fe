import { api } from './api';

export const getProxiedImageUrl = (url: string) => {
  if (!url) return '';
  
  // If it's already a data URL or a relative URL, return as is
  if (url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }

  // For absolute URLs, proxy through our backend
  return `${api.defaults.baseURL}/proxy/image?url=${encodeURIComponent(url)}`;
}; 