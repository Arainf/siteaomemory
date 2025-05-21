const cloudinary = require('./cloudinary');

interface DraggablePhoto {
  id: number;
  src: string;
  alt: string;
  rotation: number;
}

/**
 * Fetch n random photos from a Cloudinary folder
 * @param {string} folder - The Cloudinary folder name
 * @param {number} n - Number of random photos
 * @returns {Promise<DraggablePhoto[]>}
 */
async function getRandomPhotos(folder: string, count: number): Promise<DraggablePhoto[]> {
  const result = await cloudinary.v2.search
    .expression(`folder:${folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(500)
    .execute();

  const resources = result.resources;
  const shuffled = resources.sort(() => 0.5 - Math.random()).slice(0, count);

  const draggablePhotos = shuffled.map((photo: any, index: number) => ({
    id: index + 1,
    src: photo.secure_url,
    alt: `Draggable Photo ${index + 1}`,
    rotation: Math.floor(Math.random() * 11) - 5, // Random between -5 and 5
  }));

  return draggablePhotos;
}

module.exports = { getRandomPhotos }; 