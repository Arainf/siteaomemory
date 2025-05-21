import  cloudinary  from './cloudinary';

/**
 * Fetch n random photos from a Cloudinary folder
 * @param {string} folder - The Cloudinary folder name
 * @param {number} n - Number of random photos
 */

export async function getRandomPhotos(folder: string, count: number) {
  const result = await cloudinary.v2.search
    .expression(`folder:${folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(500)
    .execute();

  const resources = result.resources;
  const shuffled = resources.sort(() => 0.5 - Math.random()).slice(0, count);

  const draggablePhotos = shuffled.map((photo, index) => ({
    id: index + 1,
    src: photo.secure_url,
    alt: `Draggable Photo ${index + 1}`,
    rotation: Math.floor(Math.random() * 11) - 5, // Random between -5 and 5
  }));

  console.log(draggablePhotos);

  return draggablePhotos;
}