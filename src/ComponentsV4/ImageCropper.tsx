import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './ImageCropper.css'; // Import your CSS file

interface ImageCropperProps {
  image: string;
  onCrop: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCrop }) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (cropperRef.current) {
      // Initialize cropper only if it's not already initialized
      if (cropperInstanceRef.current) {
        cropperInstanceRef.current.destroy();
      }
      cropperInstanceRef.current = new Cropper(cropperRef.current, {
        aspectRatio: 1, // Square cropper
        viewMode: 1, // Restricts the cropper to the container size
        ready() {
          console.log('Cropper is ready');
        },
        crop(event) {
          console.log(event);
          const canvas = cropperInstanceRef.current?.getCroppedCanvas();
          if (canvas) {
            onCrop(canvas.toDataURL());
          }
        },
      });
    }

    // Cleanup cropper instance on unmount
    return () => {
      if (cropperInstanceRef.current) {
        cropperInstanceRef.current.destroy();
      }
    };
  }, [image]);

  return (
    <div className="cropper-container">
      <img ref={cropperRef} src={image} alt="Crop" />
    </div>
  );
};

export default ImageCropper;
