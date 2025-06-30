const SUPABASE_STORAGE_URL = 'https://prafijwpgcsblstfuyba.supabase.co/storage/v1/object/public';
const CDN_URL = 'https://cdn.misionespropiedadesyservicios.com';

export function getImageUrl(imagePath: string): string {
  if (!imagePath) {
    return '/placeholder.svg'; 
  }

  if (imagePath.startsWith('http')) {
    try {
      const url = new URL(imagePath);
      if (url.origin === new URL(SUPABASE_STORAGE_URL).origin) {
        return `${CDN_URL}${url.pathname}`;
      }
      return imagePath;
    } catch (error) {
      console.error('Invalid image URL:', error);
      return '/placeholder.svg';
    }
  }
  
  return `${CDN_URL}/images/${imagePath}`;
}
