import React, {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { getImageUrl } from "@/lib/cdn";

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
  onImageRemoved?: (url: string) => void;
  maxImages?: number;
}

const ImageUpload = forwardRef(function ImageUpload(
  {
    onImagesUploaded,
    existingImages = [],
    onImageRemoved,
    maxImages = 10,
  }: ImageUploadProps,
  ref
) {
  const { uploadMultipleImages, deleteImage, uploading, progress } =
    useImageUpload();
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const totalImages =
        existingImages.length + pendingFiles.length + acceptedFiles.length;
      if (totalImages > maxImages) {
        alert(`Máximo ${maxImages} imágenes permitidas`);
        return;
      }
      // Agrega archivos y previews locales
      setPendingFiles((prev) => [...prev, ...acceptedFiles]);
      setPendingPreviews((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
    [existingImages.length, maxImages, pendingFiles.length]
  );

  const handleRemovePending = (index: number) => {
    // Revoca el objeto URL y elimina el archivo de la lista
    URL.revokeObjectURL(pendingPreviews[index]);
    setPendingPreviews((prev) => prev.filter((_, i) => i !== index));
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Llama esto desde el form principal al hacer submit
  const uploadPendingImages = async (): Promise<string[]> => {
    if (pendingFiles.length === 0) return [];
    const urls = await uploadMultipleImages(pendingFiles, "listings");
    if (urls.length > 0) {
      onImagesUploaded(urls); // Llama al callback del padre con las nuevas URLs
    }
    // Limpia previews y archivos locales
    pendingPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPendingPreviews([]);
    setPendingFiles([]);
    return urls;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading,
  });

  const handleRemoveExisting = (url: string) => {
    // No borra de Supabase aquí. Solo notifica al padre.
    // La eliminación real se hará en el submit del formulario.
    if (onImageRemoved) {
      onImageRemoved(url);
    }
  };

  useImperativeHandle(ref, () => ({
    uploadPendingImages,
  }));

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg text-blue-600">Suelta las imágenes aquí...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 mb-2">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP - Máximo 5MB por imagen
            </p>
            <p className="text-sm text-gray-500">
              Máximo {maxImages} imágenes ({existingImages.length} subidas)
            </p>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Subiendo imágenes...</p>
          {Object.entries(progress).map(([fileName, progressValue]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{fileName}</span>
                <span>{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          ))}
        </div>
      )}

      {/* Preview Images (pendientes, aún no subidas) */}
      {pendingPreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pendingPreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                loading="lazy"
                className="fade-in-img w-full h-24 object-cover rounded-lg border"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemovePending(index);
                }}
              >
                <X className="w-3 h-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">
            Imágenes subidas ({existingImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={getImageUrl(url)}
                  alt={`Imagen ${index + 1}`}
                  loading="lazy"
                  className="fade-in-img w-full h-24 object-cover rounded-lg"
                  onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />
                {onImageRemoved && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveExisting(url);
                    }}
                  >
                    <X className="w-3 h-3 text-white" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ImageUpload;
