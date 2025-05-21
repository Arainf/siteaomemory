import React from "react";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg bg-white/10">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-64 object-cover"
          />
          <div className="p-2 text-center text-white font-century font-bold">
            {photo.alt}
          </div>
        </div>
      ))}
    </div>
  );
};
