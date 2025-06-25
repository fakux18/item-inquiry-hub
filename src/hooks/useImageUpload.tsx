import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';

interface UploadProgress {
  [key: string]: number;
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({});

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Tipo de archivo no permitido. Use JPG, PNG o WebP.';
    }

    if (file.size > maxSize) {
      return 'El archivo es demasiado grande. Máximo 5MB.';
    }

    return null;
  };

  const compressImageToWebP = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    };

    const compressed = await imageCompression(file, options);
    const originalName = file.name.split('.').slice(0, -1).join('.');
    const newFileName = `${originalName}.webp`;

    return new File([compressed], newFileName, { type: 'image/webp' });
  };

  const uploadImage = async (file: File, folder = ''): Promise<string | null> => {
    const validation = validateFile(file);
    if (validation) {
      toast.error(validation);
      return null;
    }

    try {
      const compressedFile = await compressImageToWebP(file);

      const fileExt = 'webp';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      setProgress(prev => ({ ...prev, [file.name]: 0 }));

      const { error: uploadError } = await supabase.storage
        .from('marketplace-images')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/webp',
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('marketplace-images')
        .getPublicUrl(filePath);

      setProgress(prev => ({ ...prev, [file.name]: 100 }));
      toast.success('Imagen subida exitosamente');

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen: ' + error.message);
      return null;
    }
  };

  const uploadMultipleImages = async (files: File[], folder = ''): Promise<string[]> => {
    setUploading(true);
    const uploadPromises = files.map(file => uploadImage(file, folder));
    
    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(url => url !== null) as string[];
      
      if (successfulUploads.length !== files.length) {
        toast.warning(`${successfulUploads.length} de ${files.length} imágenes subidas exitosamente`);
      }
      
      return successfulUploads;
    } finally {
      setUploading(false);
      setProgress({});
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      const urlParts = url.split('/marketplace-images/');
      if (urlParts.length !== 2) {
        throw new Error('Invalid image URL');
      }
      
      const filePath = urlParts[1];
      
      const { error } = await supabase.storage
        .from('marketplace-images')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      toast.success('Imagen eliminada exitosamente');
      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Error al eliminar la imagen: ' + error.message);
      return false;
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    uploading,
    progress,
  };
};
